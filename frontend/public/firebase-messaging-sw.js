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
  const resultURL = e.data.json().data.click_action;

  const notificationTitle = resultData.notificationTitle;
  const notificationoptions = {
    body: resultData.body,
    icon: resultData.image,
    data: { click_action: resultURL },
  };

  self.registration.showNotification(notificationTitle, notificationoptions);
});

self.addEventListener('notificationclick', function (event) {
  const resultURL = event.notification.data.click.action;
  event.waitUntil(clients.openWindow(resultURL));
  event.notification.close();
});
