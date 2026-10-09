/* Service Worker: App-Dateien offline verfügbar, Schriften werden beim ersten Laden zwischengespeichert.
   Die Versionsnummer kommt aus kt-version.js (eine Änderung dort lädt auf den Geräten die neue Fassung). */
importScripts('kt-version.js');
var VERSION = 'krafttraining-v' + self.KT_VERSION;
var CORE = ['./', 'index.html', 'styles.css', 'app.js', 'kt-version.js', 'kt-i18n.js', 'kt-i18n-data.js', 'kt-info.js', 'kt-voice.js', 'kt-classify.js', 'kt-stats.js', 'kt-media.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  // cache:'reload' holt jede Datei frisch vom Server (GitHub erlaubt Browsern sonst bis zu 10 Minuten Zwischenspeicher)
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return Promise.all(CORE.map(function (u) {
      return fetch(u, { cache: 'reload' }).then(function (r) { if (!r.ok) throw new Error(u); return c.put(u, r); });
    }));
  }).then(function () { return self.skipWaiting(); }));
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
  // Eigene Dateien: Netz zuerst und beim Server nachfragen (no-cache), damit Updates sofort ankommen; offline aus dem Cache
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined); });
  }));
});
