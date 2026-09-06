/* Service worker
   Nguyen tac: file cua chinh trang luon lay tu mang truoc, chi dung ban luu khi mat mang. */

const KHO = "so-no-v4";
const TAI_SAN = ["./", "./index.html", "./app.css", "./app.js", "./icon.svg", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(KHO).then((c) => c.addAll(TAI_SAN).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== KHO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "xoa-bo-nho-dem") {
    caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => { if (e.source && e.source.postMessage) e.source.postMessage("da-xoa"); });
  }
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }

  if (/googleapis\.com|firebaseio\.com|firebaseapp\.com|gstatic\.com/.test(url.href)) return;

  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then((r) => {
          if (r && r.ok) { const ban = r.clone(); caches.open(KHO).then((c) => c.put(req, ban)); }
          return r;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((m) => m || fetch(req).then((r) => {
      if (r && r.ok) { const ban = r.clone(); caches.open(KHO).then((c) => c.put(req, ban)); }
      return r;
    }))
  );
});
