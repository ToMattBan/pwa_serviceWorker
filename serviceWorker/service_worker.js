const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
const OFFLINE_URL = "./offline.html";

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }))
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      if ("naviagtionPreload" in self.registration) {
        await self.registration.navigationPreload.enavle();
      }
    })()
  );

  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          const preloadResponse = await e.preloadResponse;
          if (preloadResponse) return preloadResponse

          const networkReponse = await fetch(e.request);
          return networkReponse;
        } catch (error) {
          console.log("Fetch falhou, retornando página offline", error);

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
})