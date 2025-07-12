const CACHE_NAME = "crafted-offline-cache-v1";
const OFFLINE_URL = "no-wifi/offline.html";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        OFFLINE_URL,
        "no-wifi/offline.html",
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});
