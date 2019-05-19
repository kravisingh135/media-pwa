const cacheName = 'media-pwa-v2';
const filesToCache = [
 "./",
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

self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("[Servicework] Install");
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell", cacheName);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Servicework] Activate");
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log("[ServiceWorker] Removing old cache shell", key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});