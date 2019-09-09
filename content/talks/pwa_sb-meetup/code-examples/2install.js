// Installation happens after registration or
// when service worker is outdated.

self.addEventListener('install', event => {
  // use Cache API here to cache assets, etc.
  // ...
  // cache the family guy gif
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('/pwa-steroid.gif'))
  );
});
