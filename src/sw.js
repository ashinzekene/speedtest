var CACHE_NAME = 'speedtest-v1';
var urlsToCache = [
  '/speedtest/',
  '/speedtest/favicon.svg',
  '/speedtest/dist/manifest.json',
  '/speedtest/dist/css/index.css',
  '/speedtest/dist/scripts/index.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.delete('my-site-cache-v1')
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then((response => response || fetch(event.request))
    )
  );
});