let cacheName = 'v1';

// Call Install Event

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('Restaraunt Reviews').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/restaurant.html',
        '/data/restaurants.json',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/css/styles.css',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    })
  );
});

// Call Activate Event

self.addEventListener('activate', function (event) {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cache) {
        if (cache !== cacheName) {
          console.log('Service Worker: Clearing Old Cache');
          return caches.delete(cache);
        }
      }));
    })
  );
});

// Call Fetch Event

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});