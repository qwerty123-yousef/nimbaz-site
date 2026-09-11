/* نیم‌باز sw — mtxfxb50 */
const C = "nb-mtxfxb50";
const PRE = ["/","/index.html","/ad.html","/nb.css","/js/home.js","/js/ad.js","/iran.json","/favicon.png","/manifest.webmanifest","/fonts/Vazirmatn-Regular.woff2","/fonts/Vazirmatn-Bold.woff2"];
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then((c) => c.addAll(PRE)).catch(() => {}));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) =>
      Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;      // سوپابیس و بیرون: دست‌نخورده
  if (url.pathname.startsWith("/app/")) return;    // قلمروِ اپ فلاتر
  if (url.pathname.startsWith("/sw.js")) return;

  // صفحه‌ها: از حافظه فوری بده، در پس‌زمینه تازه کن
  if (req.mode === "navigate") {
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) => {
        const net = fetch(req)
          .then((res) => {
            if (res && res.ok)
              caches.open(C).then((c) => c.put(req, res.clone()));
            return res;
          })
          .catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // دارایی‌های ثابت: اول حافظه، بعد شبکه
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res && res.ok && (res.type === "basic" || res.type === "default"))
            caches.open(C).then((c) => c.put(req, res.clone()));
          return res;
        })
    )
  );
});
