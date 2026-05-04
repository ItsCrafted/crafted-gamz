const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
const ANIMATION_DURATION = 1200;
const STAGGER_DELAY = 150;

let firebaseApp;
let db;
let rtdb;

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

function getTodayKey() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function getMonthKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

function getUserId() {
    let userId = sessionStorage.getItem('craftedGamzUserId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('craftedGamzUserId', userId);
    }
    return userId;
}

function animateValue(element, start, end, duration) {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

async function trackUserVisit() {
    try {
        const userId = getUserId();
        const todayKey = getTodayKey();
        const monthKey = getMonthKey();
        try {
            const onlineRef = rtdb.ref(`onlineUsers/${userId}`);
            await onlineRef.set({
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            
            window.addEventListener('beforeunload', () => {
                onlineRef.remove().catch(() => {});
            });
            
            setTimeout(() => {
                onlineRef.remove().catch(() => {});
            }, 5 * 60 * 1000);
        } catch (rtdbError) {
            console.warn('Could not set online status:', rtdbError.message);
        }
        
        const batch = db.batch();
        
        const allTimeRef = db.collection('stats').doc('allTime');
        batch.set(allTimeRef, {
            count: firebase.firestore.FieldValue.increment(1)
        }, { merge: true });
        
        const todayRef = db.collection('stats').doc(todayKey);
        batch.set(todayRef, {
            count: firebase.firestore.FieldValue.increment(1),
            date: todayKey
        }, { merge: true });
        
        const monthRef = db.collection('stats').doc(monthKey);
        batch.set(monthRef, {
            count: firebase.firestore.FieldValue.increment(1),
            month: monthKey
        }, { merge: true });
        
        await batch.commit();
        console.log('User visit tracked successfully');
        
    } catch (error) {
        console.error('Error tracking user visit:', error);
    }
}

async function loadStatsBoard() {
    try {
        const todayKey = getTodayKey();
        const monthKey = getMonthKey();
        
        let isInitialLoad = true;
        
        rtdb.ref('onlineUsers').on('value', (snapshot) => {
            const onlineCount = snapshot.numChildren();
            const onlineElement = document.getElementById('stat-online-users');
            if (onlineElement) {
                onlineElement.textContent = onlineCount.toLocaleString();
            }
        });
        
        db.collection('stats').doc('allTime').onSnapshot((doc) => {
            const allTime = doc.exists ? doc.data().count : 0;
            const element = document.getElementById('stat-users-total');
            if (element) {
                if (isInitialLoad) {
                    setTimeout(() => animateValue(element, 0, allTime, 2500), 1600);
                } else {
                    element.textContent = allTime.toLocaleString();
                }
            }
        });
        
        db.collection('stats').doc(todayKey).onSnapshot((doc) => {
            const today = doc.exists ? doc.data().count : 0;
            const element = document.getElementById('stat-users-today');
            if (element) {
                if (isInitialLoad) {
                    setTimeout(() => animateValue(element, 0, today, 1800), 1600);
                } else {
                    element.textContent = today.toLocaleString();
                }
            }
        });
        
        db.collection('stats').doc(monthKey).onSnapshot((doc) => {
            const month = doc.exists ? doc.data().count : 0;
            const element = document.getElementById('stat-users-month');
            if (element) {
                if (isInitialLoad) {
                    setTimeout(() => animateValue(element, 0, month, 2200), 1600);
                } else {
                    element.textContent = month.toLocaleString();
                }
            }
        });
        
        db.collection('gameCounts')
            .onSnapshot((snapshot) => {
                const allGames = [];
                let totalGamesPlayed = 0;
                
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const plays = data.count || 0;
                    allGames.push({
                        name: data.name || doc.id,
                        plays: plays
                    });
                    totalGamesPlayed += plays;
                });
                
                const topGames = allGames
                    .sort((a, b) => b.plays - a.plays)
                    .slice(0, 5);
                
                const gamesElement = document.getElementById('stat-games-played');
                if (gamesElement) {
                    if (isInitialLoad) {
                        setTimeout(() => animateValue(gamesElement, 0, totalGamesPlayed, 2000), 1600);
                    } else {
                        gamesElement.textContent = totalGamesPlayed.toLocaleString();
                    }
                }
                
                const topGamesList = document.getElementById('top-games-list');
                if (topGamesList && topGames.length > 0) {
                    topGamesList.innerHTML = topGames.map((game, index) => `
                        <div class="top-game-item">
                            <span class="top-game-name">${index + 1}. ${game.name}</span>
                            <span class="top-game-plays">${game.plays.toLocaleString()} plays</span>
                        </div>
                    `).join('');
                } else if (topGamesList) {
                    topGamesList.innerHTML = '<div class="top-game-item"><span class="top-game-name">No games tracked yet</span></div>';
                }
            });
        
        setTimeout(() => {
            isInitialLoad = false;
        }, 5000);
        
    } catch (error) {
        console.error('Error loading stats board:', error);
    }
}

function trackGamePlay(gameName) {
    if (!db) return;
    
    const gameRef = db.collection('gameCounts').doc(gameName);
    gameRef.set({
        count: firebase.firestore.FieldValue.increment(1),
        lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(() => console.log(`✓ Game play tracked: ${gameName}`))
    .catch(error => console.error('Error tracking game play:', error));
}

function isDirectVisit() {
    return true;
}

function hasUserName() {
    const name = localStorage.getItem('craftedGamzUser');
    return name !== null && name.trim() !== '';
}

function getUserName() {
    return localStorage.getItem('craftedGamzUser') || 'Guest';
}

function showNameModal() {
    const modal = document.getElementById('name-modal');
    if (modal) {
        modal.classList.add('active');
        const input = document.getElementById('name-input');
        if (input) input.focus();
    }
}

function hideNameModal() {
    const modal = document.getElementById('name-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function saveUserName() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput ? nameInput.value.trim() : '';
    
    if (name) {
        localStorage.setItem('craftedGamzUser', name);
        updateWelcomeText(name);
        hideNameModal();
        animateSidebar();
    }
}

function updateWelcomeText(name) {
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.textContent = `Hello ${name}! What would you like to do?`;
    }
}

async function animateSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    await sleep(200);
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].style.transitionDelay = `${i * STAGGER_DELAY}ms`;
        navItems[i].classList.add('visible');
    }
}

function initWithoutAnimation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.style.transitionDelay = '0ms';
        item.classList.add('visible');
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function initializeStatsBoard() {
    try {
        if (hasUserName()) {
            const userName = getUserName();
            updateWelcomeText(userName);
        }
        
        const firebaseConfig = await loadFirebaseConfig();
        
        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        rtdb = firebase.database();
        
        console.log('Firebase initialized successfully');
        const nameSubmit = document.getElementById('name-submit');
        const nameInput = document.getElementById('name-input');
        
        if (nameSubmit) {
            nameSubmit.addEventListener('click', saveUserName);
        }
        
        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveUserName();
                }
            });
        }
        
        if (!hasUserName() && isDirectVisit()) {
            showNameModal();
        } else {
            if (isDirectVisit()) {
                animateSidebar();
            } else {
                initWithoutAnimation();
            }
        }

        await trackUserVisit();
        await loadStatsBoard();

        window.trackGamePlay = trackGamePlay;
        
    } catch (error) {
        console.error('Failed to initialize stats board:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStatsBoard);
} else {
    initializeStatsBoard();
}