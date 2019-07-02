let staticCacheName = 'restaurant-cache-1';

// Call Install Event

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
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
    }).catch(function (error) {
      console.log(error);
    })
  );
});

// Call Activate Event

self.addEventListener('activate', function (event) {
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurant-') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        }));
    })
  );
});

// Call Fetch Event

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});