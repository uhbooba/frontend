const cacheName = 'cache';
const cacheFiles = ['/', '/index.html'];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    }),
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name); // 이전 버전의 캐시를 삭제
          }
        }),
      );
    }),
  );
  self.clients.claim(); // 활성화 단계에서 모든 클라이언트에 즉시 적용
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
