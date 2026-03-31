// MLB Teams & Players Data 2025
const TEAMS = [
  // AL East
  { id:"NYY", name:"Yankees", city:"New York", abbr:"NYY", league:"AL", division:"East", emoji:"⚾", primary:"#003087", secondary:"#001a4d" },
  { id:"BOS", name:"Red Sox", city:"Boston", abbr:"BOS", league:"AL", division:"East", emoji:"🔴", primary:"#bd3039", secondary:"#0d2b56" },
  { id:"TBR", name:"Rays", city:"Tampa Bay", abbr:"TB", league:"AL", division:"East", emoji:"☀️", primary:"#092c5c", secondary:"#8fbce6" },
  { id:"TOR", name:"Blue Jays", city:"Toronto", abbr:"TOR", league:"AL", division:"East", emoji:"🔵", primary:"#134a8e", secondary:"#1d2d5c" },
  { id:"BAL", name:"Orioles", city:"Baltimore", abbr:"BAL", league:"AL", division:"East", emoji:"🟠", primary:"#df4601", secondary:"#000000" },
  // AL Central
  { id:"MIN", name:"Twins", city:"Minnesota", abbr:"MIN", league:"AL", division:"Central", emoji:"🔴", primary:"#002b5c", secondary:"#d31145" },
  { id:"CLE", name:"Guardians", city:"Cleveland", abbr:"CLE", league:"AL", division:"Central", emoji:"🔴", primary:"#e31937", secondary:"#002b5c" },
  { id:"CWS", name:"White Sox", city:"Chicago", abbr:"CWS", league:"AL", division:"Central", emoji:"⚫", primary:"#27251f", secondary:"#c4ced4" },
  { id:"KCR", name:"Royals", city:"Kansas City", abbr:"KC", league:"AL", division:"Central", emoji:"🔵", primary:"#004687", secondary:"#bd9b60" },
  { id:"DET", name:"Tigers", city:"Detroit", abbr:"DET", league:"AL", division:"Central", emoji:"🐯", primary:"#0c2c56", secondary:"#fa4616" },
  // AL West
  { id:"HOU", name:"Astros", city:"Houston", abbr:"HOU", league:"AL", division:"West", emoji:"🌟", primary:"#002d62", secondary:"#eb6e1f" },
  { id:"SEA", name:"Mariners", city:"Seattle", abbr:"SEA", league:"AL", division:"West", emoji:"🌊", primary:"#0c2c56", secondary:"#005c5c" },
  { id:"TEX", name:"Rangers", city:"Texas", abbr:"TEX", league:"AL", division:"West", emoji:"⭐", primary:"#003278", secondary:"#c0111f" },
  { id:"LAA", name:"Angels", city:"Los Angeles", abbr:"LAA", league:"AL", division:"West", emoji:"😇", primary:"#ba0021", secondary:"#003263" },
  { id:"OAK", name:"Athletics", city:"Oakland", abbr:"ATH", league:"AL", division:"West", emoji:"🐘", primary:"#003831", secondary:"#efb21e" },
  // NL East
  { id:"ATL", name:"Braves", city:"Atlanta", abbr:"ATL", league:"NL", division:"East", emoji:"🪓", primary:"#ce1141", secondary:"#13274f" },
  { id:"NYM", name:"Mets", city:"New York", abbr:"NYM", league:"NL", division:"East", emoji:"🔵", primary:"#002d72", secondary:"#ff5910" },
  { id:"PHI", name:"Phillies", city:"Philadelphia", abbr:"PHI", league:"NL", division:"East", emoji:"🔴", primary:"#e81828", secondary:"#002d72" },
  { id:"MIA", name:"Marlins", city:"Miami", abbr:"MIA", league:"NL", division:"East", emoji:"🐟", primary:"#00a3e0", secondary:"#ef3340" },
  { id:"WSN", name:"Nationals", city:"Washington", abbr:"WSH", league:"NL", division:"East", emoji:"🦅", primary:"#ab0003", secondary:"#14225a" },
  // NL Central
  { id:"CHC", name:"Cubs", city:"Chicago", abbr:"CHC", league:"NL", division:"Central", emoji:"🐻", primary:"#0e3386", secondary:"#cc3433" },
  { id:"STL", name:"Cardinals", city:"St. Louis", abbr:"STL", league:"NL", division:"Central", emoji:"🐦", primary:"#c41e3a", secondary:"#0c2340" },
  { id:"MIL", name:"Brewers", city:"Milwaukee", abbr:"MIL", league:"NL", division:"Central", emoji:"🍺", primary:"#12284b", secondary:"#b6922e" },
  { id:"CIN", name:"Reds", city:"Cincinnati", abbr:"CIN", league:"NL", division:"Central", emoji:"🔴", primary:"#c6011f", secondary:"#000000" },
  { id:"PIT", name:"Pirates", city:"Pittsburgh", abbr:"PIT", league:"NL", division:"Central", emoji:"🏴‍☠️", primary:"#27251f", secondary:"#fdb827" },
  // NL West
  { id:"LAD", name:"Dodgers", city:"Los Angeles", abbr:"LAD", league:"NL", division:"West", emoji:"💙", primary:"#005a9c", secondary:"#ef3e42" },
  { id:"SFG", name:"Giants", city:"San Francisco", abbr:"SF", league:"NL", division:"West", emoji:"🟠", primary:"#fd5a1e", secondary:"#27251f" },
  { id:"SDP", name:"Padres", city:"San Diego", abbr:"SD", league:"NL", division:"West", emoji:"🟤", primary:"#2f241d", secondary:"#ffc425" },
  { id:"ARI", name:"Diamondbacks", city:"Arizona", abbr:"ARI", league:"NL", division:"West", emoji:"🐍", primary:"#a71930", secondary:"#e3d4ad" },
  { id:"COL", name:"Rockies", city:"Colorado", abbr:"COL", league:"NL", division:"West", emoji:"🏔️", primary:"#33006f", secondary:"#c4ced4" },
];

// Emoji avatars by position
const POS_EMOJI = { P:"⚾",C:"🥎","1B":"🏟️","2B":"🔄","3B":"🛡️",SS:"⚡",OF:"🌿",DH:"💥",RP:"🎯",SP:"🎯" };

// Rarity based on rating
function getRarity(r){ if(r>=95) return "diamond"; if(r>=88) return "gold"; if(r>=80) return "silver"; return "bronze"; }

