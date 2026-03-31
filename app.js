// ══════════════════════════════════════════════
//  MLB CARD GAME – APP.JS  (Manager Mode 2025)
// ══════════════════════════════════════════════

// ── SAFE ELEMENT HELPER ───────────────────────
function $(id) { return document.getElementById(id); }

// ── GAME STATE ────────────────────────────────
let GS = null; // loaded from localStorage
let peer = null;
let conn = null;
let isHost = false;
let wagerMode = false;
let selectedLineupIds = [];
let pendingMatchParams = null;
let wagerResults = []; 

function loadGS() {
  const raw = localStorage.getItem("mlb_game_state");
  GS = raw ? JSON.parse(raw) : null;
}
function saveGS() { localStorage.setItem("mlb_game_state", JSON.stringify(GS)); }

// ── PRICING ───────────────────────────────────
function playerPrice(rating) {
  if (rating >= 95) return 800;
  if (rating >= 88) return 400;
  if (rating >= 80) return 180;
  if (rating >= 70) return 70;
  return 25;
}

// POS_EMOJI y getRarity ya están definidos en data.js
// getTeam / getPlayerById
function getTeam(id) { return TEAMS.find(t => t.id === id); }
function getPlayerById(id) { return PLAYERS.find(p => p.id === id); }

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
window.addEventListener("load", () => {
  // Always hide splash after 3s regardless of errors
  setTimeout(() => {
    const splash = $("splash");
    if (splash) splash.classList.add("hidden");
    try {
      loadGS();
      if (GS && GS.loggedIn) {
        showGame();
      } else {
        showLogin();
      }
    } catch(err) {
      console.error("Init error:", err);
      // Show login as fallback
      try { showLogin(); } catch(e2) {
        document.body.innerHTML = `<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0a0e1a;color:#fff;font-family:sans-serif;text-align:center;padding:2rem">
          <div><div style="font-size:3rem;margin-bottom:1rem">⚾</div><h2>MLB Card Game</h2><p style="color:rgba(255,255,255,.5);margin-top:.5rem">Error al iniciar. Abre la consola (F12) para ver detalles.</p><p style="color:red;font-size:.8rem;margin-top:1rem">${err.message}</p></div>
        </div>`;
      }
    }
  }, 3000);
});

// Attach username input listener once DOM ready (scripts are at bottom so DOM is ready)
document.addEventListener("DOMContentLoaded", () => {
  const inp = $("username-input");
  if (inp) inp.addEventListener("input", checkStartBtn);
});
// Also try immediately in case DOMContentLoaded already fired
(function tryAttachInput() {
  const inp = $("username-input");
  if (inp && !inp._listenerAttached) {
    inp.addEventListener("input", checkStartBtn);
    inp._listenerAttached = true;
  }
})();

// ══════════════════════════════════════════════
//  LOGIN SCREEN
// ══════════════════════════════════════════════
let selectedTeamId = null;
let loginLeagueFilter = "ALL";

function showLogin() {
  const login = $("screen-login");
  const game  = $("screen-game");
  if (login) login.classList.remove("hidden");
  if (game)  game.classList.add("hidden");
  buildLoginTeams();
  // Attach input listener now too
  const inp = $("username-input");
  if (inp && !inp._listenerAttached) {
    inp.addEventListener("input", checkStartBtn);
    inp._listenerAttached = true;
  }
}

function buildLoginTeams() {
  renderLoginTeams();
}

function filterLoginTeams() {
  renderLoginTeams();
}

function setLoginLeague(league, btn) {
  loginLeagueFilter = league;
  document.querySelectorAll(".ltab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderLoginTeams();
}

function renderLoginTeams() {
  const q = (document.getElementById("login-team-search")?.value || "").toLowerCase();
  const grid = document.getElementById("login-teams-grid");
  grid.innerHTML = "";
  TEAMS
    .filter(t => loginLeagueFilter === "ALL" || t.league === loginLeagueFilter)
    .filter(t => !q || t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q))
    .forEach(t => {
      const btn = document.createElement("button");
      btn.className = "login-team-btn" + (t.id === selectedTeamId ? " selected" : "");
      btn.style.setProperty("--team-primary", t.primary);
      btn.innerHTML = `<div class="ltb-emoji">${t.emoji}</div><div class="ltb-name">${t.name}</div><div class="ltb-city">${t.city}</div>`;
      btn.onclick = () => selectLoginTeam(t.id);
      grid.appendChild(btn);
    });
}

function selectLoginTeam(teamId) {
  selectedTeamId = teamId;
  const t = getTeam(teamId);
  // update UI
  document.querySelectorAll(".login-team-btn").forEach(b => b.classList.remove("selected"));
  // re-render to apply selected class
  renderLoginTeams();
  const banner = document.getElementById("selected-team-banner");
  banner.classList.remove("hidden");
  banner.innerHTML = `<span style="font-size:1.8rem">${t.emoji}</span><div><strong>${t.city} ${t.name}</strong><div style="font-size:.75rem;color:rgba(255,255,255,.45)">${t.league} · ${t.division}</div></div>`;
  const btn = document.getElementById("btn-start");
  btn.classList.toggle("disabled", !document.getElementById("username-input").value.trim());
  checkStartBtn();
}

function checkStartBtn() {
  const name = $("username-input").value.trim();
  const mail = $("email-input").value.trim();
  const ctm  = $("custom-team-name").value.trim();
  const btn  = $("btn-start");
  if (!btn) return;
  btn.classList.toggle("disabled", !name || !mail || !ctm || !selectedTeamId);
}

