self.addEventListener('install', (e) => {
  console.log('🛠 Instalando service worker...');
  e.waitUntil(
    caches.open('genomotion-v1').then((cache) =>
      cache.addAll([
        '/genomotion/',
        '/genomotion/index.html',
        '/genomotion/manifest.json',
        '/genomotion/icon-192.png',
        '/genomotion/icon-512.png',
      ])
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
