/* Service worker: chạy được khi mất mạng, báo khi có bản mới */
const PHIEN_BAN = "so-no-v3-5";
const TAI_SAN = ["./", "./index.html", "./app.css", "./app.js", "./icon.svg", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(PHIEN_BAN).then((c) => c.addAll(TAI_SAN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== PHIEN_BAN).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Không đụng vào Firebase: luôn đi thẳng ra mạng
  if (/googleapis\.com|firebaseio\.com|gstatic\.com\/firebasejs/.test(url.href)) return;

  // Trang chính: ưu tiên mạng để nhận bản mới, hỏng thì lấy bản đã lưu
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    e.respondWith(
      fetch(req).then((r) => {
        const ban = r.clone();
        caches.open(PHIEN_BAN).then((c) => c.put(req, ban));
        return r;
      }).catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
    return;
  }

  // Còn lại: lấy bản đã lưu trước cho nhanh
  e.respondWith(
    caches.match(req).then((m) => m || fetch(req).then((r) => {
      if (r.ok && (url.origin === location.origin || /unpkg\.com/.test(url.href))) {
        const ban = r.clone();
        caches.open(PHIEN_BAN).then((c) => c.put(req, ban));
      }
      return r;
    }))
  );
});
