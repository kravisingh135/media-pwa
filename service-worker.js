var dataCacheName = 'media-pwa';
var cacheName = 'media-pwa';
var filesToCache = [
  '/',
 "./images",
 "./images/1.png",
 "./images/2.png",
 "./images/3.png",
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

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
