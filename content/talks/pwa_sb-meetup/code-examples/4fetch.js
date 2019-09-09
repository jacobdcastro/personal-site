self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the updated gif from the cache if the request is
  // same-origin and the path is '/pwa-steroid.gif'
  if (url.origin == location.origin && url.pathname == '/pwa-steroid.gif') {
    event.respondWith(caches.match('/pwa-steroid-2.gif'));
  }
});