function startGame() {
  const name = $("username-input").value.trim();
  const mail = $("email-input").value.trim();
  const ctm  = $("custom-team-name").value.trim();
  if (!name || !mail || !ctm || !selectedTeamId) return;

  // 18 jugadores - el peor de cada posición del roster
  const slots = [
    "SP","SP","SP","SP","SP",   // 5 abridores
    "RP","RP","RP",              // 3 relevistas
    "C","C",                     // 2 catchers
    "1B","2B","3B","SS",         // cuadro interno
    "OF","OF","OF",              // jardineros
    "DH"                         // DH
  ];

  const used = new Set();
  const starterIds = [];

  slots.forEach(pos => {
    const candidate = PLAYERS
      .filter(p => p.pos === pos && !used.has(p.id))
      .sort((a, b) => a.rating - b.rating)[0];
    if (candidate) {
      starterIds.push(candidate.id);
      used.add(candidate.id);
    }
  });

  GS = {
    loggedIn: true,
    username: name,
    email: mail,
    customTeam: ctm,
    teamId: selectedTeamId,
    coins: 1000,
    roster: [...starterIds],
    lastPackDate: null,
    history: [],
    stats: { wins: 0, losses: 0 }
  };
  saveGS();
  showGame();
  showWelcome(starterIds);
}

// ══════════════════════════════════════════════
//  GAME
// ══════════════════════════════════════════════
function showGame() {
  document.getElementById("screen-login").classList.add("hidden");
  document.getElementById("screen-game").classList.remove("hidden");
  initGame();
}

function initGame() {
  const t = getTeam(GS.teamId);
  // Header
  $("hdr-manager").textContent = `${GS.customTeam} – ${GS.username}`;
  updateCoinsDisplay();
  // Build filters
  buildTeamFilterDropdown("filter-team");
  buildTeamFilterDropdown("market-team");
  // Build sections
  buildMyTeam();
  buildMarket();
  buildColeccion();
  buildEquipos();
  buildDailySection();
  showSection("miequipo");
}

function logOut() {
  if (!confirm("¿Cerrar sesión? Tu progreso se guardará.")) return;
  document.getElementById("screen-game").classList.add("hidden");
  selectedTeamId = null;
  showLogin();
}

function updateCoinsDisplay() {
  document.getElementById("coins-display").textContent = GS.coins.toLocaleString();
}

// ── NAVIGATION ─────────────────────────────────
function showSection(sec) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  const el = document.getElementById("sec-" + sec);
  const btn = document.getElementById("nav-" + sec);
  if (el) el.classList.add("active");
  if (btn) btn.classList.add("active");
}

