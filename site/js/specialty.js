const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

const games = [
    { id: 'zapper-v1', name: 'Extension Zapper v1',},
    { id: 'zapper-v2', name: 'Extension Zapper v2',},
    { id: 'url-shortener', name: 'URL Shortener',},
    { id: 'file-transfer', name: 'File Transfer',},
    { id: 'ela-ai', name: 'Ela AI',},
    { id: 'math-ai', name: 'Math AI',},
    { id: 'cmesh', name: 'CMESH',},
    { id: 'snyaptium', name: 'Snyaptium',},
    { id: 'queryy', name: 'Queryy',},
    { id: 'hyperspeed', name: 'Hyperspeed',},
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
                <img src="../images/specialty_icons/${game.id}.png" alt="${game.name}">
                <div class="game-info">
                    <h3 class="game-title">${game.name}</h3>
                </div>
            </div>
        `;

        gameBox.addEventListener('click', async () => {
            await trackGameClick(game.name);
            window.location.href = `https://features.cgamz.site/${game.id}.html`;
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