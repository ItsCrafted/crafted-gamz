const TMDB_KEY='f53c43c1f2028398bcebdf4a5d1e28bd';
const IMG_BASE='https://image.tmdb.org/t/p/w500';
const genreMap={action:28,comedy:35,drama:18,horror:27,scifi:878,thriller:53,animation:16};
const genreIdToCategory={28:'action',35:'comedy',18:'drama',27:'horror',878:'scifi',53:'thriller',16:'animation'};

let allMovies=[],currentCategory='all',currentPage=1,hasMore=true,isLoading=false,isSearchMode=false,searchTimer;

const grid=document.getElementById('movies-grid');
const loadBtn=document.getElementById('load-more-btn');
const searchInput=document.getElementById('movie-search');
const playerOverlay=document.getElementById('player-overlay');
const movieIframe=document.getElementById('movie-iframe');
const playerTitle=document.getElementById('player-title');

function getCategoryFromGenres(ids){
  if(!ids||!ids.length)return'';
  for(const id of ids)if(genreIdToCategory[id])return genreIdToCategory[id];
  return'';
}

function showLoading(){
  grid.innerHTML='';
  for(let i=0;i<20;i++){
    const el=document.createElement('div');
    el.className='skeleton-movie-card';
    el.innerHTML=`
      <div class="skeleton-movie-img"></div>
      <div class="skeleton-movie-rating"></div>
      <div class="skeleton-movie-info">
        <div class="skeleton-movie-title"></div>
        <div class="skeleton-movie-year"></div>
      </div>
    `;
    grid.appendChild(el);
  }
}

function formatMovies(raw,fallbackCategory=''){
  return raw.map(m=>({
    id:m.id.toString(),name:m.title,
    category:fallbackCategory||getCategoryFromGenres(m.genre_ids),
    year:(m.release_date||'').substring(0,4)||'N/A',
    rating:m.vote_average?m.vote_average.toFixed(1):'N/A',
    poster:m.poster_path?`${IMG_BASE}${m.poster_path}`:null
  }));
}

function renderCards(movies,append=false){
  if(!append){grid.innerHTML='';allMovies=[]}
  if(!movies.length&&!append){
    grid.innerHTML=`<div class="state-msg show"><i class="fas fa-film"></i><span>No movies found. Try a different search.</span></div>`;
    updateLoadBtn();return;
  }
  for(const m of movies){
    if(append&&document.querySelector(`[data-id="${m.id}"]`))continue;
    allMovies.push(m);
    const card=document.createElement('div');
    card.className='movie-card';card.setAttribute('data-id',m.id);
    card.innerHTML=`
      <img src="${m.poster||'https://via.placeholder.com/500x750/0a0a0f/ffffff?text=No+Image'}" alt="${m.name}"
           onerror="this.src='https://via.placeholder.com/500x750/0a0a0f/ffffff?text=No+Image'">
      <div class="movie-rating"><i class="fas fa-star" style="opacity:0.7"></i> ${m.rating}</div>
      <div class="play-overlay"><div class="play-circle"><i class="fas fa-play"></i></div></div>
      <div class="movie-info">
        <div class="movie-title">${m.name}</div>
        <div class="movie-year">${m.year}</div>
      </div>`;
    card.addEventListener('click',()=>openPlayer(m.id,m.name));
    grid.appendChild(card);
  }
  updateLoadBtn();
}

function updateLoadBtn(){
  loadBtn.style.display=(isSearchMode||!hasMore)?'none':'block';
  loadBtn.disabled=isLoading;
  loadBtn.textContent=isLoading?'Loading…':'Load More Movies';
}

async function fetchPages(urlFn,startPage,endPage){
  const promises=[];
  for(let p=startPage;p<=endPage;p++)promises.push(fetch(urlFn(p)).then(r=>r.json()));
  const results=await Promise.all(promises);
  return results.flatMap(d=>d.results||[]);
}

async function loadTopMovies(append=false){
  if(isLoading||(!hasMore&&append))return;
  isLoading=true;updateLoadBtn();
  const sp=append?currentPage:1;
  if(!append){showLoading();currentPage=1;hasMore=true}
  try{
    const raw=await fetchPages(p=>`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&page=${p}`,sp,sp+1);
    if(!raw.length){hasMore=false}else{renderCards(formatMovies(raw),append);currentPage=sp+2}
  }catch(e){console.error(e);grid.innerHTML=`<div class="state-msg show"><i class="fas fa-exclamation-circle"></i><span>Failed to load movies. Please refresh.</span></div>`}
  finally{isLoading=false;updateLoadBtn()}
}

async function loadCategoryMovies(category,append=false){
  if(isLoading||(!hasMore&&append))return;
  isLoading=true;updateLoadBtn();
  const genreId=genreMap[category];const sp=append?currentPage:1;
  if(!append){showLoading();currentPage=1;hasMore=true}
  try{
    const raw=await fetchPages(p=>`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${p}`,sp,sp+1);
    if(!raw.length){hasMore=false}else{renderCards(formatMovies(raw,category),append);currentPage=sp+2}
  }catch(e){console.error(e)}
  finally{isLoading=false;updateLoadBtn()}
}

async function searchMovies(query){
  if(!query.trim()){isSearchMode=false;currentCategory==='all'?loadTopMovies():loadCategoryMovies(currentCategory);return}
  isSearchMode=true;hasMore=false;updateLoadBtn();showLoading();
  try{
    const res=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`);
    const data=await res.json();
    renderCards(data.results&&data.results.length?formatMovies(data.results):[]);
  }catch(e){renderCards([])}
}

function openPlayer(movieId,title){
  // Track in history
  if (window.CraftedHistory) {
    const movie = allMovies.find(m => m.id === movieId);
    if (movie) {
      window.CraftedHistory.addToHistory(window.CraftedHistory.HISTORY_TYPES.MOVIE, {
        id: movieId,
        title: movie.name,
        subtitle: movie.year,
        cover: movie.poster
      });
    }
  }
  window.open(`https://player.videasy.net/movie/${movieId}`,'_blank');
}
searchInput.addEventListener('input',e=>{
  const query = e.target.value.trim();
  clearTimeout(searchTimer);
  searchTimer = setTimeout(()=>searchMovies(query),500);
  
  // Track search history
  if (window.CraftedHistory && query.length >= 2) {
    window.CraftedHistory.addSearchHistory(query, 'movies');
  }
});
document.querySelectorAll('.cat-btn').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');currentCategory=btn.getAttribute('data-category');
    searchInput.value='';isSearchMode=false;
    currentCategory==='all'?await loadTopMovies():await loadCategoryMovies(currentCategory);
  });
});
loadBtn.addEventListener('click',()=>{currentCategory==='all'?loadTopMovies(true):loadCategoryMovies(currentCategory,true)});

// Handle search from history
window.addEventListener('searchFromHistory', (e) => {
  const query = e.detail;
  if (query) {
    searchInput.value = query;
    searchMovies(query);
  }
});

loadTopMovies();