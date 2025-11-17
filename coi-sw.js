/* coi-sw.js (C) 2023-present SheetJS LLC -- https://sheetjs.com */
self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", function (event) {
  const r = event.request;
  if (r.destination === "document" || r.destination === "worker") {
    event.respondWith(
      fetch(r).then((res) => {
        const h = new Headers(res.headers);
        h.set("Cross-Origin-Opener-Policy", "same-origin");
        h.set("Cross-Origin-Embedder-Policy", "require-corp");
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
      }).catch((e) => console.error(e))
    );
  } else {
    event.respondWith(fetch(r));
  }
});
