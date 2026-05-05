const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

const games = [
    { id: 'soccer-random', name: 'Soccer Random', encoded: 'Vrffhu Udqgrp' },
    { id: '10-minutes-till-dawn', name: '10 Minutes Till Dawn', encoded: '10 Plqxwhv Wloo Gdzq' },
    { id: '2048', name: '2048', encoded: '2048' },
    { id: 'backrooms', name: 'Backrooms', encoded: 'Edfnurrpv' },
    { id: 'backrooms-2d', name: 'Backrooms 2D', encoded: 'Edfnurrpv 2G' },
    { id: 'bacon-may-die', name: 'Bacon May Die', encoded: 'Edfrq Pdb Glh' },
    { id: 'bad-ice-cream-2', name: 'Bad Ice Cream 2', encoded: 'Edg Lfh Fuhdp 2' },
    { id: 'bad-ice-cream-3', name: 'Bad Ice Cream 3', encoded: 'Edg Lfh Fuhdp 3' },
    { id: 'bad-ice-cream', name: 'Bad Ice Cream', encoded: 'Edg Lfh Fuhdp' },
    { id: 'baldis-basics', name: 'Baldis Basics', encoded: 'Edoglv Edvlfv' },
    { id: 'basket-random', name: 'Basket Random', encoded: 'Edvnhw Udqgrp' },
    { id: 'bitlife', name: 'Bitlife', encoded: 'Elwolih' },
    { id: 'btts', name: 'Big Tower Tiny Square', encoded: 'Elj Wrzhu Wlqb Vtxduh' },
    { id: 'cluster-rush', name: 'Cluster Rush', encoded: 'Foxvwhu Uxvk' },
    { id: 'death-run-3d', name: 'Death Run 3D', encoded: 'Ghdwk Uxq 3G' },
    { id: 'drift-boss', name: 'Drift Boss', encoded: 'Guliw Ervv' },
    { id: 'drift-hunters', name: 'Drift Hunters', encoded: 'Guliw Kxqwhuv' },
    { id: 'drive-mad', name: 'Drive Mad', encoded: 'Gulyh Pdg' },
    { id: 'ducklife3', name: 'Duck Life 3', encoded: 'Gxfn Olih 3' },
    { id: 'ducklife4', name: 'Duck Life 4', encoded: 'Gxfn Olih 4' },
    { id: 'getaway-shootout', name: 'Getaway Shootout', encoded: 'Jhwdzdb Vkrrwrxw' },
    { id: 'learn-to-fly-2', name: 'Learn To Fly 2', encoded: 'Ohduq Wr Iob 2' },
    { id: 'madalin-stunt-cars-2', name: 'Madalin Stunt Cars 2', encoded: 'Pdgdolq Vwxqw Fduv 2' },
    { id: 'madalin-stunt-cars-3', name: 'Madalin Stunt Cars 3', encoded: 'Pdgdolq Vwxqw Fduv 3' },
    { id: 'motox3m-pool', name: 'Motox 3M Pool Party', encoded: 'Prwra 3P Srro Sduwb' },
    { id: 'motox3m-spooky', name: 'Motox 3M Spooky Edition', encoded: 'Prwra 3P Vsrrnb Hglwlrq' },
    { id: 'motox3m-winter', name: 'Motox 3M Winter Edition', encoded: 'Prwra 3P Zlqwhu Hglwlrq' },
    { id: 'motox3m', name: 'Motox 3M', encoded: 'Prwra 3P' },
    { id: 'motox3m-2', name: 'Motox 3M 2', encoded: 'Prwra 3P 2' },
    { id: 'retro-bowl', name: 'Retro Bowl', encoded: 'Uhwur Erzo' },
    { id: 'rooftop-snipers', name: 'Rooftop Snipers', encoded: 'Urriwrs Vqlshuv' },
    { id: 'run-3', name: 'Run 3', encoded: 'Uxq 3' },
    { id: 'scrap-metal', name: 'Scrap Metal', encoded: 'Vfuds Phwdo' },
    { id: 'slope', name: 'Slope', encoded: 'Vorsh' },
    { id: 'slope-2', name: 'Slope 2', encoded: 'Vorsh 2' },
    { id: 'slope-ball', name: 'Slope Ball', encoded: 'Vorsh Preloh' },
    { id: 'snow-rider-3d', name: 'Snow Rider 3D', encoded: 'Vqrz Ulghu 3G' },
    { id: '2048-multitask', name: '2048 Multitask', encoded: '2048 Pxowlwdvn' },
    { id: '9007199254740992', name: '9007199254740992', encoded: '9007199254740992' },
    { id: 'a-dance-of-fire-and-ice', name: 'A Dance of Fire and Ice', encoded: 'D Gdqfh ri Iluh dqg Lfh' },
    { id: 'a-dark-room', name: 'A Dark Room', encoded: 'D Gdun Urrp' },
    { id: 'adrenaline-challenge', name: 'Adrenaline Challenge', encoded: 'Dguhqdolqh Fkdoohqjh' },
    { id: 'adventure-drivers', name: 'Adventure Drivers', encoded: 'Dgyhqwxuh Gulyhuv' },
    { id: 'ages-of-conflict', name: 'Ages of Conflict', encoded: 'Djhv ri Frqiolfw' },
    { id: 'boxing-random', name: 'Boxing Random', encoded: 'Eralqj Udqgrp' },
    { id: 'core-ball', name: 'Core Ball', encoded: 'Fruh Edoo' },
    { id: 'creative-kill-chamber', name: 'Creative Kill Chamber', encoded: 'Fuhdwlyh Nloo Fkdpehu' },
    { id: 'crossy-road', name: 'Crossy Road', encoded: 'Furvvb Urdg' },
    { id: 'cupcake-2048', name: 'Cupcake 2048', encoded: 'Fxsfdnh 2048' },
    { id: 'dante', name: 'Dante', encoded: 'Gdqwh' },
    { id: 'deal-or-no-deal', name: 'Deal or No Deal', encoded: 'Ghdo ru Qr Ghdo' },
    { id: 'eggy-car', name: 'Eggy Car', encoded: 'Hjjb Fdu' },
    { id: 'fnaw', name: 'Five Nights at Winstons', encoded: 'Ilyh Qljkwv dw Zlqvwrqv' },
    { id: 'learn-to-fly', name: 'Learn to Fly', encoded: 'Ohduq wr Iob' },
    { id: 'monkey-mart', name: 'Monkey Mart', encoded: 'Prqnhb Pduw' },
    { id: 'resent-client', name: 'Resent Client', encoded: 'Uhvhqw Folhqw' },
    { id: 'stickman-hook', name: 'Stickman Hook', encoded: 'Vwlfnpdq Krrn' },
    { id: 'super-hot', name: 'Superhot', encoded: 'Vxshukrw' },
    { id: 'tanuki-sunset', name: 'Tanuki Sunset', encoded: 'Wdqxnl Vxqvhw' },
    { id: 'tunnel-rush', name: 'Tunnel Rush', encoded: 'Wxqqho Uxvk' },
    { id: 'vex-3', name: 'Vex 3', encoded: 'Yha 3' },
    { id: 'vex-4', name: 'Vex 4', encoded: 'Yha 4' },
    { id: 'vex-5', name: 'Vex 5', encoded: 'Yha 5' },
    { id: 'vex-6', name: 'Vex 6', encoded: 'Yha 6' },
    { id: 'vex-7', name: 'Vex 7', encoded: 'Yha 7' },
    { id: 'volley-random', name: 'Volley Random', encoded: 'Yroohb Udqgrp' },
    { id: 'worlds-hardest-game', name: 'Worlds Hardest Game', encoded: 'Zruogv Kdughvw Jdph' },
    { id: 'worlds-hardest-game-2', name: 'Worlds Hardest Game 2', encoded: 'Zruogv Kdughvw Jdph 2' },
    { id: 'funny-shooter', name: 'Funny Shooter', encoded: 'Ixqqb Vkrrwhu' },
    { id: 'funny-shooter-2', name: 'Funny Shooter 2', encoded: 'Ixqqb Vkrrwhu 2' },
    { id: 'ultrakill', name: 'ULTRAKILL', encoded: 'XOWUDNLOO' },
    { id: 'buckshot-roulette', name: 'Buckshot Roulette', encoded: 'Exfnvkrw Urxohwwh' }
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