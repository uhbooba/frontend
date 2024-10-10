self.addEventListener('install', function (e) {
  console.log('install...');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('activate...');
});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const resultURL = 'https://j11a402.q.ssafy.io/';

  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: 'https://s3.youm.me/uhbooba/icons/pig_face.png',
    data: { click_action: resultURL },
  };

  console.log('notificationTitle', notificationTitle);
  console.log('notificationOptions', notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  const resultURL = event.notification.data.click_action;

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        for (const client of clientList) {
          if (client.url === resultURL && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(resultURL);
        }
      }),
  );

  event.notification.close();
});
