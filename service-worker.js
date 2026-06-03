const CACHE_NAME = "laohu-tsumtsum-v52";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./game.js",
  "./game.js?v=52",
  "./character-alignments.json",
  "./manifest.json",
  "./manifest.json?v=45",
  "./vendor/pixi.min.js",
  "./vendor/matter.min.js",
  "./connect.wav",
  "./connect.wav?v=11",
  "./link.wav",
  "./pop.wav",
  "./pop_bomb.wav",
  "./pop_big.wav",
  "./collection-catalog.json",
  "./collection-catalog.json?v=3",
  "./collection-character-assets.json",
  "./collection-character-assets.json?v=2",
  "./icons/icon-192.png",
  "./icons/icon-192.png?v=45",
  "./icons/icon-512.png",
  "./icons/icon-512.png?v=45",
  "./sszdy_assets/Sprite_Sprite_69871.png",
  "./sszdy_assets/Texture2D_Texture2D_69802.png",
  "./sszdy_assets/Sprite_Sprite_70061.png",
  "./sszdy_assets/Texture2D_Texture2D_70000.png",
  "./sszdy_assets/Texture2D_Texture2D_69904.png",
  "./sszdy_assets/Texture2D_Texture2D_69838.png",
  "./sszdy_assets/Texture2D_Texture2D_69887.png",
  "./sszdy_assets/Sprite_Sprite_69882.png",
  "./sszdy_assets/Sprite_Sprite_69965.png",
  "./sszdy_assets/Texture2D_Texture2D_69844.png",
  "./sszdy_assets/Texture2D_Texture2D_69810.png",
  "./sszdy_assets/Sprite_Sprite_69967.png",
  "./sszdy_assets/Texture2D_Texture2D_69921.png",
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
