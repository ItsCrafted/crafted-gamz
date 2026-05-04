const TMDB_API_KEY = 'f53c43c1f2028398bcebdf4a5d1e28bd';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

let allMovies = [];
let movieDetailsCache = {};
let currentCategory = 'all';
let searchTimeout;
let isLoading = false;
let currentPage = 1;
let hasMoreMovies = true;
let isSearchMode = false;

const genreMap = {
    'action': 28,
    'comedy': 35,
    'drama': 18,
    'horror': 27,
    'scifi': 878,
    'thriller': 53,
    'animation': 16
};

const genreIdToCategory = {
    28: 'action',
    35: 'comedy',
    18: 'drama',
    27: 'horror',
    878: 'scifi',
    53: 'thriller',
    16: 'animation'
};

async function fetchTopMovies(append = false) {
    if (isLoading || (!hasMoreMovies && append)) return;
    isLoading = true;
    updateLoadMoreButton();
    
    const container = document.getElementById('games-container');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    if (!append) {
        container.innerHTML = '<div style="color: white; text-align: center; padding: 2rem;">Loading movies...</div>';
        currentPage = 1;
        allMovies = [];
        hasMoreMovies = true;
    }
    
    try {
        const promises = [];
        const startPage = append ? currentPage : 1;
        const endPage = startPage + 1;
        
        for (let page = startPage; page <= endPage; page++) {
            promises.push(
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`)
                    .then(res => res.json())
            );
        }
        
        const results = await Promise.all(promises);
        const newMovies = results.flatMap(data => data.results || []);
        
        if (newMovies.length === 0) {
            hasMoreMovies = false;
        } else {
            const formattedMovies = newMovies.map(movie => ({
                id: movie.id.toString(),
                name: movie.title,
                category: getCategoryFromGenres(movie.genre_ids),
                year: (movie.release_date || '').substring(0, 4) || 'N/A',
                rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
                poster_path: movie.poster_path,
                genre_ids: movie.genre_ids
            }));
            
            if (append) {
                allMovies = [...allMovies, ...formattedMovies];
                await renderMovies(allMovies, true);
                window.scrollTo(0, scrollPosition);
            } else {
                allMovies = formattedMovies;
                await renderMovies(allMovies);
            }
            
            currentPage = endPage + 1;
        }
    } catch (error) {
        console.error('Error fetching top movies:', error);
        if (!append) {
            container.innerHTML = '<div style="color: white; text-align: center; padding: 2rem;">Error loading movies. Please refresh.</div>';
        }
    } finally {
        isLoading = false;
        updateLoadMoreButton();
    }
}

async function fetchCategoryMovies(category, append = false) {
    if (isLoading || (!hasMoreMovies && append)) return;
    isLoading = true;
    updateLoadMoreButton();
    
    const container = document.getElementById('games-container');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    if (!append) {
        container.innerHTML = '<div style="color: white; text-align: center; padding: 2rem;">Loading movies...</div>';
        currentPage = 1;
        hasMoreMovies = true;
    }
    
    try {
        const genreId = genreMap[category];
        
        const promises = [];
        const startPage = append ? currentPage : 1;
        const endPage = startPage + 1;
        
        for (let page = startPage; page <= endPage; page++) {
            promises.push(
                fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`)
                    .then(res => res.json())
            );
        }
        
        const results = await Promise.all(promises);
        const categoryMovies = results.flatMap(data => data.results || []);
        
        if (categoryMovies.length === 0) {
            hasMoreMovies = false;
        } else {
            const movies = categoryMovies.map(movie => ({
                id: movie.id.toString(),
                name: movie.title,
                category: category,
                year: (movie.release_date || '').substring(0, 4) || 'N/A',
                rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
                poster_path: movie.poster_path,
                genre_ids: movie.genre_ids
            }));
            
            if (append) {
                allMovies = [...allMovies, ...movies];
                await renderMovies(allMovies, true);
                window.scrollTo(0, scrollPosition);
            } else {
                allMovies = movies;
                await renderMovies(allMovies);
            }
            
            currentPage = endPage + 1;
        }
    } catch (error) {
        console.error('Error fetching category movies:', error);
        if (!append) {
            container.innerHTML = '<div style="color: white; text-align: center; padding: 2rem;">Error loading movies. Please refresh.</div>';
        }
    } finally {
        isLoading = false;
        updateLoadMoreButton();
    }
}

