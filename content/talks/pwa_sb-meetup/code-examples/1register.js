// This code registers the service worker upon initial load.
// Service worker registration only happens once!

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        console.log(
          'Service Worker registration completed with scope: ',
          registration.scope
        );
      },
      err => {
        console.log('Service Worker registration failed', err);
      }
    );
  });
} else {
  console.log('Service Workers not supported');
}
