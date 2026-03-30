const CACHE_NAME = 'directorio-v3';

// Archivos estáticos a cachear (imágenes + página + imagen intermedia)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Imagen intermedia nueva
  './img/DISEÑO-ALZA-TU-VOZ_page-0001.jpg',
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

// Instalar y cachear todos los archivos estáticos
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando archivos estáticos...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Limpiar caches viejos al activar
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: videos van directo a la red (HTTP cache del navegador maneja Range Requests)
// Todo lo demás: Cache first, luego red
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Los videos usan Range Requests — dejar que el navegador los maneje con HTTP cache
  if (url.includes('/video/') || url.endsWith('.mp4') || url.endsWith('.webm')) {
    return; // Sin respondWith → el navegador usa su caché HTTP nativo
  }

  // Para imágenes y archivos estáticos: Cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Guardar en caché si es una respuesta válida
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
