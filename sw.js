/* Service Worker: App-Dateien offline verfügbar, Schriften werden beim ersten Laden zwischengespeichert.
   Nach Änderungen an den Dateien VERSION erhöhen, damit Geräte die neue Fassung laden. */
var VERSION = 'krafttraining-v2';
var CORE = ['./', 'index.html', 'styles.css', 'app.js', 'kt-voice.js', 'kt-classify.js', 'kt-stats.js', 'kt-media.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // Google Fonts: Cache zuerst, sonst Netz und merken
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION).then(function (c) {
      return c.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) { c.put(req, res.clone()); return res; }).catch(function () { return hit; });
      });
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Eigene Dateien: Netz zuerst (damit Updates ankommen), offline aus dem Cache
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined); });
  }));
});
