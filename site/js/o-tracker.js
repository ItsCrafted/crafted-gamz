(function() {
    'use strict';

    const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

    let rtdb;
    let onlineRef;
    let isTracking = false;

    function getUserId() {
        let userId = sessionStorage.getItem('craftedGamzUserId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('craftedGamzUserId', userId);
        }
        return userId;
    }

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

    async function markUserOnline() {
        if (isTracking) return;
        
        try {
            const userId = getUserId();
            onlineRef = rtdb.ref(`onlineUsers/${userId}`);

            await onlineRef.set({
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                page: window.location.pathname
            });
            
            isTracking = true;
            console.log('✓ User marked as online');

            const heartbeatInterval = setInterval(() => {
                if (onlineRef) {
                    onlineRef.update({
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).catch(() => clearInterval(heartbeatInterval));
                }
            }, 2 * 60 * 1000);

            window.addEventListener('beforeunload', () => {
                if (onlineRef) {
                    onlineRef.remove().catch(() => {});
                }
            });

            setTimeout(() => {
                if (onlineRef) {
                    onlineRef.remove().catch(() => {});
                }
            }, 5 * 60 * 1000);
            
        } catch (error) {
            console.error('Error marking user as online:', error);
        }
    }

    function waitForFirebase(callback, maxAttempts = 20) {
        let attempts = 0;
        
        const checkFirebase = setInterval(() => {
            attempts++;
            
            if (typeof firebase !== 'undefined' && firebase.database) {
                clearInterval(checkFirebase);
                callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkFirebase);
                console.error('Firebase Database SDK not loaded. Please include Firebase Database script before online-tracker.js');
            }
        }, 100);
    }

    async function initialize() {
        try {
            const config = await loadFirebaseConfig();
            
            if (!firebase.apps || firebase.apps.length === 0) {
                firebase.initializeApp(config);
                console.log('Firebase initialized');
            }

            rtdb = firebase.database();

            markUserOnline();
            
        } catch (error) {
            console.error('Failed to initialize online tracker:', error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            waitForFirebase(initialize);
        });
    } else {
        waitForFirebase(initialize);
    }

})();