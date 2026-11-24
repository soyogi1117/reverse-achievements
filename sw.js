
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      body: event.data ? event.data.text() : ""
    };
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || "逆村広場",
      {
        body: data.body || "新しい通知があります。",
        data: {
          url: "/reverse-achievements/"
        }
      }
    )
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow("/reverse-achievements/")
  );
});
