const PRECACHE = 'media-pwa-v1';
const RUNTIME = 'media-pwa';
const PRECACHE_URLS = [
"index.html",
 "./",
 "./images",
 "./images/1.png",
 "./images/2.png",
 "./images/3.png",
 "./images/icons/1.png",
 "./images/icons/2.png",
 "./images/icons/3.png",
 "./images/ad-img.png",
 "./images/Apparel-1.svg",
 "./images/Automotive-1.svg",
 "./images/bread.png",
 "./images/cheese.png",
 "./images/coffee.png",
 "./images/Computers-1.svg",
 "./images/Credit Cards-1.svg",
 "./images/diaper.png",
 "./images/dog.png",
 "./images/Electroincs-1.svg",
 "./images/flash-offer.png",
 "./images/Games-1.svg",
 "./images/Grocery-1.svg",
 "./images/header-img.png",
 "./images/ico-expand.svg",
 "./images/ico-heading-style.svg",
 "./images/ico-menu.svg",
 "./images/ico-mouse-down.svg",
 "./images/ico-search.svg",
 "./images/logo.png",
 "./images/icons/logo.png",
 "./images/milk.png",
 "./images/shampoo.png",
 "./images/Travel-1.svg",
 "./images/yogurt.png",
 "./index.html",
 "./manifest.json",
 "./scripts",
 "./scripts/app.js",
 "./scripts/jquery-3.3.1.js",
 "./service-worker.js",
 "./styles",
 "./styles/style.css"
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
