const searchInput = document.getElementById('searchInput');
        const wispSelect = document.getElementById('wispSelect');
        const backendSelect = document.getElementById('backendSelect');
        const browserContainer = document.getElementById('browser-container');
        const browserIframe = document.getElementById('browser-iframe');
        const browserUrlInput = document.getElementById('browserUrlInput');
        const mainContent = document.getElementById('main-content');

        wispSelect.value = localStorage.getItem('wisp_server') || 'wss://wisp.rhw.one/';
        backendSelect.value = localStorage.getItem('backend') || 'ultraviolet';

        wispSelect.addEventListener('change', () => {
            localStorage.setItem('wisp_server', wispSelect.value);
        });

        backendSelect.addEventListener('change', () => {
            localStorage.setItem('backend', backendSelect.value);
        });

        function search() {
            let input = searchInput.value.trim();
            if (!input) return;

            let url = input;

            if (!url.includes(".") || url.includes(" ")) {
                url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
            } else {
                if (!url.startsWith("http://") && !url.startsWith("https://")) {
                    url = "https://" + url;
                }
            }

            navigate(url);
        }

        function navigate(url) {
            const wisp = wispSelect.value;
            const backend = backendSelect.value;

            const searcherUrl = `searcher.html?q=${encodeURIComponent(url)}&wisp=${encodeURIComponent(wisp)}&backend=${encodeURIComponent(backend)}`;
            
            browserIframe.src = searcherUrl;
            browserUrlInput.value = url;
            
            mainContent.style.display = 'none';
            browserContainer.classList.add('active');
        }

        function navigateFromBar() {
            let input = browserUrlInput.value.trim();
            if (!input) return;

            let url = input;
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                if (url.includes(".")) {
                    url = "https://" + url;
                } else {
                    url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
                }
            }

            navigate(url);
        }

        function goBack() {
            browserContainer.classList.remove('active');
            browserIframe.src = '';
            mainContent.style.display = 'flex';
            searchInput.value = '';
            browserUrlInput.value = '';
        }

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                search();
            }
        });

        browserUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                navigateFromBar();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && browserContainer.classList.contains('active')) {
                goBack();
            }
        });