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
  // const resultURL = e.data.json().data.click_action;

  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: 'https://s3.youm.me/uhbooba/icons/pig_face.png',
    // data: { click_action: resultURL },
  };

  console.log('notificationTitle', notificationTitle);
  console.log('notificationOptions', notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('notificationclick', function (event) {
//   const resultURL = event.notification.data.click.action;
//   event.waitUntil(clients.openWindow(resultURL));
//   event.notification.close();
// });
