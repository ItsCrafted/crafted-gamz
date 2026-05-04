const SEARCH_WORKER_URL = 'https://music-api.craftedgamz.workers.dev';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const resultsContainer = document.getElementById('resultsContainer');
const errorMsg = document.getElementById('errorMsg');
const player = document.getElementById('player');
const embedContainer = document.getElementById('embedContainer');
const placeholderContainer = document.getElementById('placeholderContainer');

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  
  errorMsg.innerHTML = '';
  
  if (!query) {
    errorMsg.innerHTML = '<div class="error">Please enter a search query</div>';
    return;
  }
  
  searchBtn.disabled = true;
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  resultsDiv.innerHTML = '<div class="loading">Searching SoundCloud...</div>';
  resultsContainer.style.display = 'block';
  
  try {
    const response = await fetch(`${SEARCH_WORKER_URL}?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'soundcloud-search'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      resultsDiv.innerHTML = '<div class="no-results">No tracks found. Try different keywords.</div>';
      return;
    }
    
    resultsDiv.innerHTML = data.items.map(item => {
      const isSoundCloudTrack = item.link && item.link.includes('soundcloud.com/') && !item.link.includes('/sets/');
      
      return `
        <div class="track-card" onclick='${isSoundCloudTrack ? `playTrack("${item.link.replace(/'/g, "\\'")}")` : `window.open("${item.link}", "_blank")`}'>
          <div class="track-title">${item.title || 'Untitled'}</div>
          <div class="track-snippet">${item.snippet || ''}</div>
          <div class="track-url">${item.link}</div>
        </div>
      `;
    }).join('');
    
  } catch (error) {
    errorMsg.innerHTML = `<div class="error"><strong>Error:</strong> ${error.message}</div>`;
    resultsDiv.innerHTML = '';
  } finally {
    searchBtn.disabled = false;
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
  }
});

function playTrack(url) {
  player.src = '';
  
  setTimeout(() => {
    player.src = `searcher.html?q=https%3A%2F%2Fw.soundcloud.com%2Fplayer%2F%3Furl%3D${encodeURIComponent(encodeURIComponent(url))}%26color%3D%2523ff6b6b%26auto_play%3Dtrue%26hide_related%3Dtrue%26show_comments%3Dfalse%26show_user%3Dtrue%26show_reposts%3Dfalse%26show_teaser%3Dfalse%26visual%3Dfalse&backend=ultraviolet&wisp=wss%3A%2F%2Fwisp.rhw.one%2F`;
    
    placeholderContainer.style.display = 'none';
    embedContainer.style.display = 'block';
  }, 100);
}