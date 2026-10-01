/* Sprachbefehle für den Tagesplan: Normalisierung, unscharfer Namensabgleich, Befehlserkennung.
   Reine Funktionen ohne Zugriff auf die Oberfläche, damit sie sich testen lassen. */
(function () {
  "use strict";
  var KT = window.KT = window.KT || {};

  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function lev(a, b) {
    var m = a.length, n = b.length, i, j, prev, cur, t;
    if (!m) return n; if (!n) return m;
    prev = []; for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        t = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + t);
      }
      prev = cur;
    }
    return prev[n];
  }
  function tokenSim(q, t) {
    if (q === t) return 1;
    if (q.length >= 4 && t.length >= 4 && (t.indexOf(q) === 0 || q.indexOf(t) === 0)) return 0.9;
    if (q.length >= 4 && t.indexOf(q) > -1) return 0.8;
    var s = 1 - lev(q, t) / Math.max(q.length, t.length);
    return s >= 0.7 ? s : 0;
  }
  function score(query, name) {
    var qt = norm(query).split(' ').filter(Boolean), nt = norm(name).split(' ').filter(Boolean), sum = 0;
    if (!qt.length || !nt.length) return 0;
    qt.forEach(function (q) {
      var best = 0;
      nt.forEach(function (t) { best = Math.max(best, tokenSim(q, t)); });
      sum += best;
    });
    var cover = sum / qt.length;
    var penalty = nt.length > qt.length ? 0.9 + 0.1 * qt.length / nt.length : 1;
    return cover * penalty;
  }
  /* Trefferliste, beste zuerst; min = Mindestscore */
  function rank(query, items, minScore) {
    var min = minScore == null ? 0.6 : minScore;
    return items.map(function (it, i) { return { item: it, idx: i, score: score(query, it.name) }; })
      .filter(function (x) { return x.score >= min; })
      .sort(function (a, b) { return b.score - a.score; });
  }

  var CATWORDS = {
    'schnell': 'schnell', 'schnellkraft': 'schnell',
    'squat': 'squat', 'squats': 'squat', 'kniedominant': 'squat',
    'drucken': 'push', 'push': 'push',
    'ziehen': 'pull', 'pull': 'pull',
    'hinge': 'hinge', 'huftdominant': 'hinge',
    'rumpf': 'rumpf', 'core': 'rumpf',
    'assistenz': 'assist'
  };
  function catOf(q) {
    var n = norm(q).replace(/^(?:die|den|das|eine|ein)\s+/, '').replace(/\s*(?:ubung|ubungen)$/, '').trim();
    return CATWORDS[n] || null;
  }
  function cap(s) {
    return String(s || '').trim().replace(/\s+/g, ' ').replace(/(^|[\s-])(\S)/g, function (m, a, b) { return a + b.toUpperCase(); });
  }
  function clean(q) { return String(q || '').replace(/^(?:die|der|den|das|eine|ein|einen|mal)\s+/i, '').replace(/\s*(?:bitte|mal)$/i, '').trim(); }

  /* ctx = { plan:[{name,cat}], lib:[{name,cat}] } */
  KT.parseVoice = function (text, ctx) {
    var raw = String(text || '').trim(), n = norm(raw), m, plan = ctx.plan || [], lib = ctx.lib || [];
    var help = 'Das habe ich nicht verstanden. Sag zum Beispiel „Tausche Latzug gegen Klimmzug“, „Streiche Face Pull“ oder „Füge Hip Thrust hinzu“.';
    if (!n) return { ok: false, msg: 'Ich habe nichts gehört. Tippe auf das Mikrofon und sprich, oder tippe den Befehl.' };

    function findPlan(q) {
      var c = catOf(q), r;
      if (c) {
        for (var i = 0; i < plan.length; i++) if (plan[i].cat === c) return { idx: i, name: plan[i].name, byCat: c };
      }
      r = rank(clean(q), plan);
      return r.length ? { idx: r[0].idx, name: r[0].item.name } : null;
    }
    function findLib(q, excludeNames) {
      var r = rank(clean(q), lib).filter(function (x) { return !(excludeNames || []).some(function (e) { return e === x.item.name; }); });
      return r.length ? { name: r[0].item.name, cat: r[0].item.cat, alts: r.slice(1, 3).map(function (x) { return x.item.name; }) } : null;
    }
    var planNames = plan.map(function (p) { return p.name; });

    /* neue Übung anlegen */
    m = raw.match(/neue\s+(?:ü|ue|u)bung(?:\s+anlegen)?\s*[:,]?\s*(.*)$/i);
    if (m) return { ok: true, kind: 'newex', name: cap(m[1]) };

    /* ganzen Plan neu würfeln */
    if (/^(?:wurfle|wurfel|wuerfle|wuerfel)\s+(?:alles|alle|den plan|plan|die ubungen)(?:\s+neu)?$/.test(n) || /^(?:plan|alles)\s+neu(?:\s+wurfeln)?$/.test(n) || /^neuer plan$/.test(n))
      return { ok: true, kind: 'rerollall' };

    /* ersetzen: tausche A gegen B */
    m = n.match(/^(?:tausche|tausch|ersetze|wechsle|wechsel)\s+(.+?)\s+(?:gegen|durch|mit|zu|in)\s+(.+)$/);
    if (m) {
      var from = findPlan(m[1]);
      if (!from) return { ok: false, msg: '„' + cap(m[1]) + '“ ist nicht im heutigen Plan.' };
      var to = findLib(m[2], planNames.filter(function (x) { return x !== from.name; }));
      if (!to) return { ok: false, msg: '„' + cap(m[2]) + '“ gibt es in der Bibliothek nicht.', suggestNew: cap(m[2]) };
      if (to.name === from.name) return { ok: false, msg: from.name + ' steht schon im Plan.' };
      return { ok: true, kind: 'replace', from: from, to: to };
    }

    /* hinzufügen */
    m = n.match(/^(?:fuge|fuege|erganze|ergaenze|nimm|nehme|packe|pack|setze|schreibe)\s+(.+?)\s+(?:hinzu|dazu|rein|auf|in den plan|in die einheit)$/) ||
        n.match(/^(?:fuge|fuege|erganze|ergaenze)\s+(.+)$/) ||
        n.match(/^(.+?)\s+(?:hinzufugen|hinzufuegen|dazunehmen|erganzen)$/);
    if (m) {
      var add = findLib(m[1]);
      if (!add) return { ok: false, msg: '„' + cap(m[1]) + '“ gibt es in der Bibliothek nicht.', suggestNew: cap(m[1]) };
      if (planNames.indexOf(add.name) > -1) return { ok: false, msg: add.name + ' steht schon im Plan.' };
      return { ok: true, kind: 'add', to: add };
    }

    /* streichen */
    m = n.match(/^(?:streiche|streich|entferne|entfern|loesche|losche|wirf|nimm)\s+(.+?)(?:\s+(?:weg|raus|heraus|aus dem plan|aus der einheit))?$/) ||
        n.match(/^lass\s+(.+?)\s+(?:weg|raus|aus)$/) ||
        n.match(/^(.+?)\s+(?:streichen|entfernen|loschen|rausnehmen|weglassen)$/);
    if (m) {
      var rm = findPlan(m[1]);
      if (!rm) return { ok: false, msg: '„' + cap(m[1]) + '“ ist nicht im heutigen Plan.' };
      return { ok: true, kind: 'remove', idx: rm.idx, name: rm.name };
    }

    /* neu würfeln einzelne Übung oder Muster */
    m = n.match(/^(?:wurfle|wurfel|wuerfle|wuerfel)\s+(.+?)(?:\s+neu)?$/) || n.match(/^(?:ersetze|tausche|wechsle)\s+(.+)$/) || n.match(/^(.+?)\s+neu\s+wurfeln$/);
    if (m) {
      var rr = findPlan(m[1]);
      if (!rr) return { ok: false, msg: '„' + cap(m[1]) + '“ ist nicht im heutigen Plan.' };
      return { ok: true, kind: 'reroll', idx: rr.idx, name: rr.name };
    }
    return { ok: false, msg: help };
  };

  KT.norm = norm;
  KT.rankNames = rank;
  KT.cap = cap;
})();
