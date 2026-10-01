/* Medien zu Übungen: Fotos/Videos als Blobs in IndexedDB (nur auf diesem Gerät), Links mit YouTube-Vorschau.
   Die Beschreibung der Medien (Titel, Typ, Link) liegt zusammen mit den übrigen Daten in app.js. */
(function () {
  "use strict";
  var KT = window.KT = window.KT || {};
  var DB = 'krafttraining-media', STORE = 'blobs', dbp = null, urls = {};

  function open() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      if (!window.indexedDB) { rej(new Error('IndexedDB nicht verfügbar')); return; }
      var rq = indexedDB.open(DB, 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore(STORE, { keyPath: 'id' }); };
      rq.onsuccess = function () { res(rq.result); };
      rq.onerror = function () { rej(rq.error); };
    });
    return dbp;
  }
  function run(mode, fn) {
    return open().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction(STORE, mode), st = tx.objectStore(STORE), rq = fn(st);
        tx.oncomplete = function () { res(rq && rq.result); };
        tx.onerror = tx.onabort = function () { rej(tx.error); };
      });
    });
  }
  function uid() { return 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  /* Bild auf maximal maxPx Kantenlänge verkleinern (JPEG), spart Speicher */
  function resizeImage(file, maxPx) {
    maxPx = maxPx || 1600;
    return new Promise(function (res) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var s = Math.min(1, maxPx / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { res(b || file); }, 'image/jpeg', 0.85);
      };
      img.onerror = function () { URL.revokeObjectURL(url); res(file); };
      img.src = url;
    });
  }

  KT.media = {
    uid: uid,
    persist: function () { try { if (navigator.storage && navigator.storage.persist) return navigator.storage.persist(); } catch (e) {} return Promise.resolve(false); },
    /* Datei speichern, liefert Beschreibung für app.js */
    addFile: function (file) {
      var isVideo = /^video\//.test(file.type), isImage = /^image\//.test(file.type);
      if (!isVideo && !isImage) return Promise.reject(new Error('Nur Fotos und Videos werden unterstützt.'));
      var prep = isImage ? resizeImage(file, 1600) : Promise.resolve(file);
      return prep.then(function (blob) {
        var id = uid();
        return run('readwrite', function (st) { return st.put({ id: id, blob: blob, type: blob.type || file.type, size: blob.size }); }).then(function () {
          return { id: id, type: isVideo ? 'video' : 'image', title: file.name.replace(/\.[^.]+$/, ''), size: blob.size, added: Date.now() };
        });
      });
    },
    url: function (id) {
      if (urls[id]) return Promise.resolve(urls[id]);
      return run('readonly', function (st) { return st.get(id); }).then(function (rec) {
        if (!rec || !rec.blob) return null;
        urls[id] = URL.createObjectURL(rec.blob); return urls[id];
      });
    },
    remove: function (id) {
      if (urls[id]) { URL.revokeObjectURL(urls[id]); delete urls[id]; }
      return run('readwrite', function (st) { return st.delete(id); });
    },
    ytId: function (url) {
      var m = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/);
      return m ? m[1] : null;
    },
    /* Link normalisieren: ohne Schema wird https:// ergänzt, nur http(s) erlaubt */
    cleanUrl: function (u) {
      u = String(u || '').trim(); if (!u) return null;
      if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u;
      try { var x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : null; } catch (e) { return null; }
    },
    host: function (u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return u; } },
    size: function (b) { return b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.round(b / 1024) + ' KB'; }
  };
})();