// ══════════════════════════════════════════════
//  MY TEAM
// ══════════════════════════════════════════════
function buildMyTeam() {
  const team = getTeam(GS.teamId);
  const title = $("myteam-title");
  if (title) title.innerHTML = `🛡️ ${GS.customTeam} <span style="font-size:.8rem;color:rgba(255,255,255,.3);font-family:Inter">(${team?team.name:''})</span>`;

  const rosterPlayers = GS.roster.map(id => getPlayerById(id)).filter(Boolean);
  const avgRating = rosterPlayers.length ? Math.round(rosterPlayers.reduce((s,p)=>s+p.rating,0)/rosterPlayers.length) : 0;

  // Stats bar
  const statsDiv = document.getElementById("my-roster-stats");
  const wins = GS.stats ? GS.stats.wins : 0;
  const losses = GS.stats ? GS.stats.losses : 0;
  statsDiv.innerHTML = `
    <div class="rs-badge"><span class="rs-val">${rosterPlayers.length}</span><span class="rs-lbl">JUGADORES</span></div>
    <div class="rs-badge"><span class="rs-val" style="color:#ffd700">${GS.coins.toLocaleString()}</span><span class="rs-lbl">💰 MONEDAS</span></div>
    <div class="rs-badge"><span class="rs-val">${wins || 0}W - ${losses || 0}L</span><span class="rs-lbl">RECOD PTDA.</span></div>
    <div class="rs-badge"><span class="rs-val">${avgRating || "–"}</span><span class="rs-lbl">RATING MED.</span></div>`;

  // Historial de partidos (mini log)
  if (GS.history && GS.history.length) {
    const log = document.createElement("div");
    log.className = "recent-matches-pill";
    log.innerHTML = "🏆 Últimos: " + GS.history.slice(-5).reverse().map(m => 
      `<span style="color:${m.res==='W'?'#4caf50':'#ef5350'}">${m.myS}-${m.opS}</span>`).join(" ");
    statsDiv.appendChild(log);
  }

  // Position slots summary
  const pos = document.getElementById("my-roster-positions");
  const needed = ["SP","SP","SP","C","1B","2B","3B","SS","OF","OF","OF","RP","DH"];
  pos.innerHTML = needed.map(p => {
    const filled = rosterPlayers.filter(pl => pl.pos === p);
    const clss = filled.length ? "filled" : "empty";
    const name = filled.length ? filled[0].name.split(" ").pop() : "Libre";
    return `<div class="pos-slot ${clss}"><span class="pos-tag">${p}</span><span>${name}</span></div>`;
  }).join("");

  // Player cards
  const grid = document.getElementById("my-roster-grid");
  grid.innerHTML = "";
  if (!rosterPlayers.length) {
    grid.innerHTML = '<div class="no-results">No tienes jugadores. ¡Ve al Mercado!</div>';
    return;
  }
  rosterPlayers.sort((a,b) => b.rating - a.rating).forEach(p => {
    const card = makeCard(p, [], () => openCardModal(p));
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════
//  MARKET
// ══════════════════════════════════════════════
function buildMarket() {
  filterMarket();
}

function filterMarket() {
  const q = (document.getElementById("market-search")?.value || "").toLowerCase();
  const team = document.getElementById("market-team")?.value || "";
  const pos = document.getElementById("market-pos")?.value || "";
  const sort = document.getElementById("market-sort")?.value || "rating";

  let list = PLAYERS.filter(p => {
    if (GS.roster.includes(p.id)) return false; // already signed
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (team && p.team !== team) return false;
    if (pos && p.pos !== pos) return false;
    return true;
  });

  if (sort === "rating") list.sort((a,b) => b.rating - a.rating);
  else if (sort === "price-asc") list.sort((a,b) => playerPrice(a.rating) - playerPrice(b.rating));
  else if (sort === "price-desc") list.sort((a,b) => playerPrice(b.rating) - playerPrice(a.rating));
  else list.sort((a,b) => a.name.localeCompare(b.name));

  const grid = document.getElementById("market-grid");
  const empty = document.getElementById("market-empty");
  grid.innerHTML = "";
  if (!list.length) { empty.classList.remove("hidden"); return; }
  empty.classList.add("hidden");

  list.forEach(p => {
    const t = getTeam(p.team);
    const price = playerPrice(p.rating);
    const canAfford = GS.coins >= price;
    const statKeys = p.stats.ERA !== undefined ? ["ERA","W","SO"] : ["AVG","HR","RBI"];
    const statsHtml = statKeys.map(k => {
      const v = p.stats[k];
      const d = (k==="AVG"||k==="ERA"||k==="WHIP"||k==="OPS") ? Number(v).toFixed(3) : v;
      return `<div class="mcs-item"><span class="mcs-val">${d}</span><span class="mcs-lbl">${k}</span></div>`;
    }).join("");
    const card = document.createElement("div");
    card.className = "market-card";
    if (t) { card.style.setProperty("--team-primary", t.primary); }
    card.innerHTML = `
      <div class="mc-top">
        <div class="mc-avatar">${POS_EMOJI[p.pos]||"⚾"}</div>
        <div class="mc-rating" style="background:${t?t.primary:"#c41e3a"}">${p.rating}</div>
      </div>
      <div class="mc-name">${p.name}</div>
      <div class="mc-pos-team"><span>${p.pos}</span><span>${t ? t.city+" "+t.name : p.team}</span></div>
      <div class="mc-stats">${statsHtml}</div>
      <div class="mc-footer">
        <span class="mc-price">💰 ${price.toLocaleString()}</span>
        <button class="btn-sign" ${canAfford?"":'disabled title="No tienes suficientes monedas"'} onclick="openContractModal(${p.id})">
          ${canAfford ? "✍️ Firmar" : "🚫 Sin fondos"}
        </button>
      </div>`;
    grid.appendChild(card);
  });
}

// ── CONTRACT MODAL ──────────────────────────────
let signingPlayerId = null;

function openContractModal(playerId) {
  signingPlayerId = playerId;
  const p = getPlayerById(playerId);
  const t = getTeam(p.team);
  const price = playerPrice(p.rating);
  const canAfford = GS.coins >= price;
  const content = document.getElementById("contract-modal-content");
  const mini = makeCard(p, ["cm-player-card"]);
  content.innerHTML = "";
  content.appendChild(mini);
  const info = document.createElement("div");
  info.innerHTML = `
    <div class="cm-title">Contrato para<br/>${p.name}</div>
    <div class="cm-price-box">
      <span class="cm-price-val">💰 ${price.toLocaleString()}</span>
      <span class="cm-price-lbl">monedas</span>
    </div>
    <div class="cm-balance">Tu saldo: 💰 ${GS.coins.toLocaleString()} ${!canAfford ? '– <span style="color:#ef5350">¡Sin fondos suficientes!</span>' : ""}</div>
    ${canAfford
      ? `<button class="btn-confirm-sign" onclick="signPlayer(${playerId})">✍️ FIRMAR CONTRATO</button>`
      : `<div class="cm-no-funds">Necesitas ${(price - GS.coins).toLocaleString()} monedas más</div>`}
    <button class="btn-cancel-sign" onclick="closeContractModal()">Cancelar</button>`;
  content.appendChild(info);
  document.getElementById("contract-modal").classList.remove("hidden");
}

function closeContractModal(e) {
  if (!e || e.target === document.getElementById("contract-modal")) {
    document.getElementById("contract-modal").classList.add("hidden");
  }
}

function signPlayer(playerId) {
  const p = getPlayerById(playerId);
  const price = playerPrice(p.rating);
  if (GS.coins < price) { showToast("💸 No tienes suficientes monedas","error"); return; }
  if (GS.roster.includes(playerId)) { showToast("Ya tienes este jugador","info"); return; }
  GS.coins -= price;
  GS.roster.push(playerId);
  saveGS();
  closeContractModal();
  showToast(`✅ ¡${p.name} firmado por 💰${price.toLocaleString()}!`, "success");
  buildMyTeam();
  buildMarket();
  updateCoinsDisplay();
}

// ══════════════════════════════════════════════
//  DAILY PACK
// ══════════════════════════════════════════════
function buildDailySection() {
  const container = document.getElementById("daily-status");
  const cardsArea = document.getElementById("daily-cards-area");
  cardsArea.innerHTML = "";

  const today = new Date().toISOString().slice(0, 10);
  const alreadyOpened = GS.lastPackDate === today;

  if (alreadyOpened) {
    // Show countdown to midnight
    container.innerHTML = `
      <div class="ds-icon">📦</div>
      <div class="ds-title">Sobre abierto hoy</div>
      <div class="ds-desc">Ya abriste tu sobre gratuito. Vuelve mañana.</div>
      <div class="ds-countdown" id="pack-countdown">--:--:--</div>
      <div class="ds-countdown-lbl">próximo sobre disponible en</div>`;
    startCountdown();
  } else {
    container.innerHTML = `
      <div class="ds-icon">🎁</div>
      <div class="ds-title">¡Sobre disponible!</div>
      <div class="ds-desc">Tienes un sobre gratis esperándote. Contiene 5 cartas aleatorias de la MLB.</div>
      <button class="btn-open-pack" onclick="openDailyPack()">🎁 ¡ABRIR SOBRE!</button>`;
  }
}

function startCountdown() {
  const el = document.getElementById("pack-countdown");
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    if (el) el.textContent = `${h}:${m}:${s}`;
  };
  tick();
  const iv = setInterval(() => { if (!document.getElementById("pack-countdown")) { clearInterval(iv); return; } tick(); }, 1000);
}

function openDailyPack() {
  const today = new Date().toISOString().slice(0, 10);
  if (GS.lastPackDate === today) { showToast("Ya abriste el sobre de hoy", "info"); return; }

  // Draw 5 random cards (weighted: more chance of common)
  const pool = [...PLAYERS];
  const drawn = [];
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    drawn.push(pool.splice(idx, 1)[0]);
  }

  GS.lastPackDate = today;
  saveGS();

  // Update UI
  buildDailySection(); // shows countdown
  const cardsArea = document.getElementById("daily-cards-area");
  cardsArea.innerHTML = "<div style='text-align:center;width:100%;font-family:Bebas Neue,cursive;font-size:1.2rem;letter-spacing:3px;color:rgba(255,255,255,.5);margin-bottom:.5rem'>✨ CARTAS DE HOY ✨</div>";
  drawn.forEach((p, i) => {
    const card = makeCard(p, ["daily-new-card"], () => openCardModal(p));
    card.style.setProperty("--i", i);
    cardsArea.appendChild(card);
  });
  showToast("🎁 ¡5 cartas nuevas desbloqueadas!", "success");
}

// ══════════════════════════════════════════════
//  COLECCIÓN
// ══════════════════════════════════════════════
function buildColeccion() {
  filterCards();
}

function filterCards() {
  const q = (document.getElementById("search-input")?.value || "").toLowerCase();
  const team = document.getElementById("filter-team")?.value || "";
  const pos = document.getElementById("filter-pos")?.value || "";
  const league = document.getElementById("filter-league")?.value || "";

  const list = PLAYERS.filter(p => {
    const t = getTeam(p.team);
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (team && p.team !== team) return false;
    if (pos && p.pos !== pos) return false;
    if (league && t && t.league !== league) return false;
    return true;
  });

  const grid = document.getElementById("cards-grid");
  const noRes = document.getElementById("no-results");
  grid.innerHTML = "";
  if (!list.length) { noRes?.classList.remove("hidden"); return; }
  noRes?.classList.add("hidden");
  list.forEach(p => {
    const owned = GS.roster.includes(p.id);
    const card = makeCard(p, [], () => openCardModal(p));
    if (owned) card.style.outline = "2px solid rgba(76,175,80,.5)";
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════
//  EQUIPOS
// ══════════════════════════════════════════════
function buildEquipos() {
  const alGrid = document.getElementById("al-teams");
  const nlGrid = document.getElementById("nl-teams");
  TEAMS.forEach(t => {
    const count = PLAYERS.filter(p => p.team === t.id).length;
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `<div class="team-emoji">${t.emoji}</div><div class="team-card-name">${t.name}</div><div class="team-card-city">${t.city}</div><div class="team-card-count">${count} jugadores</div>`;
    card.onclick = () => openTeamView(t);
    (t.league === "AL" ? alGrid : nlGrid).appendChild(card);
  });
}

function openTeamView(team) {
  const players = PLAYERS.filter(p => p.team === team.id).sort((a,b) => b.rating - a.rating);
  const overlay = document.createElement("div");
  overlay.className = "team-expanded";
  overlay.innerHTML = `
    <div class="te-header">
      <button class="te-close" onclick="this.closest('.team-expanded').remove()">✕</button>
      <div style="font-size:2rem">${team.emoji}</div>
      <div class="te-title">${team.city.toUpperCase()} ${team.name.toUpperCase()}</div>
      <div style="color:rgba(255,255,255,.4);font-size:.78rem">${team.league} · ${team.division} &bull; ${players.length} jugadores</div>
    </div>
    <div class="te-grid" id="te-inner"></div>`;
  document.body.appendChild(overlay);
  const grid = overlay.querySelector("#te-inner");
  players.forEach(p => { grid.appendChild(makeCard(p, [], () => openCardModal(p))); });
}

// ══════════════════════════════════════════════
//  CARD BUILDER
// ══════════════════════════════════════════════
function makeCard(p, extraClasses = [], clickFn = null) {
  const team = getTeam(p.team);
  const rarity = getRarity(p.rating);
  const primary = team ? team.primary : "#1a2a4a";
  const secondary = team ? team.secondary : "#0a0e1a";
  const statKeys = p.stats.ERA !== undefined ? ["ERA","W","SO","WHIP"] : ["AVG","HR","RBI","OPS"];
  const statsBarHtml = statKeys.map(k => {
    const v = p.stats[k];
    const d = (k==="AVG"||k==="ERA"||k==="WHIP"||k==="OPS") ? Number(v).toFixed(3) : v;
    return `<div class="cf-stat"><span class="cf-stat-val">${d}</span><span class="cf-stat-lbl">${k}</span></div>`;
  }).join("");
  const backRows = Object.entries(p.stats).map(([k,v]) => {
    const label = {ERA:"ERA",W:"Victorias",SO:"Ponches",IP:"Innings",WHIP:"WHIP",SV:"Salvamentos",AVG:"Promedio",HR:"Jonrones",RBI:"Carreras Imp.",OPS:"OPS",SB:"Bas. Rob."}[k]||k;
    const d = (k==="AVG"||k==="ERA"||k==="WHIP"||k==="OPS") ? Number(v).toFixed(3) : v;
    return `<div class="cb-stat-row"><span class="cbs-label">${label}</span><span class="cbs-val">${d}</span></div>`;
  }).join("");

  const div = document.createElement("div");
  div.className = `player-card rarity-${rarity}${extraClasses.length ? " " + extraClasses.join(" ") : ""}`;
  div.style.setProperty("--team-primary", primary);
  div.style.setProperty("--team-secondary", secondary);
  div.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-front">
        <div class="cf-header"><span class="cf-number">#${p.id}</span><span class="cf-rating">${p.rating}</span></div>
        <div class="cf-avatar">${POS_EMOJI[p.pos]||"⚾"}</div>
        <div class="cf-info">
          <div class="cf-name">${p.name}</div>
          <div class="cf-pos-team"><span class="cf-pos">${p.pos}</span><span class="cf-team-abbr">${team?team.abbr:p.team}</span></div>
          <div class="cf-stat-bar">${statsBarHtml}</div>
        </div>
      </div>
      <div class="card-face card-back">
        <div class="cb-title">MLB CARD 2025</div>
        <div class="cb-name">${p.name}</div>
        <div class="cb-stats">${backRows}</div>
        <div class="cb-country">${p.country} · ${p.age} años</div>
      </div>
    </div>`;
  div.addEventListener("click", clickFn || (() => div.classList.toggle("flipped")));
  return div;
}

// ══════════════════════════════════════════════
//  CARD MODAL
// ══════════════════════════════════════════════
function openCardModal(p) {
  const team = getTeam(p.team);
  const price = playerPrice(p.rating);
  const owned = GS.roster.includes(p.id);
  const content = document.getElementById("modal-card-content");
  content.innerHTML = "";
  const big = makeCard(p, ["modal-big-card"]);
  big.style.width = "230px"; big.style.height = "330px";

  const statRows = Object.entries(p.stats).map(([k,v]) => {
    const label = {ERA:"ERA",W:"Victorias",SO:"Ponches",IP:"Innings",WHIP:"WHIP",SV:"Salvamentos",AVG:"Promedio Bateo",HR:"Jonrones",RBI:"Carreras Impulsadas",OPS:"OPS",SB:"Bases Robadas"}[k]||k;
    const d = (k==="AVG"||k==="ERA"||k==="WHIP"||k==="OPS") ? Number(v).toFixed(3) : v;
    return `<div class="mst-row"><span class="mst-label">${label}</span><span class="mst-val">${d}</span></div>`;
  }).join("");

  const info = document.createElement("div");
  info.style.width = "100%";
  info.innerHTML = `
    <div style="font-family:'Bebas Neue',cursive;font-size:1.3rem;letter-spacing:2px;margin-bottom:.3rem">${p.name}</div>
    <div style="color:rgba(255,255,255,.45);font-size:.76rem;margin-bottom:.8rem">${p.country} &bull; ${team ? team.city+" "+team.name : p.team} &bull; ${p.pos} &bull; ${p.age} años</div>
    <div class="modal-stats-table">${statRows}</div>
    <div style="margin-top:1rem;text-align:center">
      ${owned
        ? `<div style="color:#4caf50;font-weight:700;font-size:.9rem">✅ Ya en tu plantilla</div>`
        : GS.coins >= price
          ? `<button class="btn-start" style="font-size:1rem;padding:.55rem 1.2rem;display:inline-block;width:auto" onclick="signPlayer(${p.id});closeCardModal()">✍️ Firmar – 💰${price.toLocaleString()}</button>`
          : `<div style="color:rgba(255,255,255,.35);font-size:.8rem">💰 Precio: ${price.toLocaleString()} (sin fondos)</div>`}
    </div>`;
  content.appendChild(big);
  content.appendChild(info);
  document.getElementById("card-modal").classList.remove("hidden");
}

function closeCardModal(e) {
  if (!e || e.target === document.getElementById("card-modal") || e.target.classList.contains("modal-close")) {
    document.getElementById("card-modal").classList.add("hidden");
  }
}

// ══════════════════════════════════════════════
//  WELCOME MODAL
// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
//  MULTIPLAYER SYSTEM (PEERJS)
// ══════════════════════════════════════════════
function generateShortId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
  let res = "";
  for (let i = 0; i < 4; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
  return res;
}

function hostOnlineGame(mode = null) {
  console.log("Iniciando HOST...", mode);
  if (peer) { try { peer.destroy(); } catch(e){} }
  peer = null;
  isHost = true;
  wagerMode = (mode === 'WAGER');
  
  if (wagerMode) return openWagerSelector();
  startHost();
}

function startHost() {
  $("multi-setup").classList.add("hidden");
  $("online-status").classList.remove("hidden");
  $("online-status").textContent = "Generando sala...";

  const sid = generateShortId();
  try {
    peer = new Peer(sid);
    
    peer.on('open', (id) => {
      console.log("Sala abierta ID:", id);
      $("online-status").textContent = wagerMode ? "APUESTA ACTIVADA 💎" : "SALA CREADA";
      $("my-peer-id").textContent = id;
      $("room-id-display").classList.remove("hidden");
    });

    peer.on('error', (err) => {
      console.error("Peer Error:", err.type);
      if (err.type === 'unavailable-id') {
        setTimeout(startHost, 300);
      } else {
        $("online-status").textContent = "Error: " + err.type;
        setTimeout(() => location.reload(), 2000);
      }
    });

    peer.on('connection', (c) => {
      console.log("Rival conectado!");
      conn = c;
      setupConnection();
    });
  } catch(e) {
    console.error("Fatal Peer Error:", e);
    alert("Error al iniciar PeerJS");
  }
}

function joinOnlineGame() {
  const rid = $("join-room-id").value.trim().toUpperCase();
  if (!rid) return alert("Introduce un código");
  
  console.log("Intentando UNIRSE a:", rid);
  isHost = false;
  if (peer) { try { peer.destroy(); } catch(e){} }
  
  $("online-status").classList.remove("hidden");
  $("online-status").textContent = "Buscando sala " + rid + "...";
  
  peer = new Peer();
  peer.on('open', () => {
    conn = peer.connect(rid);
    
    const timeout = setTimeout(() => {
      if (conn && !conn.open) {
        alert("No se pudo conectar. Verifica el ID.");
        location.reload();
      }
    }, 8000);

    setupConnection();
    conn.on('open', () => clearTimeout(timeout));
  });

  peer.on('error', (err) => {
    console.error("Join Error:", err);
    alert("Error al conectar.");
    location.reload();
  });
}

function setupConnection() {
  const totalRounds = parseInt($("match-rounds-sel").value) || 9;

  conn.on('open', () => {
    conn.send({ 
      type: 'HANDSHAKE', 
      username: GS.username, 
      customTeam: GS.customTeam,
      teamId: GS.teamId, 
      roster: GS.roster,
      isWager: wagerMode,
      wagerLineup: wagerMode ? selectedLineupIds : null,
      totalRounds: totalRounds
    });
  });

  conn.on('data', (data) => {
    console.log("Data recibida:", data.type);
    if (data.type === 'HANDSHAKE') {
      if (data.isWager && !selectedLineupIds.length) {
         wagerMode = true;
         pendingMatchParams = { rivalData: data };
         return openWagerSelector();
      }
      startMatch(data.isWager ? "WAGER" : "ONLINE_REAL", "HARD", data, data.isWager ? selectedLineupIds : null);
      if (isHost) {
         conn.send({ type: 'HANDSHAKE', username: GS.username, customTeam: GS.customTeam, teamId: GS.teamId, roster: GS.roster, isWager: wagerMode, wagerLineup: wagerMode ? selectedLineupIds : null, totalRounds: totalRounds });
      }
    }
    if (data.type === 'INNING_SYNC') {
      executeSyncedInning(data);
    }
  });
}

function openWagerSelector() {
  const totalR = parseInt($("match-rounds-sel").value) || 9;
  pendingMatchParams = { mode: "WAGER" };
  selectedLineupIds = [];
  
  $("lineup-modal").classList.remove("hidden");
  $("lineup-lbl-count").textContent = `APUESTA ${totalR} JUGADORES (1 POR RONDA)`;
  $("btn-start-match").classList.add("disabled");
  $("btn-start-match").textContent = "CONFIRMAR APUESTAS 💎";
  
  const grid = $("lineup-grid");
  grid.innerHTML = "";
  
  GS.roster.forEach(pid => {
    const p = getPlayerById(pid);
    if (!p) return;
    const card = makeCard(p, ["wc-mini"], () => {
      const idx = selectedLineupIds.indexOf(pid);
      if (idx > -1) {
        selectedLineupIds.splice(idx, 1);
        card.classList.remove("selected");
      } else {
        if (selectedLineupIds.length >= totalR) return showToast(`Solo ${totalR} cartas`, "warn");
        selectedLineupIds.push(pid);
        card.classList.add("selected");
      }
      $("lineup-lbl-count").textContent = `Faltan: ${totalR - selectedLineupIds.length}`;
      $("btn-start-match").classList.toggle("disabled", selectedLineupIds.length !== totalR);
    });
    grid.appendChild(card);
  });
}

function showWelcome(starterIds) {
  const t = getTeam(GS.teamId);
  const players = starterIds.map(id => getPlayerById(id)).filter(Boolean);
  const wt = document.getElementById("welcome-text");
  const wc = document.getElementById("welcome-starter-cards");
  wt.innerHTML = `¡Eres el manager de los <strong>${t.city} ${t.name}</strong> ${t.emoji}<br/>
    Empiezas con <strong>18 jugadores</strong> — el peor de cada posición del roster
    (5 SP · 3 RP · 2 C · 4 infield · 3 OF · 1 DH).<br/>
    Tienes <strong>💰 1,000 monedas</strong> para firmar a los mejores en el Mercado.`;
  wc.innerHTML = "";
  players.forEach(p => {
    const mini = makeCard(p, ["wc-mini"], () => {});
    mini.style.width = "130px"; mini.style.height = "190px";
    wc.appendChild(mini);
  });
  document.getElementById("welcome-modal").classList.remove("hidden");
}

function closeWelcome() {
  document.getElementById("welcome-modal").classList.add("hidden");
}

// ══════════════════════════════════════════════
//  TEAM FILTER DROPDOWN BUILDER
// ══════════════════════════════════════════════
function buildTeamFilterDropdown(selId) {
  const sel = document.getElementById(selId);
  if (!sel) return;
  while (sel.options.length > 1) sel.remove(1);
  TEAMS.forEach(t => {
    const o = document.createElement("option");
    o.value = t.id;
    o.textContent = `${t.emoji} ${t.city} ${t.name}`;
    sel.appendChild(o);
  });
}

// ══════════════════════════════════════════════
//  MATCH SYSTEM
// ══════════════════════════════════════════════
let matchState = {
  mode: null,
  level: "EASY",
  inning: 1,
  homeScore: 0,
  awayScore: 0,
  homeRoster: [],
  awayRoster: [],
  currentStat: null,
  isLocked: false
};

function openGameMenu() {
  $("game-menu-modal").classList.remove("hidden");
}

function closeGameMenu(e) {
  if (!e || e.target === $("game-menu-modal") || e.target.classList.contains("modal-close")) {
    $("game-menu-modal").classList.add("hidden");
  }
}


function openLineup(mode, level = "EASY", rivalData = null) {
  pendingMatchParams = { mode, level, rivalData };
  selectedLineupIds = [];
  $("lineup-modal").classList.remove("hidden");
  updateLineupLabel();
  $("btn-start-match").classList.add("disabled");
  
  const grid = $("lineup-grid");
  grid.innerHTML = "";
  
  GS.roster.forEach(pid => {
    const p = getPlayerById(pid);
    if (!p) return;
    const card = makeCard(p, ["wc-mini"], () => toggleLineup(pid));
    card.id = `lineup-card-${pid}`;
    grid.appendChild(card);
  });
}

function toggleLineup(pid) {
  const p = getPlayerById(pid);
  if (!p) return;

  const idx = selectedLineupIds.indexOf(pid);
  const card = document.getElementById(`lineup-card-${pid}`);
  
  if (idx > -1) {
    selectedLineupIds.splice(idx, 1);
    if (card) card.classList.remove("selected");
  } else {
    // Position Validation (5 P, 5 OF, 4 IF, 1 C) - Total 15
    const c = getLineupPositionCounts();
    const isP = p.pos === "SP" || p.pos === "RP";
    const isIF = ["1B","2B","3B","SS"].includes(p.pos);
    const isOF = p.pos === "OF";
    const isC = p.pos === "C";

    if (isP && c.p >= 5) return showToast("Límite: 5 Pitchers", "warn");
    if (isOF && c.of >= 5) return showToast("Límite: 5 Outfielders", "warn");
    if (isIF && c.if >= 4) return showToast("Límite: 4 Infielders", "warn");
    if (isC && c.c >= 1) return showToast("Límite: 1 Catcher", "warn");

    selectedLineupIds.push(pid);
    if (card) card.classList.add("selected");
  }
  updateLineupLabel();
}

function getLineupPositionCounts() {
  const counts = { p:0, of:0, if:0, c:0 };
  selectedLineupIds.forEach(id => {
    const player = getPlayerById(id);
    if (player) {
      if (player.pos === "SP" || player.pos === "RP") counts.p++;
      else if (player.pos === "OF") counts.of++;
      else if (["1B","2B","3B","SS"].includes(player.pos)) counts.if++;
      else if (player.pos === "C") counts.c++;
    }
  });
  return counts;
}

function updateLineupLabel() {
  const c = getLineupPositionCounts();
  $("lineup-lbl-count").innerHTML = `P: ${c.p}/5 | OF: ${c.of}/5 | IF: ${c.if}/4 | C: ${c.c}/1`;
  const isComplete = (c.p === 5 && c.of === 5 && c.if === 4 && c.c === 1);
  $("btn-start-match").classList.toggle("disabled", !isComplete);
}

function confirmLineup() {
  if (wagerMode) {
    closeLineup();
    $("btn-start-match").textContent = "¡CANTAR PLAY! ⚾";
    if (isHost) startHost();
    else if (pendingMatchParams.rivalData) {
       startMatch("WAGER", "HARD", pendingMatchParams.rivalData, [myWagerId]);
    }
    return;
  }
  const c = getLineupPositionCounts();
  const isComplete = (c.p === 5 && c.of === 5 && c.if === 4 && c.c === 1);
  if (!isComplete) return showToast("Alineación incompleta (necesitas 15)", "warn");
  
  const { mode, level, rivalData } = pendingMatchParams;
  closeLineup();
  startMatch(mode, level, rivalData, selectedLineupIds);
}

function closeLineup() {
  $("lineup-modal").classList.add("hidden");
}

function generateRandomTeam(level = "EASY") {
  const team = [];
  const slots = ["SP","SP","SP","RP","RP","C","1B","2B","3B","SS","OF","OF","OF","DH"];
  let minR = 60, maxR = 75;
  if (level === "MEDIUM") { minR = 78; maxR = 86; }
  if (level === "HARD") { minR = 88; maxR = 100; }
  slots.forEach(pos => {
    let pool = PLAYERS.filter(p => p.pos === pos && p.rating >= minR && p.rating <= maxR);
    if (!pool.length) pool = PLAYERS.filter(p => p.pos === pos);
    const p = pool[Math.floor(Math.random() * pool.length)];
    if (p) team.push(p.id);
  });
  return team;
}
function startMatch(mode, level = "EASY", rivalData = null, customLineup = null) {
  closeGameMenu();
  const homeTeam = getTeam(GS.teamId);
  
  let awayTeamDesc;
  if(mode === "AI") awayTeamDesc = { name: "IA " + level.charAt(0), emoji: "🤖", primary: level==='HARD'?'#f44336':'#555' };
  else if(mode === "ONLINE") awayTeamDesc = { name: "RIVAL_MOD" + Math.floor(Math.random()*999), emoji: "🔥", primary: "#c4a000" };
  else if(mode === "WAGER") awayTeamDesc = { name: (rivalData.customTeam || rivalData.username) + " 💎", emoji: "🃏", primary: "#ff9800" };
  else if(mode === "ONLINE_REAL" && rivalData) {
    const rTeam = getTeam(rivalData.teamId);
    awayTeamDesc = { name: rivalData.customTeam || rivalData.username, emoji: rTeam ? rTeam.emoji : "👤", primary: rTeam ? rTeam.primary : "#c4a000" };
  }
  else awayTeamDesc = { name: "Rival", emoji: "👤", primary: "#444" };

  matchState = {
    mode: mode,
    level: level,
    inning: 1,
    totalInnings: rivalData ? (rivalData.totalRounds || 9) : (parseInt($("match-rounds-sel").value) || 9),
    homeScore: 0,
    awayScore: 0,
    homeRoster: customLineup || [...GS.roster].sort(() => 0.5 - Math.random()).slice(0, 9),
    awayRoster: (mode === "WAGER") ? (rivalData.wagerLineup || []) : ((mode === "ONLINE_REAL" && rivalData) ? rivalData.roster.slice(0, 9) : generateRandomTeam(mode === "ONLINE" ? "HARD" : level).sort(() => 0.5 - Math.random()).slice(0, 9)),
    currentStat: null,
    isLocked: false,
    rivalData: rivalData,
    wagerResults: [] 
  };

  // Setup UI
  $("m-home-name").textContent = GS.customTeam || homeTeam.name;
  $("m-home-logo").textContent = homeTeam ? homeTeam.emoji : "⚾";
  $("m-away-name").textContent = awayTeamDesc.name;
  $("m-away-logo").textContent = awayTeamDesc.emoji;
  $("m-home-score").textContent = "0";
  $("m-away-score").textContent = "0";
  $("m-inning").textContent = "1";
  $("m-card-home").innerHTML = "";
  $("m-card-away").innerHTML = "";
  
  document.documentElement.style.setProperty("--home-primary", homeTeam ? homeTeam.primary : "#444");
  document.documentElement.style.setProperty("--away-primary", awayTeamDesc.primary);

  // If online guest, show "Waiting for host"
  const mActions = $("m-actions");
  mActions.innerHTML = "";
  if (mode === "ONLINE_REAL" && !isHost) {
    mActions.innerHTML = `<span style="color:rgba(255,255,255,.4); font-size:.8rem; font-style:italic">Esperando que el Host inicie la entrada...</span>`;
  } else {
    mActions.innerHTML = `<button class="btn-match" onclick="nextInning()">SIGUIENTE ENTRADA ⚾</button>`;
  }

  $("match-modal").classList.remove("hidden");
}

// (End of Match System)

function nextInning() {
  if (matchState.inning > matchState.totalInnings) {
    finishMatch();
    return;
  }
  if (matchState.isLocked) return;
  matchState.isLocked = true;
  
  const btn = $("m-actions").querySelector("button");
  if (btn) { btn.disabled = true; btn.style.opacity = "0.5"; }

  // Pick players
  const hIdx = (matchState.inning - 1) % matchState.homeRoster.length;
  const aIdx = (matchState.inning - 1) % matchState.awayRoster.length;
  const homePObj = getPlayerById(matchState.homeRoster[hIdx]) || PLAYERS[0];
  const awayPObj = getPlayerById(matchState.awayRoster[aIdx]) || PLAYERS[1];

  const isPitcher = homePObj.stats.ERA !== undefined;
  const statsDef = isPitcher ? ["ERA", "WHIP", "SO"] : ["AVG", "OPS", "HR"];
  const statDef = statsDef[Math.floor(Math.random() * statsDef.length)];

  if (matchState.mode === "ONLINE_REAL" && isHost && conn) {
    conn.send({
      type: 'INNING_SYNC',
      stat: statDef,
      homePId: homePObj.id,
      awayPId: awayPObj.id
    });
  }

  doBattle(homePObj, awayPObj, statDef);
}

function executeSyncedInning(data) {
  // Guest receives host choice but swaps perspectives
  const homeP = getPlayerById(data.awayPId) || PLAYERS[0];
  const awayP = getPlayerById(data.homePId) || PLAYERS[1];
  doBattle(homeP, awayP, data.stat);
}

function doBattle(p1, p2, stat) {
  matchState.isLocked = true;
  $("m-battle-res").style.display = "none";
  $("m-stat-value").textContent = "BATEANDO...";

  $("m-card-home").innerHTML = "";
  $("m-card-away").innerHTML = "";
  $("m-card-home").appendChild(makeCard(p1));
  $("m-card-away").appendChild(makeCard(p2));
  
  $("m-inning").textContent = matchState.inning;
  $("m-stat-name").textContent = "DUELO POR: " + stat;
  
  const val1 = p1.stats[stat] || 0;
  const val2 = p2.stats[stat] || 0;

  setTimeout(() => {
    $("m-stat-value").textContent = `${val1} vs ${val2}`;
    
    let p1Wins = false;
    if (stat === "ERA" || stat === "WHIP") p1Wins = val1 < val2;
    else p1Wins = val1 > val2;

    if (p1Wins) {
      matchState.homeScore++;
      matchState.wagerResults.push({ inning: matchState.inning, winner: 'home' });
      showBattleResult("¡CARRERA!", "#4caf50");
    } else if (val1 === val2) {
      matchState.wagerResults.push({ inning: matchState.inning, winner: 'draw' });
      showBattleResult("OUT", "#aaa");
    } else {
      matchState.awayScore++;
      matchState.wagerResults.push({ inning: matchState.inning, winner: 'away' });
      showBattleResult("RIVAL ANOTA", "#ef5350");
    }

    $("m-home-score").textContent = matchState.homeScore;
    $("m-away-score").textContent = matchState.awayScore;
    
    matchState.inning++;
    matchState.isLocked = false;
    const btn = $("m-actions").querySelector("button");
    if (btn) { btn.disabled = false; btn.style.opacity = "1"; }
  }, 1200);
}

function showBattleResult(text, color) {
  const res = $("m-battle-res");
  res.textContent = text;
  res.style.color = color;
  res.style.display = "block";
  res.style.animation = "none";
  setTimeout(() => res.style.animation = "statZoom 0.5s ease", 10);
}

function finishMatch() {
  const won = matchState.homeScore > matchState.awayScore;
  const draw = matchState.homeScore === matchState.awayScore;
  
  if (matchState.mode === "WAGER") {
    let gainedCount = 0;
    let lostCount = 0;
    
    matchState.wagerResults.forEach(res => {
      const hCard = matchState.homeRoster[res.inning - 1];
      const aCard = matchState.awayRoster[res.inning - 1];
      
      if (res.winner === 'home') {
        if (aCard && !GS.roster.includes(aCard)) {
          GS.roster.push(aCard);
          gainedCount++;
        }
      } else if (res.winner === 'away') {
        GS.roster = GS.roster.filter(id => id !== hCard);
        lostCount++;
      }
    });

    if (gainedCount > 0) showToast(`¡GANASTE ${gainedCount} CARTAS! 🎉`, "success");
    if (lostCount > 0) showToast(`Perdiste ${lostCount} cartas... 💀`, "error");
    
    wagerMode = false;
    selectedLineupIds = [];
  }

  let reward = won ? 100 : (draw ? 40 : 10);
  if (matchState.mode === "HUMAN") {
    reward = won ? 250 : (draw ? 80 : 20);
  } else if (matchState.mode === "ONLINE") {
    reward = won ? 500 : (draw ? 150 : 50);
  } else {
    // AI levels
    if (matchState.level === "EASY") reward = won ? 80 : (draw ? 20 : 5);
    if (matchState.level === "MEDIUM") reward = won ? 150 : (draw ? 50 : 15);
    if (matchState.level === "HARD") reward = won ? 350 : (draw ? 100 : 30);
  }
  
  // Save stats
  if (!GS.stats) GS.stats = { wins: 0, losses: 0 };
  if (won) GS.stats.wins++;
  else if (!draw) GS.stats.losses++;

  if (!GS.history) GS.history = [];
  GS.history.push({
    myS: matchState.homeScore,
    opS: matchState.awayScore,
    res: won ? 'W' : (draw ? 'D' : 'L'),
    date: new Date().toISOString()
  });

  GS.coins += reward;
  saveGS();
  updateCoinsDisplay();

  $("pm-emoji").textContent = won ? "🏆" : (draw ? "🤝" : "⚾");
  $("pm-title").textContent = won ? "¡VICTORIA!" : (draw ? "EMPATE" : "FIN DEL JUEGO");
  $("pm-score").textContent = `${matchState.homeScore} - ${matchState.awayScore}`;
  $("pm-reward").textContent = `Recibes 💰 ${reward}`;

  $("post-match-modal").classList.remove("hidden");
}

function closePostMatch() {
  $("post-match-modal").classList.add("hidden");
  $("match-modal").classList.add("hidden");
  buildMyTeam(); // Refresh team view
}

// ══════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════
function showToast(msg, type = "info") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
// ══════════════════════════════════════════════
//  INITIALIZATION
// ══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  loadGS();
  if (GS.loggedIn) {
    showGame();
  } else {
    showLogin();
  }
  
  // Hide splash
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      splash.style.opacity = "0";
      setTimeout(() => splash.classList.add("hidden"), 800);
    }
  }, 2400);
});
