const CACHE_NAME = "laohu-tsumtsum-v63";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./game.js?v=63",
  "./manifest.json?v=45",
  "./vendor/pixi.min.js",
  "./vendor/matter.min.js",
  "./icons/icon-192.png?v=45",
  "./icons/icon-512.png?v=45",
];

const CACHE_FIRST_DESTINATIONS = new Set(["image", "audio", "font"]);
const CACHE_FIRST_EXTENSIONS = /\.(?:png|webp|jpg|jpeg|gif|svg|wav|mp3|ogg|m4a)$/i;

function isSameOrigin(request) {
  return new URL(request.url).origin === self.location.origin;
}

function isCacheFirstRequest(request) {
  if (!isSameOrigin(request)) {
    return false;
  }

  const url = new URL(request.url);
  return CACHE_FIRST_DESTINATIONS.has(request.destination) || CACHE_FIRST_EXTENSIONS.test(url.pathname);
}

async function putInCache(request, response) {
  if (!response || !response.ok) {
    return;
  }
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

async function fetchAndCache(request) {
  const response = await fetch(request);
  putInCache(request, response).catch(() => {});
  return response;
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  return fetchAndCache(request);
}

async function networkFirst(request, fallbackRequest = null) {
  try {
    return await fetchAndCache(request);
  } catch {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    if (fallbackRequest) {
      const fallback = await caches.match(fallbackRequest);
      if (fallback) {
        return fallback;
      }
    }
    return Response.error();
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(CORE_ASSETS.map((asset) => cache.add(asset).catch(() => null))))
      .then(() => self.skipWaiting()),
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
    event.respondWith(networkFirst(event.request, "./index.html"));
    return;
  }

  if (isCacheFirstRequest(event.request)) {
    event.respondWith(cacheFirst(event.request).catch(() => Response.error()));
    return;
  }

  event.respondWith(networkFirst(event.request));
});
