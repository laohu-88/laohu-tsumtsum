const CACHE_NAME = "laohu-tsumtsum-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./game.js",
  "./manifest.json",
  "./pop_bomb.wav",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  ...Array.from({ length: 51 }, (_, index) => `./assets/${index + 76}.png`),
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

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    }),
  );
});
