const CACHE_NAME = 'directorio-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Imágenes principales
  './img/tarjetasfinal-01.png',
  './img/tarjetasfinal-02.png',
  './img/tarjetasfinal-03.png',
  './img/tarjetasfinal-04.png',
  './img/tarjetasfinal-05.png',
  './img/tarjetasfinal-07.png',
  './img/tarjetasfinal-08.png',
  './img/tarjetasfinal-12.png',
  './img/tarjetasfinal-13.png',
  './img/tarjetasfinal-15.png',
  './img/tarjetasfinalblanco.png',
  // Imágenes planta1
  './img/planta1/tarjetasfinal1planta-01.png',
  './img/planta1/tarjetasfinal1planta-02.png',
  './img/planta1/tarjetasfinal1planta-03.png',
  './img/planta1/tarjetasfinal1planta-04.png',
  './img/planta1/tarjetasfinal1planta-05.png',
  './img/planta1/tarjetasfinal1planta-06.png',
  './img/planta1/tarjetasfinal1planta-07.png',
  './img/planta1/tarjetasfinal1planta-08.png',
  './img/planta1/tarjetasfinal1planta-09.png',
  './img/planta1/tarjetasfinal1planta-10.png',
  './img/planta1/tarjetasfinal1planta-11.png',
  './img/planta1/tarjetasfinal1planta-12.png',
  './img/planta1/tarjetasfinal1planta-13.png',
  './img/planta1/tarjetasfinal1planta-14.png',
  './img/planta1/tarjetasfinal1planta-15.png',
  './img/planta1/tarjetasfinal1planta-16.png',
  // Imágenes Tarjeta2planta
  './img/Tarjeta2planta/tarjetasfinal2planta-01.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-02.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-03.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-04.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-05.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-06.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-07.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-08.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-09.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-10.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-11.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-12.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-13.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-14.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-15.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-16.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-17.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-18.png',
  './img/Tarjeta2planta/tarjetasfinal2planta-19.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
