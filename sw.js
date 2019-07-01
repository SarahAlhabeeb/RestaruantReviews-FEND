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

self.addEventListener('activate', function (event) {
  var cacheKeeplist = ['v2'];

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (event) {

  console.log(event.request.url);

  event.respondWith(

    caches.match(event.request).then(function (response) {

      return response || fetch(event.request);
    })
  );
});