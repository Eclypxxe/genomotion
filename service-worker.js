const CACHE_NAME = 'genomotion-cache-v1';
const URLS_TO_CACHE = [
  '/genomotion/',
  '/genomotion/index.html',
  '/genomotion/manifest.json',
  '/genomotion/icon-192.png',
  '/genomotion/icon-512.png',
  // Agrega aquí otros archivos estáticos si los tienes
];

// Instalación: cachear archivos
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Archivos cacheados');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activación: limpiar caches antiguos
self.addEventListener('activate', (event) => {
  console.log('[SW] Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Intercepción de peticiones
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Responder desde la caché o hacer petición normal
      return response || fetch(event.request);
    })
  );
});
