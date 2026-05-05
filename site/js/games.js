const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

const games = [
    { id: '10-minutes-till-dawn', name: '10 Minutes Till Dawn', encoded: '10 Plqxwhv Wloo Gdzq' },
    { id: '2048', name: '2048', encoded: '2048' },
    { id: '2048-cupcakes', name: '2048 Cupcakes', encoded: '2048 Fxsfdnhv' },
    { id: '9007199254740992', name: '9007199254740992', encoded: '9007199254740992' },
    { id: '99-balls', name: '99 Balls', encoded: '99 Edoov' },
    { id: '1', name: '1', encoded: '1' },
    { id: 'a-small-world-cup', name: 'A Small World Cup', encoded: 'D Vpdoo Zruog Fxs' },
    { id: 'achievement-unlocked', name: 'Achievement Unlocked', encoded: 'Dfklhyhphqw Xqorfnhg' },
    { id: 'animal-crossing-wild-world', name: 'Animal Crossing: Wild World', encoded: 'Dqlpdo Furvvlqj: Zlog Zruog' },
    { id: 'aqua-park-io', name: 'Aqua Park.io', encoded: 'Dtxd Sdun.lr' },
    { id: 'backrooms-2d', name: 'Backrooms 2D', encoded: 'Edfnurrpv 2G' },
    { id: 'backrooms-3d', name: 'Backrooms 3D', encoded: 'Edfnurrpv 3G' },
    { id: 'bacon-may-die', name: 'Bacon May Die', encoded: 'Edfrq Pdb Glh' },
    { id: 'bad-icecream', name: 'Bad Ice Cream', encoded: 'Edg Lfh Fuhdp' },
    { id: 'bad-icecream-2', name: 'Bad Ice Cream 2', encoded: 'Edg Lfh Fuhdp 2' },
    { id: 'bad-icecream-3', name: 'Bad Ice Cream 3', encoded: 'Edg Lfh Fuhdp 3' },
    { id: 'bad-parenting', name: 'Bad Parenting', encoded: 'Edg Sduhqwlqj' },
    { id: 'bad-piggies', name: 'Bad Piggies', encoded: 'Edg Sljjlhv' },
    { id: 'baldis-basics', name: 'Baldis Basics', encoded: 'Edoglv Edvlfv' },
    { id: 'ball-maze', name: 'Ball Maze', encoded: 'Edoo Pdch' },
    { id: 'basket-random', name: 'Basket Random', encoded: 'Edvnhw Udqgrp' },
    { id: 'basketball-legends', name: 'Basketball Legends', encoded: 'Edvnhwedoo Ohjhqgv' },
    { id: 'basketball-stars', name: 'Basketball Stars', encoded: 'Edvnhwedoo Vwduv' },
    { id: 'battle-karts', name: 'Battle Karts', encoded: 'Edwwoh Nduwv' },
    { id: 'big-flappy-tower-tiny-square', name: 'Big Flappy Tower Tiny Square', encoded: 'Elj Iodssb Wrzhu Wlqb Vtxduh' },
    { id: 'big-ice-tower-tiny-square', name: 'Big Ice Tower Tiny Square', encoded: 'Elj Lfh Wrzhu Wlqb Vtxduh' },
    { id: 'big-neon-tower-tiny-square', name: 'Big Neon Tower Tiny Square', encoded: 'Elj Qhrq Wrzhu Wlqb Vtxduh' },
    { id: 'big-tower-tiny-square-2', name: 'Big Tower Tiny Square 2', encoded: 'Elj Wrzhu Wlqb Vtxduh 2' },
    { id: 'bitlife', name: 'Bitlife', encoded: 'Elwolih' },
    { id: 'block-blast', name: 'Block Blast', encoded: 'Eorfn Eodvw' },
    { id: 'block-blast-2', name: 'Block Blast 2', encoded: 'Eorfn Eodvw 2' },
    { id: 'blood-money', name: 'Blood Money', encoded: 'Eorrg Prqhb' },
    { id: 'bloxorz', name: 'Bloxorz', encoded: 'Eoraruc' },
    { id: 'brawl-stars', name: 'Brawl Stars', encoded: 'Eudzo Vwduv' },
    { id: 'btts', name: 'Big Tower Tiny Square', encoded: 'Elj Wrzhu Wlqb Vtxduh' },
    { id: 'buckshot-roulette', name: 'Buckshot Roulette', encoded: 'Exfnvkrw Urxohwwh' },
    { id: 'burrito-bison-launch-alibre', name: 'Burrito Bison Launcha Libre', encoded: 'Exuulwr Elvrq Odxqfkd Oleuh' },
    { id: 'celeste', name: 'Celeste', encoded: 'Fhohvwh' },
    { id: 'celeste-2', name: 'Celeste 2', encoded: 'Fhohvwh 2' },
    { id: 'cluster-rush', name: 'Cluster Rush', encoded: 'Foxvwhu Uxvk' },
    { id: 'cookie-clicker', name: 'Cookie Clicker', encoded: 'Frrnlh Folfnhu' },
    { id: 'core-ball', name: 'Core Ball', encoded: 'Fruh Edoo' },
    { id: 'crazy-cars', name: 'Crazy Cars', encoded: 'Fudcb Fduv' },
    { id: 'crazy-cattle-3d', name: 'Crazy Cattle 3D', encoded: 'Fudcb Fdwwoh 3G' },
    { id: 'crossy-road', name: 'Crossy Road', encoded: 'Furvvb Urdg' },
    { id: 'deltarune', name: 'Deltarune', encoded: 'Ghowduxqh' },
    { id: 'drift-boss', name: 'Drift Boss', encoded: 'Guliw Ervv' },
    { id: 'drive-mad', name: 'Drive Mad', encoded: 'Gulyh Pdg' },
    { id: 'duck-life', name: 'Duck Life', encoded: 'Gxfn Olih' },
    { id: 'duck-life-2', name: 'Duck Life 2', encoded: 'Gxfn Olih 2' },
    { id: 'duck-life-3', name: 'Duck Life 3', encoded: 'Gxfn Olih 3' },
    { id: 'ducklife3', name: 'Duck Life 3', encoded: 'Gxfn Olih 3' },
    { id: 'ducklife4', name: 'Duck Life 4', encoded: 'Gxfn Olih 4' },
    { id: 'eggy-car', name: 'Eggy Car', encoded: 'Hjjb Fdu' },
    { id: 'fire-boy-and-water-girl', name: 'Fireboy and Watergirl', encoded: 'Iluherb dqg Zdwhujluo' },
    { id: 'flappy-bird', name: 'Flappy Bird', encoded: 'Iodssb Elug' },
    { id: 'fnaf', name: 'Five Nights at Freddy\'s', encoded: 'Ilyh Qljkwv dw Iuhggb\'v' },
    { id: 'fnaf-2', name: 'Five Nights at Freddy\'s 2', encoded: 'Ilyh Qljkwv dw Iuhggb\'v 2' },
    { id: 'fnaf-3', name: 'Five Nights at Freddy\'s 3', encoded: 'Ilyh Qljkwv dw Iuhggb\'v 3' },
    { id: 'fnaw', name: 'Five Nights at Winston\'s', encoded: 'Ilyh Qljkwv dw Zlqvwrq\'v' },
    { id: 'free-rider', name: 'Free Rider', encoded: 'Iuhh Ulghu' },
    { id: 'funny-shooter', name: 'Funny Shooter', encoded: 'Ixqqb Vkrrwhu' },
    { id: 'funny-shooter-2', name: 'Funny Shooter 2', encoded: 'Ixqqb Vkrrwhu 2' },
    { id: 'geometry-dash-3d', name: 'Geometry Dash 3D', encoded: 'Jhrphwub Gdvk 3G' },
    { id: 'getaway-shootout', name: 'Getaway Shootout', encoded: 'Jhwdzdb Vkrrwrxw' },
    { id: 'granny', name: 'Granny', encoded: 'Judqqb' },
    { id: 'grow-a-garden', name: 'Grow a Garden', encoded: 'Jurz d Jdughq' },
    { id: 'gta-2', name: 'GTA 2', encoded: 'JWD 2' },
    { id: 'happy-wheels', name: 'Happy Wheels', encoded: 'Kdssb Zkhhov' },
    { id: 'hextris', name: 'Hextris', encoded: 'Khawulv' },
    { id: 'learn-to-fly', name: 'Learn to Fly', encoded: 'Ohduq wr Iob' },
    { id: 'learn-to-fly-2', name: 'Learn To Fly 2', encoded: 'Ohduq Wr Iob 2' },
    { id: 'learn-to-fly-3', name: 'Learn to Fly 3', encoded: 'Ohduq wr Iob 3' },
    { id: 'madalin-stunt-cars-2', name: 'Madalin Stunt Cars 2', encoded: 'Pdgdolq Vwxqw Fduv 2' },
    { id: 'madalin-stunt-cars-3', name: 'Madalin Stunt Cars 3', encoded: 'Pdgdolq Vwxqw Fduv 3' },
    { id: 'minecraft-1.5.2', name: 'Minecraft 1.5.2', encoded: 'Plqhfudiw 1.5.2' },
    { id: 'minecraft-indev', name: 'Minecraft Indev', encoded: 'Plqhfudiw Lqghy' },
    { id: 'minecraft-parkour', name: 'Minecraft Parkour', encoded: 'Plqhfudiw Sdunrxu' },
    { id: 'minecraft-tower-defence', name: 'Minecraft Tower Defence', encoded: 'Plqhfudiw Wrzhu Ghihqfh' },
    { id: 'minecraft-zeta-client', name: 'Minecraft Zeta Client', encoded: 'Plqhfudiw Chwd Folhqw' },
    { id: 'monkey-mart', name: 'Monkey Mart', encoded: 'Prqnhb Pduw' },
    { id: 'motox3m', name: 'Moto X3M', encoded: 'Prwr A3P' },
    { id: 'motox3m-2', name: 'Moto X3M 2', encoded: 'Prwr A3P 2' },
    { id: 'motox3m-3', name: 'Moto X3M 3', encoded: 'Prwr A3P 3' },
    { id: 'motox3m-pool', name: 'Motox 3M Pool Party', encoded: 'Prwra 3P Srro Sduwb' },
    { id: 'motox3m-spooky', name: 'Motox 3M Spooky Edition', encoded: 'Prwra 3P Vsrrnb Hglwlrq' },
    { id: 'motox3m-spookyland', name: 'Moto X3M Spooky Land', encoded: 'Prwr A3P Vsrrnb Odqg' },
    { id: 'motox3m-winter', name: 'Moto X3M Winter', encoded: 'Prwr A3P Zlqwhu' },
    { id: 'plants-vs-zombies', name: 'Plants vs Zombies', encoded: 'Sodqwv yv Crpelhv' },
    { id: 'resent-client', name: 'Resent Client', encoded: 'Uhvhqw Folhqw' },
    { id: 'retro-bowl', name: 'Retro Bowl', encoded: 'Uhwur Erzo' },
    { id: 'rooftop-snipers', name: 'Rooftop Snipers', encoded: 'Urriwrs Vqlshuv' },
    { id: 'run-3', name: 'Run 3', encoded: 'Uxq 3' },
    { id: 'scrap-metal', name: 'Scrap Metal', encoded: 'Vfuds Phwdo' },
    { id: 'short-life', name: 'Short Life', encoded: 'Vkruw Olih' },
    { id: 'slither-io', name: 'Slither.io', encoded: 'Volwkhu.lr' },
    { id: 'slope', name: 'Slope', encoded: 'Vorsh' },
    { id: 'slope-2', name: 'Slope 2', encoded: 'Vorsh 2' },
    { id: 'slope-3', name: 'Slope 3', encoded: 'Vorsh 3' },
    { id: 'slope-ball', name: 'Slope Ball', encoded: 'Vorsh Edoo' },
    { id: 'slow-roads', name: 'Slow Roads', encoded: 'Vorz Urdgv' },
    { id: 'snow-rider-3d', name: 'Snow Rider 3D', encoded: 'Vqrz Ulghu 3G' },
    { id: 'soccer-random', name: 'Soccer Random', encoded: 'Vrffhu Udqgrp' },
    { id: 'stickman-hook', name: 'Stickman Hook', encoded: 'Vwlfnpdq Krrn' },
    { id: 'subway-surfers', name: 'Subway Surfers', encoded: 'Vxezdb Vxuihuv' },
    { id: 'super-hot', name: 'Superhot', encoded: 'Vxshukrw' },
    { id: 'tanuki-sunset', name: 'Tanuki Sunset', encoded: 'Wdqxnl Vxqvhw' },
    { id: 'the-binding-of-isaac', name: 'The Binding of Isaac', encoded: 'Wkh Elqglqj ri Lvddf' },
    { id: 'the-legend-of-zelda-the-minish-cap', name: 'The Legend of Zelda: The Minish Cap', encoded: 'Wkh Ohjhqg ri Chogd: Wkh Plqlvk Fds' },
    { id: 'the-worlds-hardest-game', name: 'The World\'s Hardest Game', encoded: 'Wkh Zruog\'v Kdughvw Jdph' },
    { id: 'tiny-fishing', name: 'Tiny Fishing', encoded: 'Wlqb Ilvklqj' },
    { id: 'tunnel-rush', name: 'Tunnel Rush', encoded: 'Wxqqho Uxvk' },
    { id: 'ultrakill', name: 'ULTRAKILL', encoded: 'XOWUDNLOO' },
    { id: 'vex', name: 'Vex', encoded: 'Yha' },
    { id: 'vex-2', name: 'Vex 2', encoded: 'Yha 2' },
    { id: 'vex-3', name: 'Vex 3', encoded: 'Yha 3' },
    { id: 'vex-4', name: 'Vex 4', encoded: 'Yha 4' },
    { id: 'vex-5', name: 'Vex 5', encoded: 'Yha 5' },
    { id: 'vex-6', name: 'Vex 6', encoded: 'Yha 6' },
    { id: 'vex-7', name: 'Vex 7', encoded: 'Yha 7' },
    { id: 'vex-8', name: 'Vex 8', encoded: 'Yha 8' },
    { id: 'volley-random', name: 'Volley Random', encoded: 'Yroohb Udqgrp' },
    { id: 'word-wonders', name: 'Word Wonders', encoded: 'Zrug Zrqghuv' },
    { id: 'wordle', name: 'Wordle', encoded: 'Zrugoh' },
    { id: 'worlds-hardest-game', name: 'Worlds Hardest Game', encoded: 'Zruogv Kdughvw Jdph' },
    { id: 'worlds-hardest-game-2', name: 'Worlds Hardest Game 2', encoded: 'Zruogv Kdughvw Jdph 2' },
    { id: 'yohoho-io', name: 'YoHoHo.io', encoded: 'BrKrKr.lr' },
    { id: 'you-vs-100-skibidi-toilets', name: 'You vs 100 Skibidi Toilets', encoded: 'Brx yv 100 Vnlelgl Wrlohwv' },
    { id: 'zombocalypse-2', name: 'Zombocalypse 2', encoded: 'Crperfdobsvh 2' },
    { id: '2048-multitask', name: '2048 Multitask', encoded: '2048 Pxowlwdvn' },
    { id: 'a-dance-of-fire-and-ice', name: 'A Dance of Fire and Ice', encoded: 'D Gdqfh ri Iluh dqg Lfh' },
    { id: 'a-dark-room', name: 'A Dark Room', encoded: 'D Gdun Urrp' },
    { id: 'adrenaline-challenge', name: 'Adrenaline Challenge', encoded: 'Dguhqdolqh Fkdoohqjh' },
    { id: 'adventure-drivers', name: 'Adventure Drivers', encoded: 'Dgyhqwxuh Gulyhuv' },
    { id: 'ages-of-conflict', name: 'Ages of Conflict', encoded: 'Djhv ri Frqiolfw' },
    { id: 'boxing-random', name: 'Boxing Random', encoded: 'Eralqj Udqgrp' },
    { id: 'creative-kill-chamber', name: 'Creative Kill Chamber', encoded: 'Fuhdwlyh Nloo Fkdpehu' },
    { id: 'cupcake-2048', name: 'Cupcake 2048', encoded: 'Fxsfdnh 2048' },
    { id: 'dante', name: 'Dante', encoded: 'Gdqwh' },
    { id: 'deal-or-no-deal', name: 'Deal or No Deal', encoded: 'Ghdo ru Qr Ghdo' },
    { id: 'death-run-3d', name: 'Death Run 3D', encoded: 'Ghdwk Uxq 3G' },
    { id: 'drift-hunters', name: 'Drift Hunters', encoded: 'Guliw Kxqwhuv' },
    { id: 'fnaw', name: 'Five Nights at Winstons', encoded: 'Ilyh Qljkwv dw Zlqvwrqv' },
    { id: '9007199254740992', name: '9007199254740992', encoded: '9007199254740992' },
];

