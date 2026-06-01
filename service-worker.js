const CACHE_NAME = "laohu-tsumtsum-v25";
const FIRST_SPRITE_ID = 1;
const TOTAL_SPRITES = 422;
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./game.js",
  "./game.js?v=25",
  "./manifest.json",
  "./vendor/pixi.min.js",
  "./vendor/matter.min.js",
  "./connect.wav",
  "./connect.wav?v=11",
  "./link.wav",
  "./pop.wav",
  "./pop_bomb.wav",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  ...Array.from({ length: TOTAL_SPRITES }, (_, index) => `./assets/${index + FIRST_SPRITE_ID}.png`),
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
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
