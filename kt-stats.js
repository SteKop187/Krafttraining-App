/* Auswertung aus den geloggten Sätzen (hist). Zeitachse wie im Diagramm: w = 40 ist heute, eine Woche entspricht 1.
   hist-Eintrag: { date:'JJJJ-MM-TT', name, cat, set, kg, reps, sec, r:'m'|'p'|'w' } */
(function () {
  "use strict";
  var KT = window.KT = window.KT || {};
  var DAY = 864e5;

  function dayStart(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function parseDate(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function ageDays(dateStr, now) { return Math.round((dayStart(now) - parseDate(dateStr)) / DAY); }

  /* Serien je Übung: ein Punkt pro Trainingstag */
  KT.buildSeries = function (hist, now) {
    now = now || new Date();
    var groups = {}, series = {};
    (hist || []).forEach(function (h) {
      var key = h.name + '|' + h.date;
      (groups[key] = groups[key] || { name: h.name, date: h.date, sets: [] }).sets.push(h);
    });
    Object.keys(groups).forEach(function (k) {
      var g = groups[k], s = series[g.name] = series[g.name] || { unit: 'kg', groups: [] };
      s.groups.push(g);
    });
    Object.keys(series).forEach(function (name) {
      var s = series[name], anyKg = false, anySec = false;
      s.groups.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });
      s.groups.forEach(function (g) { g.sets.forEach(function (x) { if (x.kg > 0) anyKg = true; if (x.sec > 0) anySec = true; }); });
      s.unit = anySec && !anyKg ? 's' : (anyKg ? 'kg' : 'Wdh.');
      s.pts = s.groups.map(function (g) {
        var v = 0, last = g.sets.slice().sort(function (a, b) { return (a.set || 0) - (b.set || 0); }).pop();
        g.sets.forEach(function (x) {
          var val = s.unit === 's' ? (x.sec || 0) : (s.unit === 'kg' ? (x.kg || 0) : (x.reps || 0));
          if (val > v) v = val;
        });
        return { w: 40 - ageDays(g.date, now) / 7, v: v, r: last && last.r ? last.r : 'p', date: g.date, n: g.sets.length };
      }).filter(function (p) { return p.v > 0; });
      s.uses = s.pts.length;
      if (!s.pts.length) delete series[name];
    });
    return series;
  };

  /* Wochenzeilen für die letzten `range` Wochen; w = 40-range ... 39, letzte Zeile enthält heute */
  KT.weekRows = function (hist, range, now) {
    now = now || new Date();
    var rows = [], i, ages = (hist || []).map(function (h) { return { a: ageDays(h.date, now), h: h }; });
    for (i = 0; i < range; i++) {
      var w = 40 - range + i, from = (39 - w) * 7, to = from + 7;
      var row = { w: w, schnell: 0, squat: 0, push: 0, hinge: 0, pull: 0, rumpf: 0, zusatz: 0, aufricht: 0, t: 0, n: 0 }, days = {};
      ages.forEach(function (x) {
        if (x.a >= from && x.a < to) {
          var hc = x.h.cat, c = hc === 'assist' ? 'rumpf' : (hc === 'haltung' || hc === 'huefte' || hc === 'mobil' ? 'aufricht' : hc);
          if (row[c] != null) { row[c]++; row.t++; }
          days[x.h.date] = 1;
        }
      });
      row.n = Object.keys(days).length;
      rows.push(row);
    }
    return rows;
  };

  KT.maxAgeWeeks = function (hist, now) {
    now = now || new Date();
    var m = 0; (hist || []).forEach(function (h) { m = Math.max(m, ageDays(h.date, now) / 7); });
    return Math.ceil(m);
  };

  /* Hinweise: Stagnation, wiederholt „Weniger“, steigender Trend */
  KT.tendencies = function (series) {
    var out = [];
    Object.keys(series).forEach(function (name) {
      var s = series[name], pts = s.pts, n = pts.length, vs = pts.map(function (p) { return p.v; }), step = s.unit === 's' ? 5 : 2.5;
      if (n >= 4 && pts.slice(-3).every(function (p) { return p.r === 'w'; })) {
        out.push({ icon: 'down', text: '<b>' + name + '</b> wurde dreimal in Folge mit „Weniger“ bewertet. Vorschlag: Last senken oder Pause verlängern.' });
        return;
      }
      if (n >= 6) {
        var last4 = vs.slice(-4), before = vs.slice(0, n - 4), best = Math.max.apply(null, before);
        if (Math.max.apply(null, last4) <= best && Math.max.apply(null, last4) - Math.min.apply(null, last4) <= step) {
          out.push({ icon: 'alert', text: '<b>' + name + '</b> stagniert seit 4 Einheiten bei ' + KT.fmt(last4[last4.length - 1]) + ' ' + s.unit + '. Deload (−30 % Volumen) oder Variation prüfen.' });
          return;
        }
      }
      var recent = pts.filter(function (p) { return p.w >= 28; });
      if (recent.length >= 5) {
        var t = KT.trend(recent), mon = t.b * 4.345;
        if (mon > 0.2) out.push({ icon: 'up', text: '<b>' + name + '</b> steigt seit mehreren Wochen, aktuell ' + KT.fmt(mon) + ' ' + s.unit + ' pro Monat.' });
      }
    });
    return out.slice(0, 5);
  };

  /* Übungen, die länger nicht (oder noch nie) trainiert wurden */
  KT.unused = function (lib, hist, now, days) {
    now = now || new Date(); days = days || 56;
    var last = {};
    (hist || []).forEach(function (h) { var a = ageDays(h.date, now); if (last[h.name] == null || a < last[h.name]) last[h.name] = a; });
    return lib.filter(function (e) { return last[e.name] == null || last[e.name] > days; })
      .map(function (e) { return { name: e.name, never: last[e.name] == null }; });
  };

  KT.trend = function (pts) {
    var n = pts.length, sx = 0, sy = 0, sxy = 0, sxx = 0;
    pts.forEach(function (p) { sx += p.w; sy += p.v; sxy += p.w * p.v; sxx += p.w * p.w; });
    var den = n * sxx - sx * sx;
    if (!den) return { a: n ? sy / n : 0, b: 0 };
    var b = (n * sxy - sx * sy) / den;
    return { a: (sy - b * sx) / n, b: b };
  };
  KT.fmt = function (v, d) { return Number(v).toLocaleString('de-DE', { maximumFractionDigits: d == null ? 1 : d }); };
})();
