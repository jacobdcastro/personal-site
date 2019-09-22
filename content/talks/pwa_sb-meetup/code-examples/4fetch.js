// intercepting a fetch request

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cached gif if the request is
  // same-origin and the path is '/images'
  if (url.origin == location.origin && url.pathname == '/boring.gif') {
    event.respondWith(caches.match('/pwa-steroid.gif'));
  }
});