function getCategoryFromGenres(genreIds) {
    if (!genreIds || genreIds.length === 0) return '';
    
    for (const id of genreIds) {
        if (genreIdToCategory[id]) {
            return genreIdToCategory[id];
        }
    }
    return '';
}

async function getMovieDetails(movieId) {
    if (movieDetailsCache[movieId]) {
        return movieDetailsCache[movieId];
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        movieDetailsCache[movieId] = data;
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}

async function renderMovies(moviesToRender, append = false) {
    const container = document.getElementById('games-container');
    const noResults = document.getElementById('no-results');
    
    if (!append) {
        container.innerHTML = '';
    }
    
    if (moviesToRender.length === 0 && !append) {
        noResults.style.display = 'block';
        updateLoadMoreButton();
        return;
    }
    
    noResults.style.display = 'none';
    
    for (const movie of moviesToRender) {
        if (append && document.querySelector(`[data-id="${movie.id}"]`)) {
            continue;
        }
        
        const posterPath = movie.poster_path
            ? `${TMDB_IMAGE_BASE}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750/1e293b/ffffff?text=No+Image';

        const movieBox = document.createElement('div');
        movieBox.className = 'game-box movie-box';
        movieBox.setAttribute('data-id', movie.id);
        movieBox.setAttribute('data-category', movie.category || '');
        
        movieBox.innerHTML = `
            <div class="glass-filter"></div>
            <div class="glass-overlay"></div>
            <div class="glass-specular"></div>
            <div class="movie-rating"><i class="fas fa-star"></i> ${movie.rating}</div>
            <div class="glass-content">
                <img src="${posterPath}" alt="${movie.name}" onerror="this.src='https://via.placeholder.com/500x750/1e293b/ffffff?text=No+Image'">
                <div class="game-info">
                    <div>
                        <h3 class="game-title">${movie.name}</h3>
                        <div class="movie-year">${movie.year}</div>
                    </div>
                </div>
            </div>
        `;

        movieBox.addEventListener('click', () => {
            window.location.href = `movieplayer.html?m=${movie.id}`;
        });
        
        container.appendChild(movieBox);
    }
    
    updateLoadMoreButton();
}

async function searchTMDB(query) {
    if (!query.trim()) {
        isSearchMode = false;
        if (currentCategory === 'all') {
            renderMovies(allMovies);
        } else {
            await fetchCategoryMovies(currentCategory);
        }
        return;
    }

    isSearchMode = true;
    hasMoreMovies = false;
    updateLoadMoreButton();

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const searchResults = data.results.map(item => ({
                id: item.id.toString(),
                name: item.title,
                category: getCategoryFromGenres(item.genre_ids),
                year: (item.release_date || '').substring(0, 4) || 'N/A',
                rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
                poster_path: item.poster_path
            }));

            renderMovies(searchResults);
        } else {
            renderMovies([]);
        }
    } catch (error) {
        console.error('TMDB search error:', error);
        renderMovies([]);
    }
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;
    
    if (isSearchMode || !hasMoreMovies) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.disabled = isLoading;
        loadMoreBtn.textContent = isLoading ? 'Loading...' : 'Load More Movies';
    }
}

const searchInput = document.getElementById('game-search');
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchTMDB(e.target.value);
    }, 500);
});

const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        searchInput.value = '';
        isSearchMode = false;
        
        if (currentCategory === 'all') {
            await fetchTopMovies();
        } else {
            await fetchCategoryMovies(currentCategory);
        }
    });
});

const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        if (currentCategory === 'all') {
            fetchTopMovies(true);
        } else {
            fetchCategoryMovies(currentCategory, true);
        }
    });
}

fetchTopMovies();