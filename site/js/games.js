const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

const games = [
{ id: '10-minutes-till-dawn', name: '10 Minutes Till Dawn'},
{ id: '2048-cupcakes', name: '2048 Cupcakes'},
{ id: '9007199254740992', name: '9007199254740992'},
{ id: '99-balls', name: '99 Balls'},
{ id: 'a-small-world-cup', name: 'A Small World Cup'},
{ id: 'achievement-unlocked', name: 'Achievement Unlocked'},
{ id: 'animal-crossing-wild-world', name: 'Animal Crossing: Wild World'},
{ id: 'aqua-park-io', name: 'Aqua Park.io'},
{ id: 'backrooms-2d', name: 'Backrooms 2D'},
{ id: 'backrooms-3d', name: 'Backrooms 3D'},
{ id: 'bacon-may-die', name: 'Bacon May Die'},
{ id: 'bad-icecream-2', name: 'Bad Ice Cream 2'},
{ id: 'bad-icecream-3', name: 'Bad Ice Cream 3'},
{ id: 'bad-icecream', name: 'Bad Ice Cream'},
{ id: 'bad-parenting', name: 'Bad Parenting'},
{ id: 'bad-piggies', name: 'Bad Piggies'},
{ id: 'baldis-basics', name: "Baldi's Basics"},
{ id: 'ball-maze', name: 'Ball Maze'},
{ id: 'basket-random', name: 'Basket Random'},
{ id: 'basketball-legends', name: 'Basketball Legends'},
{ id: 'basketball-stars', name: 'Basketball Stars'},
{ id: 'battle-karts', name: 'Battle Karts'},
{ id: 'big-flappy-tower-tiny-square', name: 'Big Flappy Tower Tiny Square'},
{ id: 'big-ice-tower-tiny-square', name: 'Big Ice Tower Tiny Square'},
{ id: 'big-neon-tower-tiny-square', name: 'Big Neon Tower Tiny Square'},
{ id: 'big-tower-tiny-square-2', name: 'Big Tower Tiny Square 2'},
{ id: 'block-blast-2', name: 'Block Blast 2'},
{ id: 'block-blast', name: 'Block Blast'},
{ id: 'blood-money', name: 'Blood Money'},
{ id: 'bloxorz', name: 'Bloxorz'},
{ id: 'brawl-stars', name: 'Brawl Stars'},
{ id: 'buckshot-roulette', name: 'Buckshot Roulette'},
{ id: 'burrito-bison-launch-alibre', name: 'Burrito Bison Launcha Libre'},
{ id: 'celeste-2', name: 'Celeste 2'},
{ id: 'celeste', name: 'Celeste'},
{ id: 'cluster-rush', name: 'Cluster Rush'},
{ id: 'cookie-clicker', name: 'Cookie Clicker'},
{ id: 'core-ball', name: 'Core Ball'},
{ id: 'crazy-cars', name: 'Crazy Cars'},
{ id: 'crazy-cattle-3d', name: 'Crazy Cattle 3D'},
{ id: 'crossy-road', name: 'Crossy Road'},
{ id: 'deltarune', name: 'Deltarune'},
{ id: 'drift-boss', name: 'Drift Boss'},
{ id: 'drive-mad', name: 'Drive Mad'},
{ id: 'duck-life-2', name: 'Duck Life 2'},
{ id: 'duck-life-3', name: 'Duck Life 3'},
{ id: 'duck-life', name: 'Duck Life'},
{ id: 'eggy-car', name: 'Eggy Car'},
{ id: 'fire-boy-and-water-girl', name: 'Fireboy and Watergirl'},
{ id: 'flappy-bird', name: 'Flappy Bird'},
{ id: 'fnaf-2', name: "Five Nights at Freddy's 2"},
{ id: 'fnaf-3', name: "Five Nights at Freddy's 3"},
{ id: 'fnaf', name: "Five Nights at Freddy's"},
{ id: 'fnaw', name: "Five Nights at Winston's"},
{ id: 'free-rider', name: 'Free Rider'},
{ id: 'funny-shooter-2', name: 'Funny Shooter 2'},
{ id: 'geometry-dash-3d', name: 'Geometry Dash 3D'},
{ id: 'granny', name: 'Granny'},
{ id: 'grow-a-garden', name: 'Grow a Garden'},
{ id: 'gta-2', name: 'GTA 2'},
{ id: 'happy-wheels', name: 'Happy Wheels'},
{ id: 'hextris', name: 'Hextris'},
{ id: '1', name: '1'},
{ id: 'learn-to-fly-2', name: 'Learn to Fly 2'},
{ id: 'learn-to-fly-3', name: 'Learn to Fly 3'},
{ id: 'learn-to-fly', name: 'Learn to Fly'},
{ id: 'minecraft-1.5.2', name: 'Minecraft 1.5.2'},
{ id: 'minecraft-indev', name: 'Minecraft Indev'},
{ id: 'minecraft-parkour', name: 'Minecraft Parkour'},
{ id: 'minecraft-tower-defence', name: 'Minecraft Tower Defence'},
{ id: 'minecraft-zeta-client', name: 'Minecraft Zeta Client'},
{ id: 'motox3m-2', name: 'Moto X3M 2'},
{ id: 'motox3m-3', name: 'Moto X3M 3'},
{ id: 'motox3m-spookyland', name: 'Moto X3M Spooky Land'},
{ id: 'motox3m-winter', name: 'Moto X3M Winter'},
{ id: 'motox3m', name: 'Moto X3M'},
{ id: 'plants-vs-zombies', name: 'Plants vs Zombies'},
{ id: 'retro-bowl', name: 'Retro Bowl'},
{ id: 'short-life', name: 'Short Life'},
{ id: 'slither-io', name: 'Slither.io'},
{ id: 'slope-3', name: 'Slope 3'},
{ id: 'slow-roads', name: 'Slow Roads'},
{ id: 'snow-rider-3d', name: 'Snow Rider 3D'},
{ id: 'soccer-random', name: 'Soccer Random'},
{ id: 'subway-surfers', name: 'Subway Surfers'},
{ id: 'super-hot', name: 'SUPERHOT'},
{ id: 'the-binding-of-isaac', name: 'The Binding of Isaac'},
{ id: 'the-legend-of-zelda-the-minish-cap', name: 'The Legend of Zelda: The Minish Cap'},
{ id: 'the-worlds-hardest-game', name: "The World's Hardest Game"},
{ id: 'tiny-fishing', name: 'Tiny Fishing'},
{ id: 'ultrakill', name: 'ULTRAKILL'},
{ id: 'vex-2', name: 'Vex 2'},
{ id: 'vex-3', name: 'Vex 3'},
{ id: 'vex-6', name: 'Vex 6'},
{ id: 'vex-7', name: 'Vex 7'},
{ id: 'vex-8', name: 'Vex 8'},
{ id: 'vex', name: 'Vex'},
{ id: 'volly-random', name: 'Volley Random'},
{ id: 'word-wonders', name: 'Word Wonders'},
{ id: 'wordle', name: 'Wordle'},
{ id: 'yohoho-io', name: 'YoHoHo.io'},
{ id: 'you-vs-100-skibidi-toilets', name: 'You vs 100 Skibidi Toilets'},
{ id: 'zombocalypse-2', name: 'Zombocalypse 2'},
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
            window.location.href = `game.html?id=${game.id}`;
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