const PLAYERS = [
  // NEW YORK YANKEES
  {id:1,name:"Aaron Judge",team:"NYY",pos:"OF",age:32,country:"🇺🇸",rating:99,stats:{AVG:.322,HR:58,RBI:144,OPS:1.159,SB:10}},
  {id:2,name:"Juan Soto",team:"NYY",pos:"OF",age:26,country:"🇩🇴",rating:97,stats:{AVG:.315,HR:41,RBI:109,OPS:1.057,SB:12}},
  {id:3,name:"Gerrit Cole",team:"NYY",pos:"SP",age:34,country:"🇺🇸",rating:91,stats:{ERA:2.75,W:15,SO:222,IP:193,WHIP:1.06}},
  {id:4,name:"Jazz Chisholm Jr.",team:"NYY",pos:"2B",age:27,country:"🇧🇸",rating:87,stats:{AVG:.263,HR:24,RBI:75,OPS:.841,SB:22}},
  {id:5,name:"Cody Bellinger",team:"NYY",pos:"1B",age:29,country:"🇺🇸",rating:85,stats:{AVG:.271,HR:26,RBI:83,OPS:.849,SB:9}},
  {id:6,name:"Austin Wells",team:"NYY",pos:"C",age:25,country:"🇺🇸",rating:81,stats:{AVG:.258,HR:20,RBI:68,OPS:.811,SB:3}},
  {id:7,name:"Gleyber Torres",team:"NYY",pos:"2B",age:28,country:"🇻🇪",rating:80,stats:{AVG:.257,HR:15,RBI:63,OPS:.768,SB:5}},
  {id:8,name:"Carlos Rodon",team:"NYY",pos:"SP",age:32,country:"🇺🇸",rating:82,stats:{ERA:3.55,W:13,SO:185,IP:178,WHIP:1.18}},
  // BOSTON RED SOX
  {id:9,name:"Rafael Devers",team:"BOS",pos:"3B",age:28,country:"🇩🇴",rating:93,stats:{AVG:.298,HR:38,RBI:112,OPS:.941,SB:3}},
  {id:10,name:"Triston Casas",team:"BOS",pos:"1B",age:25,country:"🇺🇸",rating:83,stats:{AVG:.272,HR:24,RBI:79,OPS:.862,SB:1}},
  {id:11,name:"Jarren Duran",team:"BOS",pos:"OF",age:28,country:"🇺🇸",rating:86,stats:{AVG:.285,HR:19,RBI:64,OPS:.838,SB:28}},
  {id:12,name:"Kristian Campbell",team:"BOS",pos:"2B",age:22,country:"🇺🇸",rating:79,stats:{AVG:.265,HR:14,RBI:55,OPS:.798,SB:11}},
  {id:13,name:"Brayan Bello",team:"BOS",pos:"SP",age:25,country:"🇩🇴",rating:82,stats:{ERA:3.82,W:12,SO:166,IP:172,WHIP:1.22}},
  {id:14,name:"Connor Wong",team:"BOS",pos:"C",age:28,country:"🇺🇸",rating:77,stats:{AVG:.243,HR:12,RBI:48,OPS:.731,SB:8}},
  // TAMPA BAY RAYS
  {id:15,name:"Yandy Díaz",team:"TBR",pos:"1B",age:33,country:"🇨🇺",rating:84,stats:{AVG:.281,HR:16,RBI:71,OPS:.831,SB:2}},
  {id:16,name:"Jose Caballero",team:"TBR",pos:"SS",age:28,country:"🇵🇦",rating:78,stats:{AVG:.248,HR:11,RBI:44,OPS:.748,SB:18}},
  {id:17,name:"Zach Eflin",team:"TBR",pos:"SP",age:30,country:"🇺🇸",rating:83,stats:{ERA:3.40,W:14,SO:174,IP:181,WHIP:1.14}},
  {id:18,name:"Pete Fairbanks",team:"TBR",pos:"RP",age:31,country:"🇺🇸",rating:82,stats:{ERA:2.60,SV:28,SO:78,IP:55,WHIP:1.02}},
  {id:19,name:"Randy Arozarena",team:"TBR",pos:"OF",age:30,country:"🇨🇺",rating:88,stats:{AVG:.271,HR:23,RBI:80,OPS:.859,SB:32}},
  // TORONTO BLUE JAYS
  {id:20,name:"Vladimir Guerrero Jr.",team:"TOR",pos:"1B",age:26,country:"🇩🇴",rating:96,stats:{AVG:.323,HR:44,RBI:131,OPS:1.027,SB:4}},
  {id:21,name:"Bo Bichette",team:"TOR",pos:"SS",age:27,country:"🇺🇸",rating:87,stats:{AVG:.288,HR:21,RBI:82,OPS:.843,SB:14}},
  {id:22,name:"George Springer",team:"TOR",pos:"OF",age:35,country:"🇺🇸",rating:82,stats:{AVG:.261,HR:20,RBI:68,OPS:.811,SB:9}},
  {id:23,name:"Kevin Gausman",team:"TOR",pos:"SP",age:34,country:"🇺🇸",rating:88,stats:{ERA:3.12,W:14,SO:200,IP:185,WHIP:1.10}},
  {id:24,name:"Daulton Varsho",team:"TOR",pos:"C",age:28,country:"🇺🇸",rating:81,stats:{AVG:.245,HR:18,RBI:59,OPS:.790,SB:16}},
  // BALTIMORE ORIOLES
  {id:25,name:"Gunnar Henderson",team:"BAL",pos:"SS",age:23,country:"🇺🇸",rating:96,stats:{AVG:.304,HR:37,RBI:100,OPS:.968,SB:17}},
  {id:26,name:"Adley Rutschman",team:"BAL",pos:"C",age:27,country:"🇺🇸",rating:94,stats:{AVG:.293,HR:22,RBI:84,OPS:.898,SB:4}},
  {id:27,name:"Jackson Holliday",team:"BAL",pos:"2B",age:21,country:"🇺🇸",rating:84,stats:{AVG:.276,HR:18,RBI:65,OPS:.837,SB:12}},
  {id:28,name:"Corbin Burnes",team:"BAL",pos:"SP",age:30,country:"🇺🇸",rating:94,stats:{ERA:2.68,W:16,SO:218,IP:196,WHIP:1.05}},
  {id:29,name:"Anthony Santander",team:"BAL",pos:"OF",age:30,country:"🇻🇪",rating:86,stats:{AVG:.278,HR:34,RBI:102,OPS:.889,SB:3}},
  // MINNESOTA TWINS
  {id:30,name:"Carlos Correa",team:"MIN",pos:"SS",age:30,country:"🇵🇷",rating:88,stats:{AVG:.279,HR:20,RBI:78,OPS:.849,SB:5}},
  {id:31,name:"Byron Buxton",team:"MIN",pos:"OF",age:31,country:"🇺🇸",rating:85,stats:{AVG:.264,HR:25,RBI:72,OPS:.852,SB:14}},
  {id:32,name:"Pablo Lopez",team:"MIN",pos:"SP",age:28,country:"🇻🇪",rating:89,stats:{ERA:3.08,W:15,SO:214,IP:191,WHIP:1.11}},
  {id:33,name:"Ryan Jeffers",team:"MIN",pos:"C",age:27,country:"🇺🇸",rating:80,stats:{AVG:.253,HR:19,RBI:59,OPS:.791,SB:1}},
  {id:34,name:"Max Kepler",team:"MIN",pos:"OF",age:32,country:"🇩🇪",rating:79,stats:{AVG:.248,HR:18,RBI:62,OPS:.778,SB:5}},
  // CLEVELAND GUARDIANS
  {id:35,name:"Jose Ramirez",team:"CLE",pos:"3B",age:32,country:"🇩🇴",rating:98,stats:{AVG:.308,HR:38,RBI:117,OPS:1.001,SB:28}},
  {id:36,name:"Steven Kwan",team:"CLE",pos:"OF",age:27,country:"🇺🇸",rating:88,stats:{AVG:.298,HR:12,RBI:61,OPS:.853,SB:19}},
  {id:37,name:"Brayan Rocchio",team:"CLE",pos:"SS",age:23,country:"🇻🇪",rating:79,stats:{AVG:.258,HR:11,RBI:50,OPS:.764,SB:15}},
  {id:38,name:"Shane Bieber",team:"CLE",pos:"SP",age:29,country:"🇺🇸",rating:87,stats:{ERA:3.15,W:14,SO:199,IP:188,WHIP:1.09}},
  {id:39,name:"Emmanuel Clase",team:"CLE",pos:"RP",age:27,country:"🇩🇴",rating:95,stats:{ERA:1.87,SV:44,SO:74,IP:67,WHIP:0.87}},
  // CHICAGO WHITE SOX
  {id:40,name:"Gavin Sheets",team:"CWS",pos:"1B",age:28,country:"🇺🇸",rating:72,stats:{AVG:.241,HR:14,RBI:52,OPS:.741,SB:1}},
  {id:41,name:"Andrew Vaughn",team:"CWS",pos:"OF",age:26,country:"🇺🇸",rating:74,stats:{AVG:.252,HR:16,RBI:58,OPS:.762,SB:3}},
  {id:42,name:"Garrett Crochet",team:"CWS",pos:"SP",age:25,country:"🇺🇸",rating:88,stats:{ERA:3.22,W:9,SO:210,IP:162,WHIP:1.09}},
  {id:43,name:"Luis Robert Jr.",team:"CWS",pos:"OF",age:27,country:"🇨🇺",rating:86,stats:{AVG:.271,HR:28,RBI:80,OPS:.862,SB:20}},
  // KANSAS CITY ROYALS
  {id:44,name:"Bobby Witt Jr.",team:"KCR",pos:"SS",age:25,country:"🇺🇸",rating:97,stats:{AVG:.332,HR:33,RBI:109,OPS:.992,SB:31}},
  {id:45,name:"Salvador Perez",team:"KCR",pos:"C",age:34,country:"🇻🇪",rating:84,stats:{AVG:.270,HR:22,RBI:83,OPS:.819,SB:1}},
  {id:46,name:"MJ Melendez",team:"KCR",pos:"OF",age:26,country:"🇺🇸",rating:78,stats:{AVG:.249,HR:18,RBI:62,OPS:.782,SB:8}},
  {id:47,name:"Cole Ragans",team:"KCR",pos:"SP",age:26,country:"🇺🇸",rating:87,stats:{ERA:3.14,W:13,SO:207,IP:183,WHIP:1.11}},
  {id:48,name:"Vinnie Pasquantino",team:"KCR",pos:"1B",age:27,country:"🇺🇸",rating:84,stats:{AVG:.277,HR:21,RBI:80,OPS:.845,SB:1}},
  // DETROIT TIGERS
  {id:49,name:"Riley Greene",team:"DET",pos:"OF",age:24,country:"🇺🇸",rating:86,stats:{AVG:.279,HR:22,RBI:72,OPS:.854,SB:16}},
  {id:50,name:"Spencer Torkelson",team:"DET",pos:"1B",age:25,country:"🇺🇸",rating:80,stats:{AVG:.252,HR:21,RBI:68,OPS:.801,SB:2}},
  {id:51,name:"Tarik Skubal",team:"DET",pos:"SP",age:28,country:"🇺🇸",rating:97,stats:{ERA:2.39,W:18,SO:228,IP:192,WHIP:0.99}},
  {id:52,name:"Parker Meadows",team:"DET",pos:"OF",age:24,country:"🇺🇸",rating:78,stats:{AVG:.248,HR:15,RBI:55,OPS:.771,SB:18}},
  {id:53,name:"Colt Keith",team:"DET",pos:"2B",age:22,country:"🇺🇸",rating:79,stats:{AVG:.261,HR:13,RBI:52,OPS:.789,SB:7}},
  // HOUSTON ASTROS
  {id:54,name:"Jose Altuve",team:"HOU",pos:"2B",age:35,country:"🇻🇪",rating:90,stats:{AVG:.297,HR:24,RBI:86,OPS:.931,SB:11}},
  {id:55,name:"Yordan Alvarez",team:"HOU",pos:"DH",age:27,country:"🇨🇺",rating:99,stats:{AVG:.318,HR:47,RBI:131,OPS:1.089,SB:2}},
  {id:56,name:"Alex Bregman",team:"HOU",pos:"3B",age:31,country:"🇺🇸",rating:89,stats:{AVG:.288,HR:24,RBI:89,OPS:.900,SB:6}},
  {id:57,name:"Framber Valdez",team:"HOU",pos:"SP",age:31,country:"🇩🇴",rating:90,stats:{ERA:2.91,W:16,SO:194,IP:198,WHIP:1.07}},
  {id:58,name:"Jeremy Pena",team:"HOU",pos:"SS",age:27,country:"🇩🇴",rating:84,stats:{AVG:.264,HR:18,RBI:70,OPS:.811,SB:10}},
  {id:59,name:"Kyle Tucker",team:"HOU",pos:"OF",age:28,country:"🇺🇸",rating:95,stats:{AVG:.304,HR:36,RBI:112,OPS:.994,SB:28}},
  // SEATTLE MARINERS
  {id:60,name:"Julio Rodriguez",team:"SEA",pos:"OF",age:24,country:"🇩🇴",rating:96,stats:{AVG:.296,HR:32,RBI:101,OPS:.958,SB:37}},
  {id:61,name:"Cal Raleigh",team:"SEA",pos:"C",age:28,country:"🇺🇸",rating:90,stats:{AVG:.272,HR:34,RBI:98,OPS:.893,SB:2}},
  {id:62,name:"Logan Gilbert",team:"SEA",pos:"SP",age:27,country:"🇺🇸",rating:88,stats:{ERA:3.20,W:15,SO:204,IP:190,WHIP:1.10}},
  {id:63,name:"Luis Castillo",team:"SEA",pos:"SP",age:32,country:"🇩🇴",rating:89,stats:{ERA:3.04,W:14,SO:198,IP:187,WHIP:1.08}},
  {id:64,name:"JP Crawford",team:"SEA",pos:"SS",age:30,country:"🇺🇸",rating:80,stats:{AVG:.249,HR:11,RBI:54,OPS:.771,SB:8}},
  // TEXAS RANGERS
  {id:65,name:"Corey Seager",team:"TEX",pos:"SS",age:31,country:"🇺🇸",rating:96,stats:{AVG:.317,HR:35,RBI:110,OPS:1.007,SB:6}},
  {id:66,name:"Marcus Semien",team:"TEX",pos:"2B",age:34,country:"🇺🇸",rating:89,stats:{AVG:.280,HR:24,RBI:89,OPS:.879,SB:19}},
  {id:67,name:"Jonah Heim",team:"TEX",pos:"C",age:29,country:"🇺🇸",rating:80,stats:{AVG:.260,HR:16,RBI:62,OPS:.788,SB:2}},
  {id:68,name:"Jacob deGrom",team:"TEX",pos:"SP",age:37,country:"🇺🇸",rating:85,stats:{ERA:3.10,W:10,SO:152,IP:138,WHIP:1.04}},
  {id:69,name:"Nathaniel Lowe",team:"TEX",pos:"1B",age:29,country:"🇺🇸",rating:83,stats:{AVG:.272,HR:18,RBI:76,OPS:.824,SB:4}},
  // LOS ANGELES ANGELS
  {id:70,name:"Mike Trout",team:"LAA",pos:"OF",age:33,country:"🇺🇸",rating:90,stats:{AVG:.282,HR:22,RBI:68,OPS:.938,SB:8}},
  {id:71,name:"Shohei Ohtani",team:"LAD",pos:"DH",age:31,country:"🇯🇵",rating:100,stats:{AVG:.330,HR:55,RBI:141,OPS:1.066,SB:59}},
  {id:72,name:"Zach Neto",team:"LAA",pos:"SS",age:24,country:"🇺🇸",rating:81,stats:{AVG:.262,HR:16,RBI:60,OPS:.798,SB:14}},
  {id:73,name:"Reid Detmers",team:"LAA",pos:"SP",age:25,country:"🇺🇸",rating:79,stats:{ERA:3.78,W:11,SO:168,IP:169,WHIP:1.21}},
  {id:74,name:"Taylor Ward",team:"LAA",pos:"OF",age:31,country:"🇺🇸",rating:80,stats:{AVG:.258,HR:20,RBI:69,OPS:.802,SB:6}},
  // OAKLAND ATHLETICS
  {id:75,name:"Brent Rooker",team:"OAK",pos:"OF",age:30,country:"🇺🇸",rating:84,stats:{AVG:.266,HR:30,RBI:90,OPS:.869,SB:4}},
  {id:76,name:"Lawrence Butler",team:"OAK",pos:"OF",age:25,country:"🇺🇸",rating:79,stats:{AVG:.254,HR:22,RBI:68,OPS:.805,SB:16}},
  {id:77,name:"Mason Miller",team:"OAK",pos:"RP",age:26,country:"🇺🇸",rating:88,stats:{ERA:2.10,SV:38,SO:92,IP:60,WHIP:0.91}},
  {id:78,name:"JP Sears",team:"OAK",pos:"SP",age:28,country:"🇺🇸",rating:79,stats:{ERA:3.88,W:10,SO:148,IP:162,WHIP:1.23}},
  // ATLANTA BRAVES
  {id:79,name:"Ronald Acuña Jr.",team:"ATL",pos:"OF",age:27,country:"🇻🇪",rating:99,stats:{AVG:.337,HR:41,RBI:106,OPS:1.012,SB:73}},
  {id:80,name:"Matt Olson",team:"ATL",pos:"1B",age:31,country:"🇺🇸",rating:92,stats:{AVG:.281,HR:38,RBI:112,OPS:.934,SB:3}},
  {id:81,name:"Austin Riley",team:"ATL",pos:"3B",age:28,country:"🇺🇸",rating:90,stats:{AVG:.290,HR:35,RBI:108,OPS:.926,SB:5}},
  {id:82,name:"Spencer Strider",team:"ATL",pos:"SP",age:26,country:"🇺🇸",rating:95,stats:{ERA:2.50,W:17,SO:280,IP:186,WHIP:0.98}},
  {id:83,name:"Ozzie Albies",team:"ATL",pos:"2B",age:28,country:"🇨🇼",rating:88,stats:{AVG:.284,HR:26,RBI:88,OPS:.882,SB:15}},
  {id:84,name:"Sean Murphy",team:"ATL",pos:"C",age:30,country:"🇺🇸",rating:85,stats:{AVG:.261,HR:21,RBI:74,OPS:.836,SB:2}},
  {id:85,name:"Michael Harris II",team:"ATL",pos:"OF",age:24,country:"🇺🇸",rating:87,stats:{AVG:.278,HR:22,RBI:78,OPS:.854,SB:20}},
  // NEW YORK METS
  {id:86,name:"Francisco Lindor",team:"NYM",pos:"SS",age:31,country:"🇵🇷",rating:93,stats:{AVG:.291,HR:30,RBI:98,OPS:.921,SB:22}},
  {id:87,name:"Pete Alonso",team:"NYM",pos:"1B",age:30,country:"🇺🇸",rating:91,stats:{AVG:.258,HR:46,RBI:131,OPS:.927,SB:2}},
  {id:88,name:"Juan Soto",team:"NYY",pos:"OF",age:26,country:"🇩🇴",rating:97,stats:{AVG:.315,HR:41,RBI:109,OPS:1.057,SB:12}},
  {id:89,name:"Kodai Senga",team:"NYM",pos:"SP",age:31,country:"🇯🇵",rating:91,stats:{ERA:2.98,W:14,SO:218,IP:184,WHIP:1.07}},
  {id:90,name:"Mark Vientos",team:"NYM",pos:"3B",age:25,country:"🇺🇸",rating:82,stats:{AVG:.264,HR:24,RBI:79,OPS:.843,SB:3}},
  {id:91,name:"Brandon Nimmo",team:"NYM",pos:"OF",age:32,country:"🇺🇸",rating:83,stats:{AVG:.270,HR:18,RBI:66,OPS:.840,SB:8}},
  // PHILADELPHIA PHILLIES
  {id:92,name:"Bryce Harper",team:"PHI",pos:"1B",age:32,country:"🇺🇸",rating:97,stats:{AVG:.305,HR:35,RBI:105,OPS:1.010,SB:15}},
  {id:93,name:"Trea Turner",team:"PHI",pos:"SS",age:32,country:"🇺🇸",rating:91,stats:{AVG:.296,HR:24,RBI:90,OPS:.910,SB:30}},
  {id:94,name:"Zack Wheeler",team:"PHI",pos:"SP",age:35,country:"🇺🇸",rating:94,stats:{ERA:2.82,W:16,SO:232,IP:200,WHIP:1.02}},
  {id:95,name:"Aaron Nola",team:"PHI",pos:"SP",age:31,country:"🇺🇸",rating:88,stats:{ERA:3.28,W:14,SO:198,IP:190,WHIP:1.13}},
  {id:96,name:"Kyle Schwarber",team:"PHI",pos:"OF",age:32,country:"🇺🇸",rating:88,stats:{AVG:.241,HR:42,RBI:105,OPS:.909,SB:8}},
  {id:97,name:"JT Realmuto",team:"PHI",pos:"C",age:34,country:"🇺🇸",rating:88,stats:{AVG:.270,HR:20,RBI:75,OPS:.849,SB:17}},
  {id:98,name:"Nick Castellanos",team:"PHI",pos:"OF",age:33,country:"🇺🇸",rating:82,stats:{AVG:.275,HR:22,RBI:82,OPS:.832,SB:6}},
  // MIAMI MARLINS
  {id:99,name:"Jazz Chisholm Jr.",team:"NYY",pos:"2B",age:27,country:"🇧🇸",rating:87,stats:{AVG:.263,HR:24,RBI:75,OPS:.841,SB:22}},
  {id:100,name:"Sandy Alcantara",team:"MIA",pos:"SP",age:29,country:"🇩🇴",rating:88,stats:{ERA:3.10,W:13,SO:188,IP:196,WHIP:1.09}},
  {id:101,name:"Jesús Sánchez",team:"MIA",pos:"OF",age:27,country:"🇩🇴",rating:79,stats:{AVG:.254,HR:18,RBI:63,OPS:.798,SB:9}},
  {id:102,name:"Jake Burger",team:"MIA",pos:"3B",age:28,country:"🇺🇸",rating:80,stats:{AVG:.261,HR:23,RBI:73,OPS:.818,SB:3}},
  // WASHINGTON NATIONALS
  {id:103,name:"CJ Abrams",team:"WSN",pos:"SS",age:24,country:"🇺🇸",rating:84,stats:{AVG:.281,HR:18,RBI:64,OPS:.836,SB:27}},
  {id:104,name:"James Wood",team:"WSN",pos:"OF",age:21,country:"🇺🇸",rating:85,stats:{AVG:.274,HR:22,RBI:72,OPS:.849,SB:24}},
  {id:105,name:"Mackenzie Gore",team:"WSN",pos:"SP",age:26,country:"🇺🇸",rating:81,stats:{ERA:3.62,W:11,SO:178,IP:167,WHIP:1.19}},
  {id:106,name:"Joey Meneses",team:"WSN",pos:"1B",age:32,country:"🇲🇽",rating:76,stats:{AVG:.262,HR:15,RBI:59,OPS:.781,SB:2}},
  // CHICAGO CUBS
  {id:107,name:"Cody Bellinger",team:"CHC",pos:"OF",age:29,country:"🇺🇸",rating:85,stats:{AVG:.271,HR:26,RBI:83,OPS:.849,SB:9}},
  {id:108,name:"Ian Happ",team:"CHC",pos:"OF",age:30,country:"🇺🇸",rating:84,stats:{AVG:.268,HR:22,RBI:78,OPS:.844,SB:8}},
  {id:109,name:"Dansby Swanson",team:"CHC",pos:"SS",age:31,country:"🇺🇸",rating:85,stats:{AVG:.272,HR:22,RBI:80,OPS:.842,SB:18}},
  {id:110,name:"Justin Steele",team:"CHC",pos:"SP",age:29,country:"🇺🇸",rating:86,stats:{ERA:3.06,W:14,SO:184,IP:179,WHIP:1.12}},
  {id:111,name:"Nico Hoerner",team:"CHC",pos:"2B",age:28,country:"🇺🇸",rating:84,stats:{AVG:.282,HR:10,RBI:57,OPS:.797,SB:24}},
  {id:112,name:"Seiya Suzuki",team:"CHC",pos:"OF",age:31,country:"🇯🇵",rating:86,stats:{AVG:.294,HR:24,RBI:81,OPS:.889,SB:11}},
  // ST. LOUIS CARDINALS
  {id:113,name:"Nolan Arenado",team:"STL",pos:"3B",age:34,country:"🇺🇸",rating:89,stats:{AVG:.283,HR:28,RBI:94,OPS:.880,SB:3}},
  {id:114,name:"Paul Goldschmidt",team:"STL",pos:"1B",age:37,country:"🇺🇸",rating:84,stats:{AVG:.272,HR:20,RBI:78,OPS:.838,SB:5}},
  {id:115,name:"Miles Mikolas",team:"STL",pos:"SP",age:36,country:"🇺🇸",rating:78,stats:{ERA:3.98,W:11,SO:148,IP:167,WHIP:1.24}},
  {id:116,name:"Willson Contreras",team:"STL",pos:"C",age:33,country:"🇻🇪",rating:82,stats:{AVG:.254,HR:18,RBI:65,OPS:.812,SB:3}},
  {id:117,name:"Jordan Walker",team:"STL",pos:"OF",age:23,country:"🇺🇸",rating:80,stats:{AVG:.261,HR:17,RBI:62,OPS:.806,SB:12}},
  // MILWAUKEE BREWERS
  {id:118,name:"Christian Yelich",team:"MIL",pos:"OF",age:33,country:"🇺🇸",rating:87,stats:{AVG:.282,HR:24,RBI:81,OPS:.882,SB:16}},
  {id:119,name:"Willy Adames",team:"MIL",pos:"SS",age:29,country:"🇩🇴",rating:86,stats:{AVG:.264,HR:26,RBI:82,OPS:.851,SB:12}},
  {id:120,name:"Freddy Peralta",team:"MIL",pos:"SP",age:28,country:"🇩🇴",rating:87,stats:{ERA:3.28,W:13,SO:212,IP:176,WHIP:1.14}},
  {id:121,name:"William Contreras",team:"MIL",pos:"C",age:27,country:"🇻🇪",rating:86,stats:{AVG:.279,HR:20,RBI:74,OPS:.866,SB:4}},
  {id:122,name:"Jackson Chourio",team:"MIL",pos:"OF",age:20,country:"🇻🇪",rating:84,stats:{AVG:.271,HR:21,RBI:70,OPS:.838,SB:27}},
  // CINCINNATI REDS
  {id:123,name:"Elly De La Cruz",team:"CIN",pos:"SS",age:22,country:"🇩🇴",rating:89,stats:{AVG:.262,HR:26,RBI:82,OPS:.866,SB:61}},
  {id:124,name:"Spencer Steer",team:"CIN",pos:"3B",age:27,country:"🇺🇸",rating:82,stats:{AVG:.274,HR:20,RBI:72,OPS:.832,SB:10}},
  {id:125,name:"Hunter Greene",team:"CIN",pos:"SP",age:25,country:"🇺🇸",rating:86,stats:{ERA:3.36,W:12,SO:218,IP:178,WHIP:1.12}},
  {id:126,name:"TJ Friedl",team:"CIN",pos:"OF",age:28,country:"🇺🇸",rating:79,stats:{AVG:.268,HR:14,RBI:54,OPS:.810,SB:21}},
  {id:127,name:"Tyler Stephenson",team:"CIN",pos:"C",age:28,country:"🇺🇸",rating:80,stats:{AVG:.264,HR:14,RBI:60,OPS:.810,SB:3}},
  // PITTSBURGH PIRATES
  {id:128,name:"Paul Skenes",team:"PIT",pos:"SP",age:22,country:"🇺🇸",rating:96,stats:{ERA:1.96,W:11,SO:170,IP:133,WHIP:0.95}},
  {id:129,name:"Oneil Cruz",team:"PIT",pos:"SS",age:26,country:"🇩🇴",rating:83,stats:{AVG:.256,HR:21,RBI:72,OPS:.828,SB:16}},
  {id:130,name:"Bryan Reynolds",team:"PIT",pos:"OF",age:30,country:"🇺🇸",rating:85,stats:{AVG:.283,HR:23,RBI:79,OPS:.858,SB:14}},
  {id:131,name:"Andrew McCutchen",team:"PIT",pos:"OF",age:38,country:"🇺🇸",rating:74,stats:{AVG:.249,HR:14,RBI:56,OPS:.764,SB:6}},
  // LOS ANGELES DODGERS
  {id:132,name:"Mookie Betts",team:"LAD",pos:"OF",age:32,country:"🇺🇸",rating:97,stats:{AVG:.307,HR:35,RBI:98,OPS:1.004,SB:24}},
  {id:133,name:"Freddie Freeman",team:"LAD",pos:"1B",age:35,country:"🇨🇦",rating:94,stats:{AVG:.317,HR:30,RBI:105,OPS:.984,SB:10}},
  {id:134,name:"Clayton Kershaw",team:"LAD",pos:"SP",age:37,country:"🇺🇸",rating:84,stats:{ERA:3.20,W:10,SO:148,IP:152,WHIP:1.10}},
  {id:135,name:"Tyler Glasnow",team:"LAD",pos:"SP",age:31,country:"🇺🇸",rating:90,stats:{ERA:3.00,W:14,SO:218,IP:183,WHIP:1.09}},
  {id:136,name:"Will Smith",team:"LAD",pos:"C",age:29,country:"🇺🇸",rating:87,stats:{AVG:.272,HR:24,RBI:82,OPS:.874,SB:3}},
  {id:137,name:"Gavin Lux",team:"LAD",pos:"2B",age:27,country:"🇺🇸",rating:80,stats:{AVG:.262,HR:13,RBI:56,OPS:.798,SB:9}},
  {id:138,name:"Teoscar Hernandez",team:"LAD",pos:"OF",age:32,country:"🇩🇴",rating:85,stats:{AVG:.272,HR:28,RBI:92,OPS:.862,SB:8}},
  // SAN FRANCISCO GIANTS
  {id:139,name:"Matt Chapman",team:"SFG",pos:"3B",age:32,country:"🇺🇸",rating:86,stats:{AVG:.272,HR:26,RBI:84,OPS:.857,SB:6}},
  {id:140,name:"Logan Webb",team:"SFG",pos:"SP",age:28,country:"🇺🇸",rating:90,stats:{ERA:2.90,W:15,SO:188,IP:195,WHIP:1.08}},
  {id:141,name:"Heliot Ramos",team:"SFG",pos:"OF",age:25,country:"🇻🇪",rating:80,stats:{AVG:.261,HR:19,RBI:66,OPS:.813,SB:13}},
  {id:142,name:"Patrick Bailey",team:"SFG",pos:"C",age:25,country:"🇺🇸",rating:81,stats:{AVG:.253,HR:14,RBI:58,OPS:.792,SB:4}},
  {id:143,name:"Jorge Soler",team:"SFG",pos:"DH",age:33,country:"🇨🇺",rating:83,stats:{AVG:.259,HR:28,RBI:85,OPS:.852,SB:2}},
  // SAN DIEGO PADRES
  {id:144,name:"Fernando Tatis Jr.",team:"SDP",pos:"OF",age:26,country:"🇩🇴",rating:95,stats:{AVG:.295,HR:38,RBI:105,OPS:.972,SB:29}},
  {id:145,name:"Manny Machado",team:"SDP",pos:"3B",age:32,country:"🇩🇴",rating:93,stats:{AVG:.298,HR:32,RBI:104,OPS:.960,SB:11}},
  {id:146,name:"Dylan Cease",team:"SDP",pos:"SP",age:29,country:"🇺🇸",rating:91,stats:{ERA:2.80,W:15,SO:220,IP:193,WHIP:1.06}},
  {id:147,name:"Xander Bogaerts",team:"SDP",pos:"SS",age:32,country:"🇦🇼",rating:86,stats:{AVG:.278,HR:19,RBI:76,OPS:.858,SB:8}},
  {id:148,name:"Jake Cronenworth",team:"SDP",pos:"1B",age:31,country:"🇺🇸",rating:81,stats:{AVG:.255,HR:15,RBI:60,OPS:.793,SB:7}},
  {id:149,name:"Jurickson Profar",team:"SDP",pos:"OF",age:31,country:"🇨🇼",rating:82,stats:{AVG:.280,HR:20,RBI:74,OPS:.838,SB:10}},
  // ARIZONA DIAMONDBACKS
  {id:150,name:"Corbin Carroll",team:"ARI",pos:"OF",age:24,country:"🇺🇸",rating:94,stats:{AVG:.289,HR:27,RBI:88,OPS:.924,SB:54}},
  {id:151,name:"Ketel Marte",team:"ARI",pos:"2B",age:31,country:"🇩🇴",rating:90,stats:{AVG:.301,HR:28,RBI:96,OPS:.934,SB:16}},
  {id:152,name:"Zac Gallen",team:"ARI",pos:"SP",age:29,country:"🇺🇸",rating:88,stats:{ERA:3.14,W:14,SO:193,IP:185,WHIP:1.11}},
  {id:153,name:"Gabriel Moreno",team:"ARI",pos:"C",age:25,country:"🇻🇪",rating:82,stats:{AVG:.275,HR:12,RBI:60,OPS:.812,SB:8}},
  {id:154,name:"Eugenio Suarez",team:"ARI",pos:"3B",age:33,country:"🇻🇪",rating:80,stats:{AVG:.250,HR:24,RBI:78,OPS:.806,SB:4}},
  {id:155,name:"Lourdes Gurriel Jr.",team:"ARI",pos:"OF",age:31,country:"🇨🇺",rating:79,stats:{AVG:.261,HR:16,RBI:63,OPS:.800,SB:9}},
  // COLORADO ROCKIES
  {id:156,name:"Ezequiel Tovar",team:"COL",pos:"SS",age:23,country:"🇻🇪",rating:81,stats:{AVG:.269,HR:18,RBI:68,OPS:.812,SB:14}},
  {id:157,name:"Ryan McMahon",team:"COL",pos:"3B",age:29,country:"🇺🇸",rating:79,stats:{AVG:.255,HR:18,RBI:65,OPS:.800,SB:8}},
  {id:158,name:"Brenton Doyle",team:"COL",pos:"OF",age:26,country:"🇺🇸",rating:78,stats:{AVG:.248,HR:16,RBI:58,OPS:.778,SB:22}},
  {id:159,name:"Kyle Freeland",team:"COL",pos:"SP",age:31,country:"🇺🇸",rating:74,stats:{ERA:4.30,W:8,SO:138,IP:155,WHIP:1.34}},
  {id:160,name:"Charlie Blackmon",team:"COL",pos:"OF",age:38,country:"🇺🇸",rating:70,stats:{AVG:.260,HR:12,RBI:52,OPS:.780,SB:3}},

  // ── EXTRA PLAYERS POR EQUIPO ──────────────────────────────

  // NEW YORK YANKEES – extra
  {id:161,name:"Clay Holmes",team:"NYY",pos:"RP",age:31,country:"🇺🇸",rating:83,stats:{ERA:2.88,SV:30,SO:70,IP:56,WHIP:1.10}},
  {id:162,name:"Anthony Rizzo",team:"NYY",pos:"1B",age:35,country:"🇺🇸",rating:78,stats:{AVG:.244,HR:17,RBI:61,OPS:.782,SB:2}},
  {id:163,name:"DJ LeMahieu",team:"NYY",pos:"3B",age:36,country:"🇺🇸",rating:74,stats:{AVG:.240,HR:9,RBI:44,OPS:.716,SB:3}},
  {id:164,name:"Luis Severino",team:"NYM",pos:"SP",age:31,country:"🇩🇴",rating:80,stats:{ERA:3.91,W:11,SO:158,IP:162,WHIP:1.20}},
  {id:165,name:"Tommy Kahnle",team:"NYY",pos:"RP",age:35,country:"🇺🇸",rating:77,stats:{ERA:3.10,SV:8,SO:62,IP:49,WHIP:1.12}},

  // BOSTON RED SOX – extra
  {id:166,name:"Rob Refsnyder",team:"BOS",pos:"OF",age:33,country:"🇺🇸",rating:76,stats:{AVG:.256,HR:10,RBI:42,OPS:.778,SB:5}},
  {id:167,name:"Kenley Jansen",team:"BOS",pos:"RP",age:37,country:"🇨🇼",rating:80,stats:{ERA:3.14,SV:25,SO:68,IP:52,WHIP:1.08}},
  {id:168,name:"Tanner Houck",team:"BOS",pos:"SP",age:28,country:"🇺🇸",rating:82,stats:{ERA:3.48,W:12,SO:174,IP:166,WHIP:1.15}},
  {id:169,name:"Tyler O'Neill",team:"BOS",pos:"OF",age:29,country:"🇨🇦",rating:80,stats:{AVG:.258,HR:23,RBI:68,OPS:.821,SB:9}},

  // TAMPA BAY RAYS – extra
  {id:170,name:"Christopher Morel",team:"TBR",pos:"3B",age:25,country:"🇩🇴",rating:79,stats:{AVG:.249,HR:18,RBI:58,OPS:.793,SB:14}},
  {id:171,name:"Shane McClanahan",team:"TBR",pos:"SP",age:27,country:"🇺🇸",rating:88,stats:{ERA:3.00,W:13,SO:198,IP:180,WHIP:1.08}},
  {id:172,name:"Jonatan Aranda",team:"TBR",pos:"1B",age:25,country:"🇲🇽",rating:77,stats:{AVG:.262,HR:14,RBI:52,OPS:.800,SB:2}},
  {id:173,name:"Harold Ramirez",team:"TBR",pos:"OF",age:30,country:"🇨🇴",rating:76,stats:{AVG:.278,HR:11,RBI:50,OPS:.788,SB:4}},

  // TORONTO BLUE JAYS – extra
  {id:174,name:"Alejandro Kirk",team:"TOR",pos:"C",age:26,country:"🇲🇽",rating:82,stats:{AVG:.276,HR:14,RBI:55,OPS:.820,SB:1}},
  {id:175,name:"Isiah Kiner-Falefa",team:"TOR",pos:"SS",age:30,country:"🇺🇸",rating:75,stats:{AVG:.252,HR:6,RBI:40,OPS:.718,SB:16}},
  {id:176,name:"Yusei Kikuchi",team:"TOR",pos:"SP",age:34,country:"🇯🇵",rating:85,stats:{ERA:3.30,W:13,SO:196,IP:179,WHIP:1.14}},
  {id:177,name:"Vladimir Guerrero Sr. Legacy",team:"TOR",pos:"DH",age:49,country:"🇩🇴",rating:99,stats:{AVG:.327,HR:39,RBI:126,OPS:1.015,SB:5}},

  // BALTIMORE ORIOLES – extra
  {id:178,name:"Ryan O'Hearn",team:"BAL",pos:"1B",age:31,country:"🇺🇸",rating:79,stats:{AVG:.265,HR:16,RBI:61,OPS:.808,SB:2}},
  {id:179,name:"Cedric Mullins",team:"BAL",pos:"OF",age:30,country:"🇺🇸",rating:80,stats:{AVG:.255,HR:13,RBI:52,OPS:.780,SB:18}},
  {id:180,name:"Kyle Bradish",team:"BAL",pos:"SP",age:28,country:"🇺🇸",rating:84,stats:{ERA:3.22,W:13,SO:188,IP:178,WHIP:1.12}},
  {id:181,name:"Felix Bautista",team:"BAL",pos:"RP",age:29,country:"🇩🇴",rating:89,stats:{ERA:2.05,SV:34,SO:88,IP:62,WHIP:0.92}},
  {id:182,name:"Heston Kjerstad",team:"BAL",pos:"OF",age:25,country:"🇺🇸",rating:78,stats:{AVG:.258,HR:15,RBI:54,OPS:.798,SB:6}},

  // MINNESOTA TWINS – extra
  {id:183,name:"Joe Ryan",team:"MIN",pos:"SP",age:28,country:"🇺🇸",rating:84,stats:{ERA:3.42,W:13,SO:186,IP:177,WHIP:1.13}},
  {id:184,name:"Royce Lewis",team:"MIN",pos:"SS",age:25,country:"🇺🇸",rating:86,stats:{AVG:.282,HR:22,RBI:77,OPS:.866,SB:14}},
  {id:185,name:"Jorge Polanco",team:"MIN",pos:"2B",age:31,country:"🇩🇴",rating:80,stats:{AVG:.265,HR:16,RBI:62,OPS:.812,SB:8}},
  {id:186,name:"Christian Vázquez",team:"MIN",pos:"C",age:34,country:"🇵🇷",rating:77,stats:{AVG:.248,HR:10,RBI:44,OPS:.735,SB:3}},

  // CLEVELAND GUARDIANS – extra
  {id:187,name:"Josh Naylor",team:"CLE",pos:"1B",age:27,country:"🇨🇦",rating:83,stats:{AVG:.278,HR:22,RBI:81,OPS:.845,SB:4}},
  {id:188,name:"Lane Thomas",team:"CLE",pos:"OF",age:29,country:"🇺🇸",rating:79,stats:{AVG:.255,HR:16,RBI:57,OPS:.789,SB:18}},
  {id:189,name:"Andrés Giménez",team:"CLE",pos:"2B",age:26,country:"🇻🇪",rating:82,stats:{AVG:.268,HR:14,RBI:55,OPS:.808,SB:16}},
  {id:190,name:"Triston McKenzie",team:"CLE",pos:"SP",age:27,country:"🇺🇸",rating:80,stats:{ERA:3.62,W:11,SO:172,IP:161,WHIP:1.18}},

  // CHICAGO WHITE SOX – extra
  {id:191,name:"Oscar Colás",team:"CWS",pos:"OF",age:26,country:"🇨🇺",rating:75,stats:{AVG:.248,HR:13,RBI:48,OPS:.766,SB:8}},
  {id:192,name:"Yoán Moncada",team:"CWS",pos:"3B",age:29,country:"🇨🇺",rating:74,stats:{AVG:.235,HR:10,RBI:42,OPS:.720,SB:5}},
  {id:193,name:"Michael Kopech",team:"CWS",pos:"SP",age:28,country:"🇺🇸",rating:79,stats:{ERA:4.00,W:8,SO:150,IP:148,WHIP:1.25}},

  // KANSAS CITY ROYALS – extra
  {id:194,name:"Michael Massey",team:"KCR",pos:"2B",age:26,country:"🇺🇸",rating:77,stats:{AVG:.255,HR:12,RBI:49,OPS:.773,SB:9}},
  {id:195,name:"Hunter Renfroe",team:"KCR",pos:"OF",age:33,country:"🇺🇸",rating:78,stats:{AVG:.244,HR:19,RBI:63,OPS:.778,SB:3}},
  {id:196,name:"Seth Lugo",team:"KCR",pos:"SP",age:35,country:"🇺🇸",rating:85,stats:{ERA:3.00,W:14,SO:178,IP:186,WHIP:1.07}},
  {id:197,name:"Brady Singer",team:"KCR",pos:"SP",age:28,country:"🇺🇸",rating:81,stats:{ERA:3.55,W:12,SO:162,IP:171,WHIP:1.17}},

  // DETROIT TIGERS – extra
  {id:198,name:"Kerry Carpenter",team:"DET",pos:"OF",age:27,country:"🇺🇸",rating:79,stats:{AVG:.262,HR:18,RBI:62,OPS:.812,SB:5}},
  {id:199,name:"Javier Báez",team:"DET",pos:"SS",age:32,country:"🇵🇷",rating:77,stats:{AVG:.238,HR:14,RBI:54,OPS:.744,SB:8}},
  {id:200,name:"Jack Flaherty",team:"DET",pos:"SP",age:29,country:"🇺🇸",rating:83,stats:{ERA:3.40,W:12,SO:182,IP:172,WHIP:1.14}},

  // HOUSTON ASTROS – extra
  {id:201,name:"Mauricio Dubón",team:"HOU",pos:"OF",age:30,country:"🇨🇷",rating:76,stats:{AVG:.250,HR:8,RBI:42,OPS:.730,SB:12}},
  {id:202,name:"Yainer Diaz",team:"HOU",pos:"C",age:26,country:"🇻🇪",rating:82,stats:{AVG:.278,HR:15,RBI:60,OPS:.828,SB:2}},
  {id:203,name:"Ryan Pressly",team:"HOU",pos:"RP",age:36,country:"🇺🇸",rating:80,stats:{ERA:3.22,SV:24,SO:65,IP:53,WHIP:1.10}},
  {id:204,name:"Hunter Brown",team:"HOU",pos:"SP",age:26,country:"🇺🇸",rating:83,stats:{ERA:3.48,W:11,SO:180,IP:170,WHIP:1.15}},
  {id:205,name:"Jose Abreu",team:"HOU",pos:"1B",age:38,country:"🇨🇺",rating:76,stats:{AVG:.248,HR:13,RBI:56,OPS:.766,SB:1}},

  // SEATTLE MARINERS – extra
  {id:206,name:"Evan White",team:"SEA",pos:"1B",age:29,country:"🇺🇸",rating:77,stats:{AVG:.249,HR:14,RBI:52,OPS:.777,SB:3}},
  {id:207,name:"Mitch Haniger",team:"SEA",pos:"OF",age:34,country:"🇺🇸",rating:78,stats:{AVG:.256,HR:19,RBI:64,OPS:.800,SB:6}},
  {id:208,name:"George Kirby",team:"SEA",pos:"SP",age:27,country:"🇺🇸",rating:87,stats:{ERA:3.18,W:14,SO:190,IP:182,WHIP:1.06}},
  {id:209,name:"Andrés Muñoz",team:"SEA",pos:"RP",age:25,country:"🇲🇽",rating:88,stats:{ERA:2.22,SV:32,SO:88,IP:61,WHIP:0.95}},

  // TEXAS RANGERS – extra
  {id:210,name:"Adolis García",team:"TEX",pos:"OF",age:32,country:"🇨🇺",rating:86,stats:{AVG:.262,HR:30,RBI:95,OPS:.858,SB:16}},
  {id:211,name:"Evan Carter",team:"TEX",pos:"OF",age:22,country:"🇺🇸",rating:80,stats:{AVG:.268,HR:14,RBI:55,OPS:.820,SB:15}},
  {id:212,name:"José Leclerc",team:"TEX",pos:"RP",age:31,country:"🇩🇴",rating:82,stats:{ERA:2.90,SV:28,SO:70,IP:53,WHIP:1.05}},
  {id:213,name:"Andrew Heaney",team:"TEX",pos:"SP",age:34,country:"🇺🇸",rating:78,stats:{ERA:3.88,W:10,SO:160,IP:155,WHIP:1.22}},

  // LOS ANGELES ANGELS – extra
  {id:214,name:"Luis Rengifo",team:"LAA",pos:"2B",age:27,country:"🇻🇪",rating:78,stats:{AVG:.264,HR:14,RBI:58,OPS:.800,SB:10}},
  {id:215,name:"Logan O'Hoppe",team:"LAA",pos:"C",age:24,country:"🇺🇸",rating:79,stats:{AVG:.258,HR:16,RBI:55,OPS:.800,SB:3}},
  {id:216,name:"Patrick Sandoval",team:"LAA",pos:"SP",age:27,country:"🇺🇸",rating:79,stats:{ERA:3.78,W:9,SO:154,IP:160,WHIP:1.22}},

  // OAKLAND ATHLETICS – extra
  {id:217,name:"Shea Langeliers",team:"OAK",pos:"C",age:27,country:"🇺🇸",rating:80,stats:{AVG:.242,HR:20,RBI:62,OPS:.790,SB:2}},
  {id:218,name:"Zack Gelof",team:"OAK",pos:"2B",age:25,country:"🇺🇸",rating:79,stats:{AVG:.254,HR:16,RBI:56,OPS:.798,SB:14}},
  {id:219,name:"Ken Waldichuk",team:"OAK",pos:"SP",age:27,country:"🇺🇸",rating:75,stats:{ERA:4.10,W:8,SO:140,IP:148,WHIP:1.28}},

  // ATLANTA BRAVES – extra
  {id:220,name:"Marcell Ozuna",team:"ATL",pos:"DH",age:34,country:"🇩🇴",rating:83,stats:{AVG:.267,HR:28,RBI:88,OPS:.852,SB:2}},
  {id:221,name:"Raisel Iglesias",team:"ATL",pos:"RP",age:35,country:"🇨🇺",rating:82,stats:{ERA:2.95,SV:26,SO:72,IP:55,WHIP:1.02}},
  {id:222,name:"Chris Sale",team:"ATL",pos:"SP",age:36,country:"🇺🇸",rating:87,stats:{ERA:2.99,W:15,SO:202,IP:177,WHIP:1.04}},
  {id:223,name:"Reynaldo Lopez",team:"ATL",pos:"RP",age:31,country:"🇳🇮",rating:84,stats:{ERA:2.60,SV:14,SO:82,IP:59,WHIP:1.00}},
  {id:224,name:"Jorge Soler",team:"ATL",pos:"OF",age:33,country:"🇨🇺",rating:84,stats:{AVG:.262,HR:30,RBI:88,OPS:.866,SB:2}},

  // NEW YORK METS – extra
  {id:225,name:"Jeff McNeil",team:"NYM",pos:"2B",age:33,country:"🇺🇸",rating:82,stats:{AVG:.283,HR:14,RBI:58,OPS:.820,SB:7}},
  {id:226,name:"Starling Marte",team:"NYM",pos:"OF",age:36,country:"🇩🇴",rating:80,stats:{AVG:.266,HR:10,RBI:50,OPS:.780,SB:22}},
  {id:227,name:"Luis Severino",team:"NYM",pos:"SP",age:31,country:"🇩🇴",rating:80,stats:{ERA:3.91,W:11,SO:158,IP:162,WHIP:1.20}},
  {id:228,name:"Edwin Díaz",team:"NYM",pos:"RP",age:31,country:"🇵🇷",rating:93,stats:{ERA:1.85,SV:46,SO:102,IP:58,WHIP:0.81}},

  // PHILADELPHIA PHILLIES – extra
  {id:229,name:"Ranger Suárez",team:"PHI",pos:"SP",age:29,country:"🇻🇪",rating:85,stats:{ERA:3.19,W:13,SO:172,IP:177,WHIP:1.12}},
  {id:230,name:"Alec Bohm",team:"PHI",pos:"3B",age:28,country:"🇺🇸",rating:84,stats:{AVG:.281,HR:18,RBI:75,OPS:.838,SB:4}},
  {id:231,name:"Johan Rojas",team:"PHI",pos:"OF",age:24,country:"🇩🇴",rating:76,stats:{AVG:.249,HR:6,RBI:38,OPS:.720,SB:18}},
  {id:232,name:"Jeff Hoffman",team:"PHI",pos:"RP",age:32,country:"🇺🇸",rating:84,stats:{ERA:2.68,SV:22,SO:78,IP:57,WHIP:1.00}},

  // MIAMI MARLINS – extra
  {id:233,name:"Xavier Edwards",team:"MIA",pos:"2B",age:25,country:"🇺🇸",rating:77,stats:{AVG:.275,HR:4,RBI:36,OPS:.762,SB:26}},
  {id:234,name:"Dane Myers",team:"MIA",pos:"OF",age:26,country:"🇺🇸",rating:74,stats:{AVG:.255,HR:12,RBI:45,OPS:.768,SB:14}},
  {id:235,name:"Eury Pérez",team:"MIA",pos:"SP",age:21,country:"🇩🇴",rating:83,stats:{ERA:3.44,W:10,SO:166,IP:157,WHIP:1.14}},

  // WASHINGTON NATIONALS – extra
  {id:236,name:"Jacob Young",team:"WSN",pos:"OF",age:25,country:"🇺🇸",rating:75,stats:{AVG:.252,HR:6,RBI:34,OPS:.720,SB:30}},
  {id:237,name:"Patrick Corbin",team:"WSN",pos:"SP",age:35,country:"🇺🇸",rating:68,stats:{ERA:5.01,W:6,SO:110,IP:140,WHIP:1.48}},
  {id:238,name:"Keibert Ruiz",team:"WSN",pos:"C",age:26,country:"🇻🇪",rating:80,stats:{AVG:.270,HR:13,RBI:54,OPS:.804,SB:3}},

  // CHICAGO CUBS – extra
  {id:239,name:"Cade Horton",team:"CHC",pos:"SP",age:23,country:"🇺🇸",rating:80,stats:{ERA:3.66,W:9,SO:158,IP:150,WHIP:1.18}},
  {id:240,name:"Michael Busch",team:"CHC",pos:"1B",age:27,country:"🇺🇸",rating:79,stats:{AVG:.260,HR:19,RBI:66,OPS:.808,SB:4}},
  {id:241,name:"Hector Neris",team:"CHC",pos:"RP",age:36,country:"🇩🇴",rating:77,stats:{ERA:3.30,SV:18,SO:60,IP:48,WHIP:1.12}},

  // ST. LOUIS CARDINALS – extra
  {id:242,name:"Brendan Donovan",team:"STL",pos:"2B",age:28,country:"🇺🇸",rating:81,stats:{AVG:.274,HR:12,RBI:54,OPS:.814,SB:11}},
  {id:243,name:"Lars Nootbaar",team:"STL",pos:"OF",age:27,country:"🇺🇸",rating:81,stats:{AVG:.258,HR:16,RBI:58,OPS:.806,SB:10}},
  {id:244,name:"Sonny Gray",team:"STL",pos:"SP",age:35,country:"🇺🇸",rating:86,stats:{ERA:2.96,W:14,SO:188,IP:179,WHIP:1.06}},
  {id:245,name:"Ryan Helsley",team:"STL",pos:"RP",age:29,country:"🇺🇸",rating:91,stats:{ERA:1.75,SV:49,SO:96,IP:62,WHIP:0.82}},

  // MILWAUKEE BREWERS – extra
  {id:246,name:"Sal Frelick",team:"MIL",pos:"OF",age:24,country:"🇺🇸",rating:79,stats:{AVG:.272,HR:9,RBI:46,OPS:.786,SB:20}},
  {id:247,name:"Joey Wiemer",team:"MIL",pos:"OF",age:27,country:"🇺🇸",rating:75,stats:{AVG:.238,HR:16,RBI:52,OPS:.756,SB:14}},
  {id:248,name:"Devin Williams",team:"MIL",pos:"RP",age:30,country:"🇺🇸",rating:90,stats:{ERA:1.99,SV:36,SO:92,IP:59,WHIP:0.90}},
  {id:249,name:"Colin Rea",team:"MIL",pos:"SP",age:34,country:"🇺🇸",rating:78,stats:{ERA:3.92,W:11,SO:142,IP:160,WHIP:1.21}},

  // CINCINNATI REDS – extra
  {id:250,name:"Jonathan India",team:"CIN",pos:"2B",age:27,country:"🇺🇸",rating:81,stats:{AVG:.268,HR:14,RBI:56,OPS:.806,SB:12}},
  {id:251,name:"Nick Lodolo",team:"CIN",pos:"SP",age:26,country:"🇺🇸",rating:82,stats:{ERA:3.60,W:11,SO:174,IP:165,WHIP:1.16}},
  {id:252,name:"Alexis Díaz",team:"CIN",pos:"RP",age:28,country:"🇵🇷",rating:87,stats:{ERA:2.28,SV:39,SO:82,IP:59,WHIP:0.95}},
  {id:253,name:"Will Benson",team:"CIN",pos:"OF",age:26,country:"🇺🇸",rating:76,stats:{AVG:.242,HR:18,RBI:58,OPS:.786,SB:16}},

  // PITTSBURGH PIRATES – extra
  {id:254,name:"Aroldis Chapman",team:"BOS",pos:"RP",age:37,country:"🇨🇺",rating:83,stats:{ERA:2.50,SV:31,SO:84,IP:54,WHIP:1.02}},
  {id:255,name:"Joey Bart",team:"PIT",pos:"C",age:28,country:"🇺🇸",rating:76,stats:{AVG:.244,HR:13,RBI:46,OPS:.766,SB:2}},
  {id:256,name:"Connor Joe",team:"PIT",pos:"OF",age:33,country:"🇺🇸",rating:73,stats:{AVG:.252,HR:10,RBI:42,OPS:.756,SB:6}},
  {id:257,name:"Jared Jones",team:"PIT",pos:"SP",age:22,country:"🇺🇸",rating:81,stats:{ERA:3.72,W:9,SO:162,IP:154,WHIP:1.20}},

  // LOS ANGELES DODGERS – extra
  {id:258,name:"Andy Pages",team:"LAD",pos:"OF",age:24,country:"🇨🇺",rating:79,stats:{AVG:.254,HR:18,RBI:62,OPS:.800,SB:11}},
  {id:259,name:"Miguel Rojas",team:"LAD",pos:"SS",age:35,country:"🇻🇪",rating:74,stats:{AVG:.238,HR:5,RBI:34,OPS:.680,SB:7}},
  {id:260,name:"James Paxton",team:"LAD",pos:"SP",age:36,country:"🇨🇦",rating:77,stats:{ERA:3.80,W:9,SO:152,IP:148,WHIP:1.20}},
  {id:261,name:"Evan Phillips",team:"LAD",pos:"RP",age:30,country:"🇺🇸",rating:85,stats:{ERA:2.44,SV:20,SO:76,IP:59,WHIP:0.97}},
  {id:262,name:"Chris Taylor",team:"LAD",pos:"OF",age:34,country:"🇺🇸",rating:75,stats:{AVG:.244,HR:12,RBI:46,OPS:.756,SB:8}},

  // SAN FRANCISCO GIANTS – extra
  {id:263,name:"Jung Hoo Lee",team:"SFG",pos:"OF",age:26,country:"🇰🇷",rating:82,stats:{AVG:.279,HR:12,RBI:54,OPS:.808,SB:16}},
  {id:264,name:"Wilmer Flores",team:"SFG",pos:"1B",age:33,country:"🇻🇪",rating:78,stats:{AVG:.268,HR:14,RBI:56,OPS:.796,SB:1}},
  {id:265,name:"Kyle Harrison",team:"SFG",pos:"SP",age:23,country:"🇺🇸",rating:79,stats:{ERA:3.74,W:9,SO:162,IP:156,WHIP:1.22}},
  {id:266,name:"Camilo Doval",team:"SFG",pos:"RP",age:27,country:"🇩🇴",rating:83,stats:{ERA:2.88,SV:30,SO:72,IP:56,WHIP:1.05}},

  // SAN DIEGO PADRES – extra
  {id:267,name:"Luis Campusano",team:"SDP",pos:"C",age:25,country:"🇺🇸",rating:79,stats:{AVG:.265,HR:13,RBI:52,OPS:.798,SB:2}},
  {id:268,name:"Ha-Seong Kim",team:"SDP",pos:"2B",age:29,country:"🇰🇷",rating:84,stats:{AVG:.271,HR:14,RBI:58,OPS:.820,SB:18}},
  {id:269,name:"Michael King",team:"SDP",pos:"SP",age:29,country:"🇺🇸",rating:86,stats:{ERA:3.10,W:13,SO:192,IP:178,WHIP:1.09}},
  {id:270,name:"Robert Suarez",team:"SDP",pos:"RP",age:33,country:"🇻🇪",rating:84,stats:{ERA:2.68,SV:33,SO:70,IP:57,WHIP:1.02}},
  {id:271,name:"Jackson Merrill",team:"SDP",pos:"OF",age:22,country:"🇺🇸",rating:85,stats:{AVG:.290,HR:21,RBI:74,OPS:.860,SB:14}},

  // ARIZONA DIAMONDBACKS – extra
  {id:272,name:"Jordan Lawlar",team:"ARI",pos:"SS",age:22,country:"🇺🇸",rating:82,stats:{AVG:.272,HR:16,RBI:60,OPS:.826,SB:20}},
  {id:273,name:"Christian Walker",team:"ARI",pos:"1B",age:34,country:"🇺🇸",rating:83,stats:{AVG:.261,HR:26,RBI:84,OPS:.842,SB:4}},
  {id:274,name:"Merrill Kelly",team:"ARI",pos:"SP",age:36,country:"🇺🇸",rating:82,stats:{ERA:3.44,W:12,SO:170,IP:173,WHIP:1.14}},
  {id:275,name:"Paul Sewald",team:"ARI",pos:"RP",age:34,country:"🇺🇸",rating:80,stats:{ERA:3.00,SV:22,SO:66,IP:54,WHIP:1.06}},

  // COLORADO ROCKIES – extra
  {id:276,name:"Nolan Jones",team:"COL",pos:"OF",age:27,country:"🇺🇸",rating:78,stats:{AVG:.262,HR:15,RBI:56,OPS:.808,SB:12}},
  {id:277,name:"Elias Díaz",team:"COL",pos:"C",age:34,country:"🇻🇪",rating:76,stats:{AVG:.252,HR:11,RBI:48,OPS:.762,SB:1}},
  {id:278,name:"Austin Gomber",team:"COL",pos:"SP",age:30,country:"🇺🇸",rating:72,stats:{ERA:4.55,W:7,SO:122,IP:140,WHIP:1.40}},
  {id:279,name:"Jake Cave",team:"COL",pos:"OF",age:32,country:"🇺🇸",rating:70,stats:{AVG:.248,HR:10,RBI:42,OPS:.756,SB:8}},

  // LEYENDAS / ESPECIALES
  {id:280,name:"Fernando Valenzuela",team:"LAD",pos:"SP",age:64,country:"🇲🇽",rating:98,stats:{ERA:3.54,W:173,SO:1759,IP:2930,WHIP:1.24}},
  {id:281,name:"Roberto Clemente",team:"PIT",pos:"OF",age:38,country:"🇵🇷",rating:100,stats:{AVG:.317,HR:240,RBI:1305,OPS:.834,SB:83}},
  {id:282,name:"Tony Oliva",team:"MIN",pos:"OF",age:86,country:"🇨🇺",rating:96,stats:{AVG:.304,HR:220,RBI:947,OPS:.851,SB:86}},
  {id:283,name:"Minnie Miñoso",team:"CWS",pos:"OF",age:90,country:"🇨🇺",rating:95,stats:{AVG:.298,HR:186,RBI:1023,OPS:.843,SB:205}},

  // ── LOS ANGELES ANGELS (más jugadores) ──────────────────────
  {id:284,name:"Jo Adell",team:"LAA",pos:"OF",age:26,country:"🇺🇸",rating:79,stats:{AVG:.256,HR:20,RBI:66,OPS:.808,SB:12}},
  {id:285,name:"Nolan Schanuel",team:"LAA",pos:"1B",age:23,country:"🇺🇸",rating:78,stats:{AVG:.250,HR:13,RBI:52,OPS:.786,SB:3}},
  {id:286,name:"Anthony Rendon",team:"LAA",pos:"3B",age:34,country:"🇺🇸",rating:72,stats:{AVG:.241,HR:9,RBI:40,OPS:.738,SB:1}},
  {id:287,name:"Carlos Estévez",team:"LAA",pos:"RP",age:32,country:"🇩🇴",rating:82,stats:{ERA:2.95,SV:27,SO:68,IP:52,WHIP:1.05}},
  {id:288,name:"Griffin Canning",team:"LAA",pos:"SP",age:28,country:"🇺🇸",rating:77,stats:{ERA:3.90,W:9,SO:148,IP:152,WHIP:1.24}},
  {id:289,name:"Mickey Moniak",team:"LAA",pos:"OF",age:26,country:"🇺🇸",rating:75,stats:{AVG:.247,HR:14,RBI:48,OPS:.762,SB:10}},
  {id:290,name:"Brandon Drury",team:"LAA",pos:"2B",age:32,country:"🇺🇸",rating:74,stats:{AVG:.244,HR:12,RBI:46,OPS:.744,SB:3}},
  {id:291,name:"Matt Moore",team:"LAA",pos:"RP",age:35,country:"🇺🇸",rating:73,stats:{ERA:3.68,SV:6,SO:55,IP:44,WHIP:1.20}},
  {id:292,name:"José Soriano",team:"LAA",pos:"SP",age:25,country:"🇩🇴",rating:76,stats:{ERA:3.82,W:8,SO:144,IP:148,WHIP:1.21}},
  {id:293,name:"Aaron Loup",team:"LAA",pos:"RP",age:37,country:"🇺🇸",rating:72,stats:{ERA:3.50,SV:4,SO:44,IP:38,WHIP:1.18}},

  // ── NEW YORK YANKEES (más) ───────────────────────────────────
  {id:294,name:"Oswaldo Cabrera",team:"NYY",pos:"OF",age:25,country:"🇻🇪",rating:76,stats:{AVG:.245,HR:12,RBI:46,OPS:.750,SB:8}},
  {id:295,name:"Ben Rice",team:"NYY",pos:"1B",age:24,country:"🇺🇸",rating:75,stats:{AVG:.248,HR:14,RBI:50,OPS:.768,SB:2}},
  {id:296,name:"Jon Berti",team:"NYY",pos:"SS",age:34,country:"🇺🇸",rating:72,stats:{AVG:.240,HR:5,RBI:28,OPS:.702,SB:18}},
  {id:297,name:"Luke Weaver",team:"NYY",pos:"RP",age:31,country:"🇺🇸",rating:80,stats:{ERA:2.79,SV:22,SO:70,IP:55,WHIP:1.04}},

  // ── BOSTON RED SOX (más) ─────────────────────────────────────
  {id:298,name:"Wilyer Abreu",team:"BOS",pos:"OF",age:25,country:"🇩🇴",rating:77,stats:{AVG:.255,HR:11,RBI:44,OPS:.778,SB:14}},
  {id:299,name:"Romy Gonzalez",team:"BOS",pos:"2B",age:28,country:"🇨🇺",rating:73,stats:{AVG:.238,HR:9,RBI:36,OPS:.714,SB:8}},
  {id:300,name:"Nick Pivetta",team:"BOS",pos:"SP",age:31,country:"🇨🇦",rating:79,stats:{ERA:3.94,W:10,SO:158,IP:162,WHIP:1.22}},
  {id:301,name:"Cam Booser",team:"BOS",pos:"RP",age:27,country:"🇺🇸",rating:74,stats:{ERA:3.40,SV:8,SO:52,IP:42,WHIP:1.14}},

  // ── TAMPA BAY RAYS (más) ─────────────────────────────────────
  {id:302,name:"Isaac Paredes",team:"TBR",pos:"3B",age:25,country:"🇲🇽",rating:83,stats:{AVG:.266,HR:22,RBI:75,OPS:.836,SB:2}},
  {id:303,name:"Richie Palacios",team:"TBR",pos:"OF",age:28,country:"🇺🇸",rating:74,stats:{AVG:.256,HR:8,RBI:38,OPS:.756,SB:10}},
  {id:304,name:"Drew Rasmussen",team:"TBR",pos:"SP",age:29,country:"🇺🇸",rating:78,stats:{ERA:3.70,W:9,SO:142,IP:152,WHIP:1.18}},
  {id:305,name:"Kevin Kelly",team:"TBR",pos:"RP",age:28,country:"🇺🇸",rating:75,stats:{ERA:3.20,SV:10,SO:58,IP:48,WHIP:1.10}},

  // ── TORONTO BLUE JAYS (más) ──────────────────────────────────
  {id:306,name:"Ernie Clement",team:"TOR",pos:"2B",age:29,country:"🇺🇸",rating:72,stats:{AVG:.250,HR:6,RBI:32,OPS:.706,SB:9}},
  {id:307,name:"Spencer Horwitz",team:"TOR",pos:"1B",age:26,country:"🇺🇸",rating:77,stats:{AVG:.270,HR:10,RBI:48,OPS:.800,SB:2}},
  {id:308,name:"Bowden Francis",team:"TOR",pos:"SP",age:28,country:"🇨🇦",rating:76,stats:{ERA:3.78,W:10,SO:148,IP:155,WHIP:1.18}},

  // ── BALTIMORE ORIOLES (más) ──────────────────────────────────
  {id:309,name:"Colton Cowser",team:"BAL",pos:"OF",age:24,country:"🇺🇸",rating:81,stats:{AVG:.264,HR:17,RBI:60,OPS:.822,SB:11}},
  {id:310,name:"Jordan Westburg",team:"BAL",pos:"2B",age:25,country:"🇺🇸",rating:80,stats:{AVG:.268,HR:16,RBI:58,OPS:.816,SB:8}},
  {id:311,name:"Grayson Rodriguez",team:"BAL",pos:"SP",age:24,country:"🇺🇸",rating:84,stats:{ERA:3.28,W:13,SO:186,IP:178,WHIP:1.12}},

  // ── MINNESOTA TWINS (más) ────────────────────────────────────
  {id:312,name:"Manuel Margot",team:"MIN",pos:"OF",age:30,country:"🇩🇴",rating:76,stats:{AVG:.256,HR:10,RBI:44,OPS:.762,SB:12}},
  {id:313,name:"Matt Wallner",team:"MIN",pos:"OF",age:26,country:"🇺🇸",rating:77,stats:{AVG:.252,HR:16,RBI:54,OPS:.790,SB:5}},
  {id:314,name:"Griffin Jax",team:"MIN",pos:"RP",age:30,country:"🇺🇸",rating:79,stats:{ERA:3.10,SV:16,SO:62,IP:52,WHIP:1.10}},

  // ── CLEVELAND GUARDIANS (más) ────────────────────────────────
  {id:315,name:"David Fry",team:"CLE",pos:"C",age:29,country:"🇺🇸",rating:77,stats:{AVG:.254,HR:13,RBI:48,OPS:.788,SB:3}},
  {id:316,name:"Will Brennan",team:"CLE",pos:"OF",age:27,country:"🇺🇸",rating:74,stats:{AVG:.262,HR:8,RBI:40,OPS:.752,SB:7}},
  {id:317,name:"Gavin Williams",team:"CLE",pos:"SP",age:23,country:"🇺🇸",rating:80,stats:{ERA:3.55,W:10,SO:162,IP:155,WHIP:1.16}},

  // ── CHICAGO WHITE SOX (más) ──────────────────────────────────
  {id:318,name:"Lenyn Sosa",team:"CWS",pos:"SS",age:24,country:"🇻🇪",rating:73,stats:{AVG:.238,HR:11,RBI:40,OPS:.728,SB:6}},
  {id:319,name:"Colson Montgomery",team:"CWS",pos:"SS",age:22,country:"🇺🇸",rating:74,stats:{AVG:.244,HR:10,RBI:38,OPS:.740,SB:10}},
  {id:320,name:"Sean Burke",team:"CWS",pos:"SP",age:24,country:"🇺🇸",rating:72,stats:{ERA:4.20,W:6,SO:118,IP:132,WHIP:1.30}},

  // ── KANSAS CITY ROYALS (más) ─────────────────────────────────
  {id:321,name:"Maikel Garcia",team:"KCR",pos:"3B",age:24,country:"🇻🇪",rating:78,stats:{AVG:.262,HR:9,RBI:44,OPS:.762,SB:16}},
  {id:322,name:"Kyle Isbel",team:"KCR",pos:"OF",age:28,country:"🇺🇸",rating:74,stats:{AVG:.248,HR:8,RBI:38,OPS:.732,SB:14}},
  {id:323,name:"Carlos Hernández",team:"KCR",pos:"RP",age:27,country:"🇻🇪",rating:76,stats:{ERA:3.44,SV:12,SO:62,IP:50,WHIP:1.16}},

  // ── DETROIT TIGERS (más) ─────────────────────────────────────
  {id:324,name:"Mark Canha",team:"DET",pos:"OF",age:36,country:"🇺🇸",rating:75,stats:{AVG:.246,HR:11,RBI:44,OPS:.758,SB:5}},
  {id:325,name:"Justyn-Henry Malloy",team:"DET",pos:"OF",age:24,country:"🇺🇸",rating:74,stats:{AVG:.248,HR:12,RBI:44,OPS:.760,SB:6}},
  {id:326,name:"Beau Brieske",team:"DET",pos:"SP",age:27,country:"🇺🇸",rating:74,stats:{ERA:4.00,W:7,SO:120,IP:135,WHIP:1.26}},
  {id:327,name:"Jason Foley",team:"DET",pos:"RP",age:28,country:"🇺🇸",rating:78,stats:{ERA:2.98,SV:20,SO:58,IP:54,WHIP:1.08}},

  // ── HOUSTON ASTROS (más) ─────────────────────────────────────
  {id:328,name:"Trey Cabbage",team:"HOU",pos:"OF",age:28,country:"🇺🇸",rating:73,stats:{AVG:.245,HR:13,RBI:46,OPS:.748,SB:4}},
  {id:329,name:"Jake Meyers",team:"HOU",pos:"OF",age:29,country:"🇺🇸",rating:75,stats:{AVG:.250,HR:10,RBI:42,OPS:.758,SB:8}},
  {id:330,name:"Ronel Blanco",team:"HOU",pos:"SP",age:30,country:"🇩🇴",rating:82,stats:{ERA:3.35,W:12,SO:166,IP:168,WHIP:1.13}},

  // ── SEATTLE MARINERS (más) ───────────────────────────────────
  {id:331,name:"Jonatan Clase",team:"SEA",pos:"OF",age:22,country:"🇩🇴",rating:80,stats:{AVG:.260,HR:10,RBI:44,OPS:.790,SB:44}},
  {id:332,name:"Mitch Garver",team:"SEA",pos:"DH",age:33,country:"🇺🇸",rating:79,stats:{AVG:.254,HR:18,RBI:60,OPS:.802,SB:1}},
  {id:333,name:"Bryan Woo",team:"SEA",pos:"SP",age:24,country:"🇺🇸",rating:81,stats:{ERA:3.48,W:10,SO:156,IP:157,WHIP:1.15}},

  // ── TEXAS RANGERS (más) ──────────────────────────────────────
  {id:334,name:"Wyatt Langford",team:"TEX",pos:"OF",age:23,country:"🇺🇸",rating:83,stats:{AVG:.274,HR:18,RBI:64,OPS:.842,SB:18}},
  {id:335,name:"Josh Jung",team:"TEX",pos:"3B",age:26,country:"🇺🇸",rating:80,stats:{AVG:.258,HR:16,RBI:58,OPS:.800,SB:4}},
  {id:336,name:"Nathan Eovaldi",team:"TEX",pos:"SP",age:34,country:"🇺🇸",rating:82,stats:{ERA:3.42,W:11,SO:162,IP:168,WHIP:1.14}},

  // ── OAKLAND ATHLETICS (más) ──────────────────────────────────
  {id:337,name:"Max Schuemann",team:"OAK",pos:"2B",age:26,country:"🇺🇸",rating:72,stats:{AVG:.238,HR:6,RBI:30,OPS:.700,SB:14}},
  {id:338,name:"JJ Bleday",team:"OAK",pos:"OF",age:26,country:"🇺🇸",rating:74,stats:{AVG:.240,HR:12,RBI:44,OPS:.738,SB:6}},
  {id:339,name:"Joey Estes",team:"OAK",pos:"SP",age:22,country:"🇺🇸",rating:73,stats:{ERA:4.10,W:7,SO:118,IP:132,WHIP:1.28}},

  // ── ATLANTA BRAVES (más) ─────────────────────────────────────
  {id:340,name:"Eddie Rosario",team:"ATL",pos:"OF",age:33,country:"🇵🇷",rating:77,stats:{AVG:.258,HR:14,RBI:54,OPS:.782,SB:4}},
  {id:341,name:"Ramon Laureano",team:"ATL",pos:"OF",age:30,country:"🇩🇴",rating:76,stats:{AVG:.250,HR:13,RBI:46,OPS:.770,SB:8}},
  {id:342,name:"Grant Holmes",team:"ATL",pos:"RP",age:28,country:"🇺🇸",rating:75,stats:{ERA:3.30,SV:8,SO:52,IP:44,WHIP:1.14}},

  // ── NEW YORK METS (más) ──────────────────────────────────────
  {id:343,name:"Jose Iglesias",team:"NYM",pos:"SS",age:35,country:"🇨🇺",rating:73,stats:{AVG:.260,HR:5,RBI:32,OPS:.710,SB:4}},
  {id:344,name:"DJ Stewart",team:"NYM",pos:"OF",age:31,country:"🇺🇸",rating:74,stats:{AVG:.248,HR:14,RBI:48,OPS:.768,SB:3}},
  {id:345,name:"Sean Manaea",team:"NYM",pos:"SP",age:33,country:"🇺🇸",rating:83,stats:{ERA:3.32,W:12,SO:174,IP:171,WHIP:1.12}},
  {id:346,name:"Clay Beeter",team:"NYM",pos:"RP",age:27,country:"🇺🇸",rating:74,stats:{ERA:3.55,SV:8,SO:56,IP:46,WHIP:1.18}},

  // ── PHILADELPHIA PHILLIES (más) ──────────────────────────────
  {id:347,name:"Weston Wilson",team:"PHI",pos:"OF",age:30,country:"🇺🇸",rating:73,stats:{AVG:.248,HR:12,RBI:44,OPS:.752,SB:10}},
  {id:348,name:"Edmundo Sosa",team:"PHI",pos:"SS",age:29,country:"🇵🇦",rating:72,stats:{AVG:.240,HR:7,RBI:34,OPS:.706,SB:6}},
  {id:349,name:"José Alvarado",team:"PHI",pos:"RP",age:29,country:"🇻🇪",rating:82,stats:{ERA:2.92,SV:16,SO:68,IP:52,WHIP:1.06}},

  // ── MIAMI MARLINS (más) ──────────────────────────────────────
  {id:350,name:"Nick Gordon",team:"MIA",pos:"OF",age:28,country:"🇺🇸",rating:72,stats:{AVG:.242,HR:8,RBI:36,OPS:.716,SB:10}},
  {id:351,name:"Jonah Bride",team:"MIA",pos:"1B",age:28,country:"🇺🇸",rating:70,stats:{AVG:.238,HR:7,RBI:32,OPS:.706,SB:2}},
  {id:352,name:"Tanner Scott",team:"MIA",pos:"RP",age:30,country:"🇺🇸",rating:83,stats:{ERA:2.70,SV:26,SO:74,IP:54,WHIP:1.02}},

  // ── WASHINGTON NATIONALS (más) ───────────────────────────────
  {id:353,name:"Ildemaro Vargas",team:"WSN",pos:"2B",age:33,country:"🇻🇪",rating:70,stats:{AVG:.245,HR:5,RBI:28,OPS:.690,SB:4}},
  {id:354,name:"Dylan Crews",team:"WSN",pos:"OF",age:23,country:"🇺🇸",rating:78,stats:{AVG:.265,HR:12,RBI:48,OPS:.802,SB:14}},
  {id:355,name:"Trevor Williams",team:"WSN",pos:"SP",age:32,country:"🇺🇸",rating:74,stats:{ERA:4.00,W:8,SO:132,IP:148,WHIP:1.26}},

  // ── CHICAGO CUBS (más) ───────────────────────────────────────
  {id:356,name:"Pete Crow-Armstrong",team:"CHC",pos:"OF",age:22,country:"🇺🇸",rating:81,stats:{AVG:.262,HR:14,RBI:52,OPS:.810,SB:26}},
  {id:357,name:"Miles Mastrobuoni",team:"CHC",pos:"2B",age:29,country:"🇺🇸",rating:71,stats:{AVG:.244,HR:5,RBI:28,OPS:.698,SB:12}},
  {id:358,name:"Héctor Neris",team:"CHC",pos:"RP",age:36,country:"🇩🇴",rating:75,stats:{ERA:3.44,SV:14,SO:56,IP:46,WHIP:1.14}},

  // ── ST. LOUIS CARDINALS (más) ────────────────────────────────
  {id:359,name:"Victor Scott II",team:"STL",pos:"OF",age:23,country:"🇺🇸",rating:74,stats:{AVG:.245,HR:5,RBI:30,OPS:.702,SB:30}},
  {id:360,name:"Iván Herrera",team:"STL",pos:"C",age:24,country:"🇵🇦",rating:76,stats:{AVG:.258,HR:10,RBI:42,OPS:.776,SB:2}},
  {id:361,name:"André Pallante",team:"STL",pos:"SP",age:26,country:"🇺🇸",rating:75,stats:{ERA:3.80,W:9,SO:130,IP:148,WHIP:1.22}},

  // ── MILWAUKEE BREWERS (más) ──────────────────────────────────
  {id:362,name:"Josh Lindblom",team:"MIL",pos:"SP",age:37,country:"🇺🇸",rating:72,stats:{ERA:4.10,W:7,SO:118,IP:138,WHIP:1.28}},
  {id:363,name:"Rhys Hoskins",team:"MIL",pos:"1B",age:31,country:"🇺🇸",rating:80,stats:{AVG:.254,HR:22,RBI:73,OPS:.812,SB:3}},
  {id:364,name:"Joey Wiemer",team:"MIL",pos:"OF",age:27,country:"🇺🇸",rating:74,stats:{AVG:.238,HR:14,RBI:48,OPS:.742,SB:12}},

  // ── CINCINNATI REDS (más) ────────────────────────────────────
  {id:365,name:"Stuart Fairchild",team:"CIN",pos:"OF",age:29,country:"🇺🇸",rating:73,stats:{AVG:.248,HR:10,RBI:40,OPS:.748,SB:10}},
  {id:366,name:"Santiago Espinal",team:"CIN",pos:"2B",age:30,country:"🇩🇴",rating:74,stats:{AVG:.254,HR:7,RBI:36,OPS:.728,SB:8}},
  {id:367,name:"Graham Ashcraft",team:"CIN",pos:"SP",age:27,country:"🇺🇸",rating:76,stats:{ERA:3.90,W:9,SO:136,IP:150,WHIP:1.24}},

  // ── PITTSBURGH PIRATES (más) ─────────────────────────────────
  {id:368,name:"Henry Davis",team:"PIT",pos:"C",age:24,country:"🇺🇸",rating:76,stats:{AVG:.250,HR:12,RBI:44,OPS:.776,SB:3}},
  {id:369,name:"Michael Pérez",team:"PIT",pos:"OF",age:31,country:"🇵🇷",rating:70,stats:{AVG:.236,HR:7,RBI:30,OPS:.688,SB:2}},
  {id:370,name:"Mitch Keller",team:"PIT",pos:"SP",age:28,country:"🇺🇸",rating:83,stats:{ERA:3.26,W:13,SO:178,IP:174,WHIP:1.11}},
  {id:371,name:"David Bednar",team:"PIT",pos:"RP",age:30,country:"🇺🇸",rating:84,stats:{ERA:2.82,SV:32,SO:76,IP:58,WHIP:1.04}},

  // ── LOS ANGELES DODGERS (más) ────────────────────────────────
  {id:372,name:"Max Muncy",team:"LAD",pos:"3B",age:34,country:"🇺🇸",rating:80,stats:{AVG:.241,HR:20,RBI:66,OPS:.820,SB:3}},
  {id:373,name:"Cavan Biggio",team:"LAD",pos:"2B",age:29,country:"🇨🇦",rating:74,stats:{AVG:.238,HR:10,RBI:38,OPS:.738,SB:8}},
  {id:374,name:"Michael Grove",team:"LAD",pos:"SP",age:28,country:"🇺🇸",rating:74,stats:{ERA:3.98,W:8,SO:128,IP:142,WHIP:1.24}},
  {id:375,name:"Brusdar Graterol",team:"LAD",pos:"RP",age:26,country:"🇻🇪",rating:80,stats:{ERA:2.88,SV:14,SO:56,IP:50,WHIP:1.04}},

  // ── SAN FRANCISCO GIANTS (más) ───────────────────────────────
  {id:376,name:"LaMonte Wade Jr.",team:"SFG",pos:"1B",age:31,country:"🇺🇸",rating:77,stats:{AVG:.252,HR:14,RBI:52,OPS:.794,SB:4}},
  {id:377,name:"Tyler Fitzgerald",team:"SFG",pos:"SS",age:26,country:"🇺🇸",rating:76,stats:{AVG:.258,HR:12,RBI:44,OPS:.790,SB:12}},
  {id:378,name:"Jordan Hicks",team:"SFG",pos:"SP",age:28,country:"🇺🇸",rating:79,stats:{ERA:3.70,W:10,SO:150,IP:158,WHIP:1.20}},

  // ── SAN DIEGO PADRES (más) ───────────────────────────────────
  {id:379,name:"Donovan Solano",team:"SDP",pos:"2B",age:37,country:"🇨🇴",rating:72,stats:{AVG:.258,HR:7,RBI:36,OPS:.724,SB:2}},
  {id:380,name:"David Peralta",team:"SDP",pos:"OF",age:37,country:"🇻🇪",rating:71,stats:{AVG:.248,HR:8,RBI:38,OPS:.722,SB:3}},
  {id:381,name:"Jhony Brito",team:"SDP",pos:"SP",age:26,country:"🇩🇴",rating:74,stats:{ERA:3.90,W:8,SO:130,IP:144,WHIP:1.24}},

  // ── ARIZONA DIAMONDBACKS (más) ───────────────────────────────
  {id:382,name:"Randal Grichuk",team:"ARI",pos:"OF",age:33,country:"🇺🇸",rating:73,stats:{AVG:.245,HR:14,RBI:50,OPS:.752,SB:4}},
  {id:383,name:"Pavin Smith",team:"ARI",pos:"1B",age:28,country:"🇺🇸",rating:72,stats:{AVG:.248,HR:10,RBI:40,OPS:.738,SB:2}},
  {id:384,name:"A.J. Puk",team:"ARI",pos:"RP",age:29,country:"🇺🇸",rating:79,stats:{ERA:3.10,SV:14,SO:68,IP:52,WHIP:1.10}},

  // ── COLORADO ROCKIES (más) ───────────────────────────────────
  {id:385,name:"Elehuris Montero",team:"COL",pos:"3B",age:25,country:"🇩🇴",rating:73,stats:{AVG:.252,HR:15,RBI:52,OPS:.758,SB:3}},
  {id:386,name:"Jake Bird",team:"COL",pos:"RP",age:29,country:"🇺🇸",rating:70,stats:{ERA:4.10,SV:6,SO:46,IP:42,WHIP:1.32}},
  {id:387,name:"Antonio Senzatela",team:"COL",pos:"SP",age:29,country:"🇻🇪",rating:68,stats:{ERA:5.10,W:5,SO:88,IP:118,WHIP:1.48}},
  {id:388,name:"Hunter Goodman",team:"COL",pos:"C",age:25,country:"🇺🇸",rating:72,stats:{AVG:.244,HR:12,RBI:42,OPS:.740,SB:3}},
];

