importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const CACHE_NAME = "firstsubs";

workbox.precaching.precacheAndRoute([
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },  
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/sw.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/icons-192.png', revision: '1' },
  { url: '/icons-512.png', revision: '1' },
  { url: '/icon', revision: '1' }
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses:[200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds :60*60*24*365,
          maxEntries:30,
        }),
      ]
  })
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'icon-512.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});