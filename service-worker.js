const CACHE_NAME = "inclinacio-pedra-v2";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json"
];

// ---------------- INSTALL ----------------
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ---------------- ACTIVATE ----------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// ---------------- FETCH (NETWORK FIRST) ----------------
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Actualitza cache amb versió nova
        const responseClone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // Si no hi ha internet → cache
        return caches.match(event.request);
      })
  );
});