games.sort((a, b) => a.name.localeCompare(b.name));

function renderGames(gamesToRender) {
    const container = document.getElementById('games-container');
    const noResults = document.getElementById('no-results');
    
    container.innerHTML = '';
    
    if (gamesToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    gamesToRender.forEach(game => {
        const gameBox = document.createElement('div');
        gameBox.className = 'game-box';
        gameBox.setAttribute('data-id', game.id);
        
        gameBox.innerHTML = `
            <div class="glass-filter"></div>
            <div class="glass-overlay"></div>
            <div class="glass-specular"></div>
            <div class="glass-content">
                <img src="images/game_icons/${game.id}.png" alt="${game.name}">
                <div class="game-info">
                    <h3 class="game-title">${game.name}</h3>
                </div>
            </div>
        `;

        gameBox.addEventListener('click', async () => {
            await trackGameClick(game.name);
            window.location.href = `games/${game.id}.html`;
        });
        container.appendChild(gameBox);
    });
}

const searchInput = document.getElementById('game-search');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderGames(games);
        return;
    }
    
    const filteredGames = games.filter(game => {
        return game.name.toLowerCase().includes(searchTerm) ||
               game.id.toLowerCase().includes(searchTerm);
    });
    
    renderGames(filteredGames);
});

renderGames(games);

