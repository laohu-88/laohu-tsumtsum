const CACHE_NAME = "laohu-tsumtsum-v42";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./game.js",
  "./game.js?v=42",
  "./manifest.json",
  "./manifest.json?v=42",
  "./vendor/pixi.min.js",
  "./vendor/matter.min.js",
  "./connect.wav",
  "./connect.wav?v=11",
  "./link.wav",
  "./pop.wav",
  "./pop_bomb.wav",
  "./pop_big.wav",
  "./collection-assets.json",
  "./collection-assets.json?v=3",
  "./collection-catalog.json",
  "./collection-catalog.json?v=1",
  "./icons/icon-192.png",
  "./icons/icon-192.png?v=42",
  "./icons/icon-512.png",
  "./icons/icon-512.png?v=42",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate" || event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});
