let checkInterval = setInterval(() => {
    if (window.accountManager && window.accountManager.auth) {
        clearInterval(checkInterval);
        initializeSettings();
    }
}, 100);

function initializeSettings() {
    const accountManager = window.accountManager;

    function updateUI() {
        const user = accountManager.user;
        const isGuest = accountManager.isGuest;
        
        console.log('Updating UI - User:', user, 'isGuest:', isGuest);
        
        if (user && !isGuest) {
            document.getElementById('account-status').innerHTML = 
                '<i class="fas fa-check-circle" style="color: #10b981;"></i> Signed In';
            document.getElementById('email-display').innerHTML = 
                '<i class="fas fa-envelope"></i> ' + user.email;
            document.getElementById('logout-btn').style.display = 'inline-flex';
            document.getElementById('signin-btn').style.display = 'none';
            document.getElementById('delete-account-btn').style.display = 'inline-flex';
            document.getElementById('clear-server-data-btn').style.display = 'inline-flex';

            accountManager.getUserProfile().then(profile => {
                if (profile && profile.name) {
                    document.getElementById('username-display').value = profile.name;
                }
            });
        } else if (isGuest) {
            document.getElementById('account-status').innerHTML = 
                '<i class="fas fa-user" style="color: #f59e0b;"></i> Guest Mode';
            document.getElementById('email-display').innerHTML = 
                '<i class="fas fa-user-secret"></i> Guest (not syncing)';
            document.getElementById('username-display').value = localStorage.getItem('craftedGamzUser') || 'Guest';
            document.getElementById('logout-btn').style.display = 'none';
            document.getElementById('signin-btn').style.display = 'inline-flex';
            document.getElementById('delete-account-btn').style.display = 'none';
            document.getElementById('clear-server-data-btn').style.display = 'none';
        } else {
            document.getElementById('account-status').innerHTML = 
                '<i class="fas fa-times-circle" style="color: #ef4444;"></i> Not Signed In';
            document.getElementById('email-display').innerHTML = 
                '<i class="fas fa-exclamation-circle"></i> Not signed in';
            document.getElementById('username-display').value = localStorage.getItem('craftedGamzUser') || 'Guest';
            document.getElementById('logout-btn').style.display = 'none';
            document.getElementById('signin-btn').style.display = 'inline-flex';
            document.getElementById('delete-account-btn').style.display = 'none';
            document.getElementById('clear-server-data-btn').style.display = 'none';
        }
    }

    updateUI();
    accountManager.auth.onAuthStateChanged((user) => {
        console.log('Auth state changed in settings:', user);
        setTimeout(() => {
            updateUI();
        }, 100);
    });

    document.getElementById('change-name-btn').addEventListener('click', async () => {
        const currentName = document.getElementById('username-display').value;
        const newName = prompt('Enter your new name:', currentName);
        
        if (newName && newName.trim()) {
            const trimmedName = newName.trim();
            
            if (accountManager.user && !accountManager.isGuest) {
                try {
                    await accountManager.db.collection('users')
                        .doc(accountManager.user.uid)
                        .update({ name: trimmedName });
                    document.getElementById('username-display').value = trimmedName;
                    alert('Name updated successfully!');
                } catch (error) {
                    alert('Error updating name: ' + error.message);
                }
            } else {
                localStorage.setItem('craftedGamzUser', trimmedName);
                document.getElementById('username-display').value = trimmedName;
                alert('Name updated locally!');
            }
        }
    });

    document.getElementById('logout-btn').addEventListener('click', async () => {
        if (confirm('Are you sure you want to sign out?')) {
            await accountManager.signOut();
            alert('Signed out successfully!');
            updateUI();
        }
    });

    document.getElementById('signin-btn').addEventListener('click', () => {
        accountManager.isGuest = false;
        accountManager.showAuthPrompt();
    });

    document.getElementById('view-data-btn').addEventListener('click', () => {
        const dataContent = document.getElementById('data-content');
        const modal = document.getElementById('data-modal');
        
        let html = '';
        if (localStorage.length === 0) {
            html = '<p style="color: rgba(255,255,255,0.5);">No data stored</p>';
        } else {
            html = '<table style="width: 100%; border-collapse: collapse;">';
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const displayValue = value.length > 100 ? value.substring(0, 100) + '...' : value;
                
                html += `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <td style="padding: 0.75rem; color: #60a5fa; font-weight: bold;">${key}</td>
                        <td style="padding: 0.75rem; word-break: break-all;">${displayValue}</td>
                    </tr>
                `;
            }
            html += '</table>';
            html += `<p style="margin-top: 1rem; color: rgba(255,255,255,0.5);">Total items: ${localStorage.length}</p>`;
        }
        
        dataContent.innerHTML = html;
        modal.style.display = 'flex';
    });

    document.getElementById('close-data-modal').addEventListener('click', () => {
        document.getElementById('data-modal').style.display = 'none';
    });

    document.getElementById('clear-local-data-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all local data? This will not delete your account or synced data on the server.')) {
            localStorage.clear();
            alert('All local data has been cleared. Reloading page...');
            window.location.reload();
        }
    });

    document.getElementById('clear-server-data-btn').addEventListener('click', async () => {
        if (confirm('Are you sure you want to clear all synced data on the server? Your account will remain but all localStorage data will be removed from the server.')) {
            try {
                const user = accountManager.user;
                if (user) {
                    await accountManager.db.collection('users').doc(user.uid).update({
                        storage: {},
                        lastSync: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    
                    alert('Server data cleared successfully!');
                }
            } catch (error) {
                alert('Error clearing server data: ' + error.message);
            }
        }
    });

    document.getElementById('delete-account-btn').addEventListener('click', async () => {
        const confirmation = prompt('This will permanently delete your account and all data. Type "DELETE" to confirm:');
        
        if (confirmation === 'DELETE') {
            try {
                const user = accountManager.user;
                if (user) {
                    await accountManager.db.collection('users').doc(user.uid).delete();
                    await user.delete();
                    localStorage.clear();
                    
                    alert('Account deleted successfully. You will be redirected to the home page.');
                    window.location.href = 'index.html';
                }
            } catch (error) {
                alert('Error deleting account: ' + error.message);
            }
        } else if (confirmation !== null) {
            alert('Account deletion cancelled.');
        }
    });
}

function initBackgroundSettings() {
    const bgButtons = document.querySelectorAll('.bg-option-btn');
    const currentCollection = localStorage.getItem('bgCollection') || 'none';
    bgButtons.forEach(btn => {
        if (btn.dataset.collection === currentCollection) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', function() {
            const collection = this.dataset.collection;
            bgButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (collection === 'none') {
                localStorage.removeItem('bgCollection');
            } else {
                localStorage.setItem('bgCollection', collection);
            }
            const bgIframe = document.querySelector('.bg-container iframe');
            if (bgIframe) {
                bgIframe.src = bgIframe.src;
            }
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Applied';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 1500);
        });
    });
}
initBackgroundSettings();