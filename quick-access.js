console.log('External more-script.js loaded and executing!');

(function() {
    'use strict';
    
    
    const gameData = {
 "10-minutes-till-dawn": { name: "10 Minutes Till Dawn", icon: "fas fa-clock" },
 "2048": { name: "2048", icon: "fas fa-th" },
  "a-dance-of-fire-and-ice": { name: "A Dance Of Fire And Ice", icon: "fas fa-music" },
  "achievementunlocked": { name: "Achievementunlocked", icon: "fas fa-trophy" },
  "adarkroom": { name: "Adarkroom", icon: "fas fa-fire" },
  "adrenalinechallenge": { name: "Adrenalinechallenge", icon: "fas fa-bolt" },
  "adventure-drivers": { name: "Adventure Drivers", icon: "fas fa-car" },
  "ages-of-conflict": { name: "Ages Of Conflict", icon: "fas fa-globe" },
  "alienhominid": { name: "Alienhominid", icon: "fas fa-rocket" },
  "amazing-rope-police": { name: "Amazing Rope Police", icon: "fas fa-user-shield" },
  "amidst-the-clouds": { name: "Amidst The Clouds", icon: "fas fa-cloud" },
  "among-us": { name: "Among Us", icon: "fas fa-user-astronaut" },
  "angry-sharks": { name: "Angry Sharks", icon: "fas fa-fish" },
  "aquapark-slides": { name: "Aquapark Slides", icon: "fas fa-water" },
  "astray": { name: "Astray", icon: "fas fa-question" },
  "avalanche": { name: "Avalanche", icon: "fas fa-mountain" },
  "awesometanks2": { name: "Awesometanks2", icon: "fas fa-tank" },
  "backrooms": { name: "Backrooms", icon: "fas fa-door-open" },
  "backrooms-2d": { name: "Backrooms 2D", icon: "fas fa-door-closed" },
  "backrooms2d": { name: "Backrooms2D", icon: "fas fa-door-closed" },
  "bacon-may-die": { name: "Bacon May Die", icon: "fas fa-skull" },
  "bad-ice-cream": { name: "Bad Ice Cream", icon: "fas fa-ice-cream" },
  "bad-ice-cream-2": { name: "Bad Ice Cream 2", icon: "fas fa-ice-cream" },
  "bad-ice-cream-3": { name: "Bad Ice Cream 3", icon: "fas fa-ice-cream" },
  "baldis-basics": { name: "Baldis Basics", icon: "fas fa-school" },
  "balldodge": { name: "Balldodge", icon: "fas fa-futbol" },
  "ballistic-chickens": { name: "Ballistic Chickens", icon: "fas fa-drumstick-bite" },
  "basket-random": { name: "Basket Random", icon: "fas fa-basketball-ball" },
  "basketball-stars": { name: "Basketball Stars", icon: "fas fa-basketball-ball" },
  "basketbros-io": { name: "Basketbros Io", icon: "fas fa-basketball-ball" },
  "battleforgondor": { name: "Battleforgondor", icon: "fas fa-chess-knight" },
  "bigredbutton": { name: "Bigredbutton", icon: "fas fa-dot-circle" },
  "bitlife": { name: "Bitlife", icon: "fas fa-user" },
  "blacholesquare": { name: "Blacholesquare", icon: "fas fa-square" },
  "blackknight": { name: "Blackknight", icon: "fas fa-chess-knight" },
  "blockpost": { name: "Blockpost", icon: "fas fa-cube" },
  "bloonstd": { name: "Bloonstd", icon: "fas fa-circle" },
  "bloonstd2": { name: "Bloonstd2", icon: "fas fa-circle" },
  "bloxors": { name: "Bloxors", icon: "fas fa-cube" },
  "bntts": { name: "Bntts", icon: "fas fa-building" },
  "bobtherobber2": { name: "Bobtherobber2", icon: "fas fa-user-ninja" },
  "bonkio": { name: "Bonkio", icon: "fas fa-circle" },
  "boxhead2play": { name: "Boxhead2Play", icon: "fas fa-user" },
  "boxing-random": { name: "Boxing Random", icon: "fas fa-fist-raised" },
  "breakingthebank": { name: "Breakingthebank", icon: "fas fa-university" },
  "btd4": { name: "Btd4", icon: "fas fa-circle" },
  "btd5": { name: "Btd5", icon: "fas fa-circle" },
  "btts": { name: "Btts", icon: "fas fa-building" },
  "burger-and-frights": { name: "Burger And Frights", icon: "fas fa-hamburger" },
  "bus and subway": { name: "Bus And Subway", icon: "fas fa-subway" },
  "busandsubway": { name: "Busandsubway", icon: "fas fa-subway" },
  "cannon-basketball-4": { name: "Cannon Basketball 4", icon: "fas fa-basketball-ball" },
  "canyondefense": { name: "Canyondefense", icon: "fas fa-shield-alt" },
  "cars-simulator": { name: "Cars Simulator", icon: "fas fa-car" },
  "cell-machine": { name: "Cell Machine", icon: "fas fa-cogs" },
  "champion-island": { name: "Champion Island", icon: "fas fa-trophy" },
  "championarcher": { name: "Championarcher", icon: "fas fa-bullseye" },
  "checkers": { name: "Checkers", icon: "fas fa-chess-board" },
  "chess": { name: "Chess", icon: "fas fa-chess" },
  "chill-radio": { name: "Chill Radio", icon: "fas fa-headphones" },
  "chrome-dino": { name: "Chrome Dino", icon: "fas fa-dinosaur" },
  "circlo": { name: "Circlo", icon: "fas fa-circle" },
  "classicube": { name: "Classicube", icon: "fas fa-cube" },
  "cluster-rush": { name: "Cluster Rush", icon: "fas fa-running" },
  "cnpingpong": { name: "Cnpingpong", icon: "fas fa-table-tennis" },
  "connect3": { name: "Connect3", icon: "fas fa-th" },
  "cookie-clickers": { name: "Cookie Clicker", icon: "fas fa-cookie-bite" },
  "core-ball": { name: "Core Ball", icon: "fas fa-dot-circle" },
  "craftmine": { name: "Craftmine", icon: "fas fa-cube" },
  "creativekillchamber": { name: "Creativekillchamber", icon: "fas fa-skull-crossbones" },
  "crossyroad": { name: "Crossyroad", icon: "fas fa-road" },
  "csgo-clicker": { name: "Csgo Clicker", icon: "fas fa-mouse-pointer" },
  "ctr": { name: "Ctr", icon: "fas fa-cut" },
  "ctr-holiday": { name: "Ctr Holiday", icon: "fas fa-cut" },
  "ctr-tr": { name: "Ctr Tr", icon: "fas fa-cut" },
  "cubefield": { name: "Cubefield", icon: "fas fa-cube" },
  "cupcake2048": { name: "Cupcake2048", icon: "fas fa-birthday-cake" },
  "dante": { name: "Dante", icon: "fas fa-fire" },
  "deal-or-no-deal": { name: "Deal Or No Deal", icon: "fas fa-briefcase" },
  "death-run-3d": { name: "Death Run 3D", icon: "fas fa-skull-crossbones" },
  "deepest-sword": { name: "Deepest Sword", icon: "fas fa-kiwi-bird" },
  "defend-the-tank": { name: "Defend The Tank", icon: "fas fa-tank" },
  "doctor-acorn2": { name: "Doctor Acorn2", icon: "fas fa-seedling" },
  "dodge": { name: "Dodge", icon: "fas fa-arrows-alt" },
  "doge2048": { name: "Doge2048", icon: "fas fa-dog" },
  "dogeminer2": { name: "Dogeminer2", icon: "fas fa-dog" },
  "doodle-jump": { name: "Doodle Jump", icon: "fas fa-frog" },
  "doom": { name: "Doom", icon: "fas fa-skull" },
  "doublewires": { name: "Doublewires", icon: "fas fa-link" },
  "dragon-vs-bricks": { name: "Dragon Vs Bricks", icon: "fas fa-dragon" },
  "draw-the-hill": { name: "Draw The Hill", icon: "fas fa-pen" },
  "drift-boss": { name: "Drift Boss", icon: "fas fa-car" },
  "drift-hunters": { name: "Drift Hunters", icon: "fas fa-car-side" },
  "drive-mad": { name: "Drive Mad", icon: "fas fa-car-crash" },
  "dsc": { name: "Dsc", icon: "fas fa-question" },
  "ducklife1": { name: "Ducklife1", icon: "fas fa-duck" },
  "ducklife2": { name: "Ducklife2", icon: "fas fa-duck" },
  "ducklife3": { name: "Ducklife3", icon: "fas fa-duck" },
  "ducklife4": { name: "Ducklife4", icon: "fas fa-duck" },
  "duke-nukem-2": { name: "Duke Nukem 2", icon: "fas fa-bomb" },
  "dumbwaystodie": { name: "Dumbwaystodie", icon: "fas fa-skull-crossbones" },
  "eaglerfaithful": { name: "Eaglerfaithful", icon: "fas fa-feather" },
  "earntodie": { name: "Earntodie", icon: "fas fa-car" },
  "edge-surf": { name: "Edge Surf", icon: "fas fa-water" },
  "edgenotfound": { name: "Edgenotfound", icon: "fas fa-exclamation" },
  "eel-slap": { name: "Eel Slap", icon: "fas fa-fish" },
  "eggycar": { name: "Eggycar", icon: "fas fa-egg" },
  "elasticman": { name: "Elasticman", icon: "fas fa-user-ninja" },
  "endlesswar3": { name: "Endlesswar3", icon: "fas fa-fist-raised" },
  "escapingtheprison": { name: "Escapingtheprison", icon: "fas fa-door-open" },
  "evil-glitch": { name: "Evil Glitch", icon: "fas fa-bug" },
  "evolution": { name: "Evolution", icon: "fas fa-dna" },
  "exo": { name: "Exo", icon: "fas fa-rocket" },
  "factoryballs": { name: "Factoryballs", icon: "fas fa-circle" },
  "fairsquares": { name: "Fairsquares", icon: "fas fa-square" },
  "fake-virus": { name: "Fake Virus", icon: "fas fa-bug" },
  "fancypantsadventures": { name: "Fancypantsadventures", icon: "fas fa-hat-wizard" },
  "fantasy-dash": { name: "Fantasy Dash", icon: "fas fa-running" },
  "fireboywatergirlforesttemple": { name: "Fireboywatergirlforesttemple", icon: "fas fa-fire" },
  "flappy-2048": { name: "Flappy 2048", icon: "fas fa-dove" },
  "flappy-bird": { name: "Flappy Bird", icon: "fas fa-dove" },
  "flappy-plane": { name: "Flappy Plane", icon: "fas fa-plane" },
  "flappybird": { name: "Flappybird", icon: "fas fa-dove" },
  "flappyplane": { name: "Flappyplane", icon: "fas fa-plane" },
  "flashtetris": { name: "Flashtetris", icon: "fas fa-th" },
  "fleeingthecomplex": { name: "Fleeingthecomplex", icon: "fas fa-door-open" },
  "flippy-fish": { name: "Flippy Fish", icon: "fas fa-fish" },
  "fnaw": { name: "Fnaw", icon: "fas fa-ghost" },
  "fridaynightfunkin": { name: "Fridaynightfunkin", icon: "fas fa-music" },
  "froggys-battle": { name: "Froggys Battle", icon: "fas fa-frog" },
  "fruitninja": { name: "Fruitninja", icon: "fas fa-apple-alt" },
  "frying-nemo": { name: "Frying Nemo", icon: "fas fa-fish" },
  "gachalife": { name: "Gachalife", icon: "fas fa-child" },
  "game-inside": { name: "Game Inside", icon: "fas fa-gamepad" },
  "gdtd": { name: "Gdtd", icon: "fas fa-th" },
  "gearsofbabies": { name: "Gearsofbabies", icon: "fas fa-cogs" },
  "generic-fishing-game": { name: "Generic Fishing Game", icon: "fas fa-fish" },
  "geochallenge": { name: "Geochallenge", icon: "fas fa-globe" },
  "geodash": { name: "Geodash", icon: "fas fa-cube" },
  "geodashlite": { name: "Geodashlite", icon: "fas fa-cube" },
  "geogeo": { name: "Geogeo", icon: "fas fa-globe" },
  "geops1": { name: "Geops1", icon: "fas fa-globe" },
  "georash": { name: "Georash", icon: "fas fa-cube" },
  "georgeandtheprinter": { name: "Georgeandtheprinter", icon: "fas fa-print" },
  "geotrash": { name: "Geotrash", icon: "fas fa-trash" },
  "getaway-shootout": { name: "Getaway Shootout", icon: "fas fa-gun" },
  "gimme-the-airpod": { name: "Gimme The Airpod", icon: "fas fa-headphones" },
  "glass-city": { name: "Glass City", icon: "fas fa-city" },
  "gmonster": { name: "Gmonster", icon: "fas fa-ghost" },
  "go-ball": { name: "Go Ball", icon: "fas fa-futbol" },
  "goodnight": { name: "Goodnight", icon: "fas fa-bed" },
  "goodnight-meowmie": { name: "Goodnight Meowmie", icon: "fas fa-cat" },
  "google-feud": { name: "Google Feud", icon: "fas fa-question" },
  "google-snake": { name: "Google Snake", icon: "fas fa-ellipsis-h" },
  "gravity-soccer": { name: "Gravity Soccer", icon: "fas fa-futbol" },
  "greybox": { name: "Greybox", icon: "fas fa-square" },
  "grindcraft": { name: "Grindcraft", icon: "fas fa-cube" },
  "hackertype": { name: "Hackertype", icon: "fas fa-keyboard" },
  "handshakes": { name: "Handshakes", icon: "fas fa-handshake" },
  "happy-hop": { name: "Happy Hop", icon: "fas fa-frog" },
  "happywheels": { name: "Happywheels", icon: "fas fa-wheelchair" },
  "hardware-tycoon": { name: "Hardware Tycoon", icon: "fas fa-microchip" },
  "hba": { name: "Hba", icon: "fas fa-question" },
  "helicopter": { name: "Helicopter", icon: "fas fa-helicopter" },
  "hellscaper": { name: "Hellscaper", icon: "fas fa-fire" },
  "hexempire": { name: "Hexempire", icon: "fas fa-chess-board" },
  "hexgl": { name: "Hexgl", icon: "fas fa-hexagon" },
  "hextris": { name: "Hextris", icon: "fas fa-th" },
  "highrisehop": { name: "Highrisehop", icon: "fas fa-building" },
  "hill-climb-racing": { name: "Hill Climb Racing", icon: "fas fa-car" },
  "hungry-lamu": { name: "Hungry Lamu", icon: "fas fa-apple-alt" },
  "iceagebaby": { name: "Iceagebaby", icon: "fas fa-baby" },
  "iceagebaby2": { name: "Iceagebaby2", icon: "fas fa-baby" },
  "idle-breakout": { name: "Idle Breakout", icon: "fas fa-th" },
  "idle-shark": { name: "Idle Shark", icon: "fas fa-fish" },
  "idledice": { name: "Idledice", icon: "fas fa-dice" },
  "impossiblequiz": { name: "Impossiblequiz", icon: "fas fa-question" },
  "impossiblequiz2": { name: "Impossiblequiz2", icon: "fas fa-question" },
  "impossiblequizbeta": { name: "Impossiblequizbeta", icon: "fas fa-question" },
  "interactivebuddy": { name: "Interactivebuddy", icon: "fas fa-user-friends" },
  "invite-the-blackbird": { name: "Invite The Blackbird", icon: "fas fa-crow" },
  "iron dash": { name: "Iron Dash", icon: "fas fa-bolt" },
  "irondash": { name: "Irondash", icon: "fas fa-bolt" },
  "jetpack-joyride": { name: "Jetpack Joyride", icon: "fas fa-jet-fighter" },
  "just-fall": { name: "Just Fall", icon: "fas fa-frog" },
  "just-one-boss": { name: "Just One Boss", icon: "fas fa-chess-king" },
  "kirkaio": { name: "Kirkaio", icon: "fas fa-crosshairs" },
  "kitchen-gun-game": { name: "Kitchen Gun Game", icon: "fas fa-utensils" },
  "kittencannon": { name: "Kittencannon", icon: "fas fa-cat" },
  "knife-master": { name: "Knife Master", icon: "fas fa-knife" },
  "krunker": { name: "Krunker", icon: "fas fa-gun" },
  "learntofly": { name: "Learntofly", icon: "fas fa-dove" },
  "learntofly2": { name: "Learntofly2", icon: "fas fa-dove" },
  "level13": { name: "Level13", icon: "fas fa-sort-numeric-up" },
  "linerider": { name: "Linerider", icon: "fas fa-pen" },
  "linkgen": { name: "Linkgen", icon: "fas fa-link" },
  "ltf-idle": { name: "Ltf Idle", icon: "fas fa-dove" },
  "ltf3": { name: "Ltf3", icon: "fas fa-dove" },
  "madalin-stunt-cars-2": { name: "Madalin Stunt Cars 2", icon: "fas fa-car" },
  "madalin-stunt-cars-3": { name: "Madalin Stunt Cars 3", icon: "fas fa-car" },
  "mario": { name: "Mario", icon: "fas fa-hat-wizard" },
  "marvinspectrum": { name: "Marvinspectrum", icon: "fas fa-palette" },
  "matrixrampage": { name: "Matrixrampage", icon: "fas fa-user-ninja" },
  "mcje": { name: "Mcje", icon: "fas fa-cube" },
  "meme2048": { name: "Meme2048", icon: "fas fa-th" },
  "merge-round-racers": { name: "Merge Round Racers", icon: "fas fa-car" },
  "mindustry": { name: "Mindustry", icon: "fas fa-industry" },
  "mineblocks": { name: "Mineblocks", icon: "fas fa-cube" },
  "minecraft-15": { name: "Minecraft 15", icon: "fas fa-cube" },
  "minecraft-18": { name: "Minecraft 18", icon: "fas fa-cube" },
  "minecraft-classic": { name: "Minecraft Classic", icon: "fas fa-cube" },
  "minecraftbeta": { name: "Minecraftbeta", icon: "fas fa-cube" },
  "minecrafttowerdefence": { name: "Minecrafttowerdefence", icon: "fas fa-chess-rook" },
  "minesweeper": { name: "Minesweeper", icon: "fas fa-bomb" },
  "miniputt": { name: "Miniputt", icon: "fas fa-golf-ball" },
  "missiles": { name: "Missiles", icon: "fas fa-rocket" },
  "monkeymart": { name: "Monkeymart", icon: "fas fa-apple-alt" },
  "monster-tracks": { name: "Monster Tracks", icon: "fas fa-truck-monster" },
  "motox3m": { name: "Motox3M", icon: "fas fa-motorcycle" },
  "motox3m-pool": { name: "Motox3M Pool", icon: "fas fa-motorcycle" },
  "motox3m-spooky": { name: "Motox3M Spooky", icon: "fas fa-motorcycle" },
  "motox3m-winter": { name: "Motox3M Winter", icon: "fas fa-motorcycle" },
  "motox3m2": { name: "Motox3M2", icon: "fas fa-motorcycle" },
  "my-rusty-submarine": { name: "My Rusty Submarine", icon: "fas fa-ship" },
  "n-gon": { name: "N Gon", icon: "fas fa-shapes" },
  "neal.fun": { name: "Neal.Fun", icon: "fas fa-smile" },
  "ninja": { name: "Ninja", icon: "fas fa-user-ninja" },
  "ninjavsevilcorp": { name: "Ninjavsevilcorp", icon: "fas fa-user-ninja" },
  "noob-steve-parkour": { name: "Noob Steve Parkour", icon: "fas fa-running" },
  "ns-shaft": { name: "Ns Shaft", icon: "fas fa-arrow-down" },
  "nsresurgence": { name: "Nsresurgence", icon: "fas fa-arrow-up" },
  "offlineparadise": { name: "Offlineparadise", icon: "fas fa-umbrella-beach" },
  "om-bounce": { name: "Om Bounce", icon: "fas fa-bounce" },
  "osu!": { name: "Osu!", icon: "fas fa-music" },
  "out-of-ctrl": { name: "Out Of Ctrl", icon: "fas fa-keyboard" },
  "overwatch": { name: "Overwatch", icon: "fas fa-crosshairs" },
  "ovo": { name: "Ovo", icon: "fas fa-egg" },
  "pandemic2": { name: "Pandemic2", icon: "fas fa-virus" },
  "papasburgeria": { name: "Papasburgeria", icon: "fas fa-hamburger" },
  "papaspizzaria": { name: "Papaspizzaria", icon: "fas fa-pizza-slice" },
  "paperio2": { name: "Paperio2", icon: "fas fa-file" },
  "papery-planes": { name: "Papery Planes", icon: "fas fa-paper-plane" },
  "particle-clicker": { name: "Particle Clicker", icon: "fas fa-dot-circle" },
  "piclient": { name: "Piclient", icon: "fas fa-pi" },
  "pigeon-ascent": { name: "Pigeon Ascent", icon: "fas fa-dove" },
  "pixel-gun-survival": { name: "Pixel Gun Survival", icon: "fas fa-gun" },
  "planetlife": { name: "Planetlife", icon: "fas fa-globe" },
  "plantsvzombie1": { name: "Plantsvzombie1", icon: "fas fa-seedling" },
  "polybranch": { name: "Polybranch", icon: "fas fa-code-branch" },
  "popcat-classic": { name: "Popcat Classic", icon: "fas fa-cat" },
  "portalflash": { name: "Portalflash", icon: "fas fa-dot-circle" },
  "precision-client": { name: "Precision Client", icon: "fas fa-crosshairs" },
  "protektor": { name: "Protektor", icon: "fas fa-shield-alt" },
  "push-the-square": { name: "Push The Square", icon: "fas fa-square" },
  "push-your-luck": { name: "Push Your Luck", icon: "fas fa-dice" },
  "rabbit-samurai": { name: "Rabbit Samurai", icon: "fas fa-carrot" },
  "rabbit-samurai2": { name: "Rabbit Samurai2", icon: "fas fa-carrot" },
  "resent-client": { name: "Resent Client", icon: "fas fa-user" },
  "retro-bowl": { name: "Retro Bowl", icon: "fas fa-football-ball" },
  "rhythm-doctor": { name: "Rhythm Doctor", icon: "fas fa-heartbeat" },
  "riddleschool": { name: "Riddleschool", icon: "fas fa-school" },
  "riddleschool2": { name: "Riddleschool2", icon: "fas fa-school" },
  "riddleschool3": { name: "Riddleschool3", icon: "fas fa-school" },
  "riddleschool4": { name: "Riddleschool4", icon: "fas fa-school" },
  "riddleschool5": { name: "Riddleschool5", icon: "fas fa-school" },
  "riddletransfer": { name: "Riddletransfer", icon: "fas fa-exchange-alt" },
  "riddletransfer2": { name: "Riddletransfer2", icon: "fas fa-exchange-alt" },
  "roblox": { name: "Roblox", icon: "fas fa-cube" },
  "roblox copy": { name: "Roblox Copy", icon: "fas fa-cube" },
  "robuxclicker": { name: "Robuxclicker", icon: "fas fa-coins" },
  "rocket-league": { name: "Rocket League", icon: "fas fa-rocket" },
  "rolling-forests": { name: "Rolling Forests", icon: "fas fa-tree" },
  "rolly-vortex": { name: "Rolly Vortex", icon: "fas fa-circle" },
  "rooftop-snipers": { name: "Rooftop Snipers", icon: "fas fa-crosshairs" },
  "roommate": { name: "Roommate", icon: "fas fa-user-friends" },
  "ruffle": { name: "Ruffle", icon: "fas fa-puzzle-piece" },
  "run": { name: "Run", icon: "fas fa-running" },
  "run 2": { name: "Run 2", icon: "fas fa-running" },
  "run 3": { name: "Run 3", icon: "fas fa-running" },
  "run2": { name: "Run2", icon: "fas fa-running" },
  "run3": { name: "Run3", icon: "fas fa-running" },
  "run4bootleg": { name: "Run4Bootleg", icon: "fas fa-running" },
  "runner": { name: "Runner", icon: "fas fa-running" },
  "sand-game": { name: "Sand Game", icon: "fas fa-grip-lines" },
  "sandboxels": { name: "Sandboxels", icon: "fas fa-cubes" },
  "santy-is-home": { name: "Santy Is Home", icon: "fas fa-home" },
  "scooperia": { name: "Scooperia", icon: "fas fa-ice-cream" },
  "scrapmetal": { name: "Scrapmetal", icon: "fas fa-cog" },
  "scratcharia": { name: "Scratcharia", icon: "fas fa-cat" },
  "shapeshootout": { name: "Shapeshootout", icon: "fas fa-bullseye" },
  "shellshockers": { name: "Shellshockers", icon: "fas fa-egg" },
  "shogunshowdown": { name: "Shogunshowdown", icon: "fas fa-gavel" },
  "shotinthedark": { name: "Shotinthedark", icon: "fas fa-crosshairs" },
  "shuttledeck": { name: "Shuttledeck", icon: "fas fa-space-shuttle" },
  "sky-car-stunt": { name: "Sky Car Stunt", icon: "fas fa-car" },
  "sleepingbeauty": { name: "Sleepingbeauty", icon: "fas fa-bed" },
  "slime-rush-td": { name: "Slime Rush Td", icon: "fas fa-viruses" },
  "slitherio": { name: "Slitherio", icon: "fas fa-ellipsis-h" },
  "slope": { name: "Slope", icon: "fas fa-chart-line" },
  "slope-2": { name: "Slope 2", icon: "fas fa-chart-line" },
  "slope-ball": { name: "Slope Ball", icon: "fas fa-volleyball-ball" },
  "sm64": { name: "Sm64", icon: "fas fa-hat-wizard" },
  "smashkarts": { name: "Smashkarts", icon: "fas fa-shopping-cart" },
  "smokingbarrels": { name: "Smokingbarrels", icon: "fas fa-smoking" },
  "snowbattle": { name: "Snowbattle", icon: "fas fa-snowflake" },
  "snowrider3d": { name: "Snowrider3D", icon: "fas fa-skiing" },
  "soccer-random": { name: "Soccer Random", icon: "fas fa-futbol" },
  "soccer-skills": { name: "Soccer Skills", icon: "fas fa-futbol" },
  "soldier-legend": { name: "Soldier Legend", icon: "fas fa-user-secret" },
  "solitaire": { name: "Solitaire", icon: "fas fa-diamond" },
  "sort-the-court": { name: "Sort The Court", icon: "fas fa-gavel" },
  "soundboard": { name: "Soundboard", icon: "fas fa-volume-up" },
  "space-company": { name: "Space Company", icon: "fas fa-rocket" },
  "spacegarden": { name: "Spacegarden", icon: "fas fa-seedling" },
  "spelunky": { name: "Spelunky", icon: "fas fa-hat-cowboy" },
  "spinningrat": { name: "Spinningrat", icon: "fas fa-mouse" },
  "squaredash": { name: "Squaredash", icon: "fas fa-square" },
  "ssurferbotleg": { name: "Ssurferbotleg", icon: "fas fa-water" },
  "stack": { name: "Stack", icon: "fas fa-layer-group" },
  "stack-bump-3d": { name: "Stack Bump 3D", icon: "fas fa-cube" },
  "starve": { name: "Starve", icon: "fas fa-bone" },
  "station-141": { name: "Station 141", icon: "fas fa-train" },
  "stationmeltdown": { name: "Stationmeltdown", icon: "fas fa-fire" },
  "stealingthediamond": { name: "Stealingthediamond", icon: "fas fa-gem" },
  "stick-archers": { name: "Stick Archers", icon: "fas fa-bullseye" },
  "stick-duel-battle": { name: "Stick Duel Battle", icon: "fas fa-fist-raised" },
  "stick-merge": { name: "Stick Merge", icon: "fas fa-code-branch" },
  "stickman-boost": { name: "Stickman Boost", icon: "fas fa-running" },
  "stickman-golf": { name: "Stickman Golf", icon: "fas fa-golf-ball" },
  "stickman-hook": { name: "Stickman Hook", icon: "fas fa-anchor" },
  "stickman-survival": { name: "Stickman Survival", icon: "fas fa-heartbeat" },
  "stickwar": { name: "Stickwar", icon: "fas fa-chess-knight" },
  "stormthehouse2": { name: "Stormthehouse2", icon: "fas fa-home" },
  "stumble-guys": { name: "Stumble Guys", icon: "fas fa-users" },
  "subway-surfers": { name: "Subway Surfers", icon: "fas fa-subway" },
  "subway-surfers-ny": { name: "Subway Surfers Ny", icon: "fas fa-subway" },
  "suggestions": { name: "Suggestions", icon: "fas fa-lightbulb" },
  "superautopets": { name: "Superautopets", icon: "fas fa-paw" },
  "superfowlist": { name: "Superfowlist", icon: "fas fa-dove" },
  "superhot": { name: "Superhot", icon: "fas fa-fire" },
  "supermarioconstruct": { name: "Supermarioconstruct", icon: "fas fa-hat-wizard" },
  "surviv": { name: "Surviv", icon: "fas fa-crosshairs" },
  "sushi-unroll": { name: "Sushi Unroll", icon: "fas fa-fish" },
  "swarmsimulator": { name: "Swarmsimulator", icon: "fas fa-bug" },
  "swerve": { name: "Swerve", icon: "fas fa-car" },
  "synesthesia": { name: "Synesthesia", icon: "fas fa-brain" },
  "tactical-weapon-pack-2": { name: "Tactical Weapon Pack 2", icon: "fas fa-gun" },
  "tacticalassasin2": { name: "Tacticalassasin2", icon: "fas fa-user-secret" },
  "tank-trouble-2": { name: "Tank Trouble 2", icon: "fas fa-tank" },
  "tanuki-sunset": { name: "Tanuki Sunset", icon: "fas fa-sun" },
  "temple-run-2": { name: "Temple Run 2", icon: "fas fa-running" },
  "the-final-earth": { name: "The Final Earth", icon: "fas fa-globe" },
  "the-final-earth-2": { name: "The Final Earth 2", icon: "fas fa-globe" },
  "the-hotel": { name: "The Hotel", icon: "fas fa-hotel" },
  "thebattle": { name: "Thebattle", icon: "fas fa-chess-knight" },
  "theheist": { name: "Theheist", icon: "fas fa-mask" },
  "there-is-no-game": { name: "There Is No Game", icon: "fas fa-ban" },
  "thisistheonlylevel": { name: "Thisistheonlylevel", icon: "fas fa-level-up-alt" },
  "throwrocks": { name: "Throwrocks", icon: "fas fa-hand-rock" },
  "tiny-fishing": { name: "Tiny Fishing", icon: "fas fa-fish" },
  "tiny-islands": { name: "Tiny Islands", icon: "fas fa-water" },
  "tosstheturtle": { name: "Tosstheturtle", icon: "fas fa-kiwi-bird" },
  "townscaper": { name: "Townscaper", icon: "fas fa-city" },
  "trimps": { name: "Trimps", icon: "fas fa-bug" },
  "tube-jumpers": { name: "Tube Jumpers", icon: "fas fa-swimmer" },
  "tunnel-rush": { name: "Tunnel Rush", icon: "fas fa-tunnel" },
  "tv-static": { name: "Tv Static", icon: "fas fa-tv" },
  "twitch-tetris": { name: "Twitch Tetris", icon: "fas fa-th" },
  "unfairmario": { name: "Unfairmario", icon: "fas fa-hat-wizard" },
  "veloce": { name: "Veloce", icon: "fas fa-car" },
  "vex2": { name: "Vex2", icon: "fas fa-running" },
  "vex3": { name: "Vex3", icon: "fas fa-running" },
  "vex4": { name: "Vex4", icon: "fas fa-running" },
  "vex5": { name: "Vex5", icon: "fas fa-running" },
  "vex6": { name: "Vex6", icon: "fas fa-running" },
  "vex7": { name: "Vex7", icon: "fas fa-running" },
  "volley-random": { name: "Volley Random", icon: "fas fa-volleyball-ball" },
  "wallsmash": { name: "Wallsmash", icon: "fas fa-hammer" },
  "waterworks": { name: "Waterworks", icon: "fas fa-water" },
  "weavesilk": { name: "Weavesilk", icon: "fas fa-spider" },
  "webcleaner": { name: "Webcleaner", icon: "fas fa-broom" },
  "webgl-fluid-simulation": { name: "Webgl Fluid Simulation", icon: "fas fa-water" },
  "webretro": { name: "Webretro", icon: "fas fa-gamepad" },
  "webxash": { name: "Webxash", icon: "fas fa-bomb" },
  "win-the-whitehouse": { name: "Win The Whitehouse", icon: "fas fa-flag-usa" },
  "wolf2d": { name: "Wolf2D", icon: "fas fa-dog" },
  "wolf3d": { name: "Wolf3D", icon: "fas fa-dog" },
  "wordle": { name: "Wordle", icon: "fas fa-font" },
  "worlds-hardest-game": { name: "Worlds Hardest Game", icon: "fas fa-gamepad" },
  "worlds-hardest-game-2": { name: "Worlds Hardest Game 2", icon: "fas fa-gamepad" },
  "wounded-summer-baby-edition": { name: "Wounded Summer Baby Edition", icon: "fas fa-baby" },
  "x-trial-racing": { name: "X Trial Racing", icon: "fas fa-motorcycle" },
  "xx142-b2exe": { name: "Xx142 B2Exe", icon: "fas fa-bug" },
  "yohoho": { name: "Yohoho", icon: "fas fa-skull-crossbones" },
  "yoshifabrication": { name: "Yoshifabrication", icon: "fas fa-egg" },
  "you-are-bezos": { name: "You Are Bezos", icon: "fas fa-dollar-sign" },
  "zigzag": { name: "Zigzag", icon: "fas fa-wave-square" },
  "zombs-royale": { name: "Zombs Royale", icon: "fas fa-bomb" }
};
    
    
    const existingOverlay = document.getElementById('more-menu-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    
    function getSavedGames() {
        try {
            const saved = JSON.parse(localStorage.getItem('savedGames') || '[]');
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    }
    
    
        function launchGame(gameId) {
        
        localStorage.setItem('gameIds', JSON.stringify([gameId]));

        
        if (typeof window !== "undefined") {
            if (!window.gameStorage) window.gameStorage = {};
            window.gameStorage.selectedGame = gameId;
        }

        console.log('Stored gameIds in localStorage:', JSON.stringify([gameId]));
        console.log('Set window.gameStorage.selectedGame:', gameId);
        console.log('Navigating to game.html...');
        window.location.href = 'game.html';
    }
    
    
    const overlay = document.createElement('div');
    overlay.id = 'more-menu-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        animation: fadeIn 0.3s ease-out;
    `;
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .saved-game-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-radius: 25px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(150, 243, 245, 0.1);
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s ease;
            cursor: pointer;
            min-width: 380px;
            margin: 6px 0;
            position: relative;
            overflow: hidden;
        }
        .saved-game-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(150, 243, 245, 0.1), transparent);
            transition: left 0.5s ease;
        }
        .saved-game-item:hover::before {
            left: 100%;
        }
        .saved-game-item:hover {
            color: #4bf9ed;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(75, 249, 237, 0.4);
            box-shadow: 
                0 4px 20px rgba(0, 0, 0, 0.3),
                0 0 15px rgba(75, 249, 237, 0.2);
            backdrop-filter: blur(8px);
            transform: translateY(-2px) scale(1.02);
        }
        .game-info {
            display: flex;
            align-items: center;
            flex: 1;
        }
        .game-icon {
            color: #4bf9ed;
            margin-right: 16px;
            font-size: 18px;
            width: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .remove-game {
            color: #ff6b6b;
            font-size: 16px;
            margin-left: 12px;
            opacity: 0.6;
            transition: all 0.3s ease;
            padding: 8px;
            border-radius: 50%;
            background: rgba(255, 107, 107, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
        }
        .remove-game:hover {
            opacity: 1;
            transform: scale(1.1) rotate(90deg);
            background: rgba(255, 107, 107, 0.2);
            box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
        }
        .no-saved-games {
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
            text-align: center;
            padding: 40px 30px;
            line-height: 1.6;
            font-size: 16px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            border: 1px solid rgba(150, 243, 245, 0.1);
        }
        .games-container {
            max-height: 70vh;
            overflow-y: auto;
            padding-right: 12px;
            margin-right: -12px;
            width: 100%;
        }
        .games-container::-webkit-scrollbar {
            width: 8px;
        }
        .games-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        .games-container::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #4bf9ed, #96f3f5);
            border-radius: 4px;
            box-shadow: 0 0 5px rgba(75, 249, 237, 0.3);
        }
        .games-container::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #96f3f5, #4bf9ed);
            box-shadow: 0 0 10px rgba(75, 249, 237, 0.5);
        }
    `;
    document.head.appendChild(style);
    
    
    const menu = document.createElement('div');
    menu.style.cssText = `
        background: rgba(0, 0, 0, 0.75);
        border-radius: 35px;
        padding: 32px 40px;
        box-shadow:
            0 0 15px rgba(75, 249, 237, 0.6),
            0 0 30px rgba(75, 249, 237, 0.4),
            0 0 45px rgba(75, 249, 237, 0.2),
            0 0 60px rgba(75, 249, 237, 0.1),
            0 0 25px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(15px);
        color: white;
        user-select: none;
        animation: slideIn 0.3s ease-out;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        min-width: 450px;
        max-width: 550px;
        border: 1px solid rgba(75, 249, 237, 0.2);
    `;
    
    
    const savedGames = getSavedGames();
    
    
    let savedGamesHTML = '';
    if (savedGames.length > 0) {
        savedGamesHTML = `
            <div style="
                font-size: 20px;
                font-weight: bold;
                color: #96f3f5;
                margin-bottom: 8px;
                text-align: center;
            ">Saved Games</div>
            
            <div class="games-container">
        `;
        
        savedGames.forEach(gameId => {
            const game = gameData[gameId];
            if (game) {
                savedGamesHTML += `
                    <div class="saved-game-item" data-game-id="${gameId}">
                        <div class="game-info">
                            <i class="${game.icon} game-icon"></i>
                            <span>${game.name}</span>
                        </div>
                        <i class="fas fa-times remove-game" data-remove-game="${gameId}"></i>
                    </div>
                `;
            }
        });
        
        savedGamesHTML += `</div>`;
    } else {
        savedGamesHTML = `
            <div style="
                font-size: 24px;
                font-weight: bold;
                color: #4bf9ed;
                margin-bottom: 16px;
                text-align: center;
                text-shadow: 0 0 10px rgba(75, 249, 237, 0.5);
            "><i class="fas fa-heart-broken"></i> No Saved Games</div>

            <div class="no-saved-games">
                No saved games yet.<br>
                Click the ♥ on any game to save it here for quick access!
            </div>
        `;
    }
    
    
    menu.innerHTML = `
        ${savedGamesHTML}
        
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(75, 249, 237, 0.3);">
            <button id="closeMoreMenu" style="
                background: linear-gradient(45deg, rgba(75, 249, 237, 0.1), rgba(150, 243, 245, 0.1));
                border: 1px solid rgba(75, 249, 237, 0.4);
                color: #4bf9ed;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                font-family: inherit;
                text-shadow: 0 0 5px rgba(75, 249, 237, 0.3);
                box-shadow: 0 0 10px rgba(75, 249, 237, 0.1);
            ">
                <i class="fas fa-times" style="margin-right: 8px;"></i>
                Close
            </button>
        </div>
    `;
    
    
    menu.querySelectorAll('.saved-game-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const gameId = item.getAttribute('data-game-id');
            if (gameId) {
                console.log('Launching game:', gameId);
                launchGame(gameId);
            }
        });
    });
    
    
    menu.querySelectorAll('.remove-game').forEach(removeBtn => {
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const gameId = removeBtn.getAttribute('data-remove-game');
            if (gameId) {
                
                const savedGames = getSavedGames();
                const index = savedGames.indexOf(gameId);
                if (index > -1) {
                    savedGames.splice(index, 1);
                    localStorage.setItem('savedGames', JSON.stringify(savedGames));
                    console.log('Removed game from saved:', gameId);
                    
                    
                    const gameItem = removeBtn.closest('.saved-game-item');
                    gameItem.style.animation = 'fadeIn 0.2s ease-out reverse';
                    setTimeout(() => {
                        gameItem.remove();
                        
                        
                        const remainingGames = menu.querySelectorAll('.saved-game-item');
                        if (remainingGames.length === 0) {
                            
                            closeMenu();
                            setTimeout(() => {
                                
                                const script = document.createElement('script');
                                script.textContent = `(${arguments.callee.toString()})();`;
                                document.head.appendChild(script);
                                script.remove();
                            }, 300);
                        }
                    }, 200);
                }
            }
        });
    });
    
    
    const closeBtn = menu.querySelector('#closeMoreMenu');
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'linear-gradient(45deg, rgba(75, 249, 237, 0.2), rgba(150, 243, 245, 0.2))';
        closeBtn.style.transform = 'translateY(-2px) scale(1.05)';
        closeBtn.style.boxShadow = '0 4px 20px rgba(75, 249, 237, 0.3)';
        closeBtn.style.textShadow = '0 0 10px rgba(75, 249, 237, 0.6)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'linear-gradient(45deg, rgba(75, 249, 237, 0.1), rgba(150, 243, 245, 0.1))';
        closeBtn.style.transform = 'translateY(0) scale(1)';
        closeBtn.style.boxShadow = '0 0 10px rgba(75, 249, 237, 0.1)';
        closeBtn.style.textShadow = '0 0 5px rgba(75, 249, 237, 0.3)';
    });
    
    
    function closeMenu() {
        overlay.style.animation = 'fadeIn 0.2s ease-out reverse';
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 200);
    }
    
    
    closeBtn.addEventListener('click', closeMenu);
    
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeMenu();
        }
    });
    
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeMenu();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    
    overlay.appendChild(menu);
    document.body.appendChild(overlay);
    
})();