(() => {
  let currentFilter = 'all';

  function renderHistory() {
    const content = document.getElementById('historyContent');
    const emptyState = document.getElementById('emptyState');
    
    if (!window.CraftedHistory) {
      content.innerHTML = '<div class="empty-state"><div class="empty-title">History not available</div></div>';
      return;
    }

    const items = window.CraftedHistory.getHistory(currentFilter);
    
    if (items.length === 0) {
      content.innerHTML = '';
      content.appendChild(emptyState);
      emptyState.style.display = 'flex';
      return;
    }

    emptyState.style.display = 'none';
    
    const grouped = window.CraftedHistory.groupHistoryByDate(items);
    let html = '';

    for (const [date, dateItems] of Object.entries(grouped)) {
      html += `<div class="history-date-group">
        <div class="history-date-header">${date}</div>`;
      
      dateItems.forEach(item => {
        const timeAgo = window.CraftedHistory.formatTimestamp(item.timestamp);
        const typeIcon = getTypeIcon(item.type);
        const coverHtml = item.cover 
          ? `<img class="history-item-cover" src="${item.cover}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
             <div class="history-item-cover-fallback" style="display:none">${typeIcon}</div>`
          : `<div class="history-item-cover-fallback">${typeIcon}</div>`;

        html += `<div class="history-item" data-id="${item.id}" data-type="${item.type}">
          ${coverHtml}
          <div class="history-item-content">
            <div class="history-item-title">${escapeHtml(item.title)}</div>
            <div class="history-item-subtitle">${escapeHtml(item.subtitle)}</div>
          </div>
          <div class="history-item-meta">
            <span class="history-item-type ${item.type}">${item.type}</span>
            <span class="history-item-time">${timeAgo}</span>
          </div>
          <div class="history-item-actions">
            <button class="history-action-btn delete" title="Remove from history" data-id="${item.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>`;
      });

      html += '</div>';
    }

    content.innerHTML = html;
    attachItemListeners();
  }

  function getTypeIcon(type) {
    const icons = {
      game: '<i class="fa-solid fa-gamepad"></i>',
      movie: '<i class="fa-solid fa-film"></i>',
      music: '<i class="fa-solid fa-music"></i>',
      vm: '<i class="fa-solid fa-desktop"></i>',
      search: '<i class="fa-solid fa-magnifying-glass"></i>',
      proxy: '<i class="fa-solid fa-globe"></i>'
    };
    return icons[type] || '<i class="fa-solid fa-circle"></i>';
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function attachItemListeners() {
    document.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.history-action-btn')) return;
        
        const type = item.dataset.type;
        const id = item.dataset.id;
        
        handleItemClick(type, id);
      });
    });

    document.querySelectorAll('.history-action-btn.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        
        if (window.CraftedHistory) {
          window.CraftedHistory.removeFromHistory(id);
          renderHistory();
        }
      });
    });
  }

  function handleItemClick(type, id) {
    switch (type) {
      case 'game':
        // Navigate to games page and open the game
        window.location.href = `cg://pages/games.html`;
        setTimeout(() => {
          const gameEvent = new CustomEvent('openGameById', { detail: id });
          window.dispatchEvent(gameEvent);
        }, 100);
        break;
      case 'movie':
        // Navigate to movies page
        window.location.href = `cg://pages/movies.html`;
        break;
      case 'music':
        // Open music player
        const musicPill = document.getElementById('music-pill');
        if (musicPill) {
          musicPill.click();
        }
        break;
      case 'vm':
        // Navigate to VMs page
        window.location.href = `cg://pages/vms.html`;
        break;
      case 'search':
        // Find the search item to get context
        const items = window.CraftedHistory.getHistory('search');
        const searchItem = items.find(i => i.id === id);
        if (searchItem) {
          const context = searchItem.subtitle || 'general';
          const query = searchItem.title;
          
          // Navigate to appropriate page based on context
          switch (context) {
            case 'games':
              window.location.href = `cg://games`;
              setTimeout(() => {
                const searchEvent = new CustomEvent('searchFromHistory', { detail: query });
                window.dispatchEvent(searchEvent);
              }, 100);
              break;
            case 'movies':
              window.location.href = `cg://movies`;
              setTimeout(() => {
                const searchEvent = new CustomEvent('searchFromHistory', { detail: query });
                window.dispatchEvent(searchEvent);
              }, 100);
              break;
            case 'music':
              // Open music player and search
              const musicPill = document.getElementById('music-pill');
              if (musicPill) {
                musicPill.click();
                setTimeout(() => {
                  const searchEvent = new CustomEvent('searchFromHistory', { detail: query });
                  window.dispatchEvent(searchEvent);
                }, 100);
              }
              break;
            default:
              // General search - go to games page
              window.location.href = `cg://games`;
              setTimeout(() => {
                const searchEvent = new CustomEvent('searchFromHistory', { detail: query });
                window.dispatchEvent(searchEvent);
              }, 100);
          }
        }
        break;
      case 'proxy':
        // Find the proxy item to get URL
        const proxyItems = window.CraftedHistory.getHistory('proxy');
        const proxyItem = proxyItems.find(i => i.id === id);
        if (proxyItem) {
          const url = proxyItem.title;
          // Navigate to the URL using the browser's navigate function
          if (typeof navigate === 'function') {
            navigate(url);
          } else {
            // Fallback: set URL input and trigger navigation
            const urlInput = document.getElementById('url-input');
            if (urlInput) {
              urlInput.value = url;
              urlInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            }
          }
        }
        break;
    }
  }

  function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderHistory();
      });
    });
  }

  function setupClearButton() {
    const clearBtn = document.getElementById('clearHistoryBtn');
    if (!clearBtn) return;

    clearBtn.addEventListener('click', () => {
      if (!confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        return;
      }

      if (window.CraftedHistory) {
        window.CraftedHistory.clearHistory();
        renderHistory();
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    setupClearButton();
    renderHistory();
  });
})();
