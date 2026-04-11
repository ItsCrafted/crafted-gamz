const CACHE_NAME = 'desktop-app-cache-v1';
const CDN_BASE = 'https://apps.cdn.cgamz.onlineall-app-stuff';

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.hostname === 'apps.cdn.cgamz.online') {
    let newPath = url.pathname;
    if (!newPath.startsWith('all-app-stuff/')) {
      newPath = 'all-app-stuff' + (newPath.startsWith('/') ? newPath : '/' + newPath);
    }

    const rewrittenUrl = `${url.protocol}//${url.hostname}${newPath}${url.search}`;
    const rewrittenRequest = new Request(rewrittenUrl, {
      method: event.request.method,
      headers: event.request.headers,
      mode: 'cors',
      credentials: event.request.credentials,
    });

    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(rewrittenRequest).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('Serving from cache:', rewrittenUrl);
            return cachedResponse;
          }
          return fetch(rewrittenRequest).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              console.log('Caching:', rewrittenUrl);
              cache.put(rewrittenRequest, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  }
});