document.addEventListener('DOMContentLoaded', () => {
    const gamesGrid = document.querySelector('.games-grid');
    if (!gamesGrid) return;

    setTimeout(() => {
        const gameBoxes = gamesGrid.querySelectorAll('.game-box');
        if (gameBoxes.length === 0) return;

        let currentRowY = -1;
        let rowCount = 0;

        gameBoxes.forEach(box => {
            const rect = box.getBoundingClientRect();
            const boxY = rect.top;

            if (boxY > currentRowY + 5) {
                rowCount++;
                currentRowY = boxY; 
            }

            box.style.setProperty('--row-delay-multiplier', rowCount - 1);
        });
        
    }, 5);
});

let firebaseApp;
let db;

async function loadFirebaseConfig() {
    try {
        console.log('Fetching Firebase config from:', FIREBASE_CONFIG_URL);
        
        const res = await fetch(FIREBASE_CONFIG_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'craftedgamz-firebase'
            }
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Firebase config fetch failed:', res.status, errorText);
            throw new Error(`Failed to fetch Firebase config: ${res.status}`);
        }
        
        const config = await res.json();
        console.log('Firebase config loaded successfully');
        return config;
    } catch (error) {
        console.error('Error loading Firebase config:', error);
        throw error;
    }
}

async function initializeFirebase() {
    try {
        const firebaseConfig = await loadFirebaseConfig();
        
        if (firebase.apps.length === 0) {
            firebaseApp = firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Firebase:', error);
    }
}

async function trackGameClick(gameName) {
    if (!db || !gameName) return;
    
    try {
        console.log(`Tracking click for game: ${gameName}`);
        
        const gameDoc = db.collection("gameCounts").doc(gameName);
        const docSnapshot = await gameDoc.get();
        
        if (docSnapshot.exists) {
            const currentCount = docSnapshot.data().count || 0;
            await gameDoc.update({ 
                count: currentCount + 1,
                lastClicked: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Updated count for ${gameName}: ${currentCount + 1}`);
        } else {
            await gameDoc.set({ 
                count: 1,
                lastClicked: firebase.firestore.FieldValue.serverTimestamp(),
                gameName: gameName
            });
            console.log(`Created new count for ${gameName}: 1`);
        }
    } catch (error) {
        console.error("Failed to update game count:", error);
    }
}

initializeFirebase();