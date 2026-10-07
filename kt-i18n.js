/* Deutsch/Englisch: Wörterbuch und Übersetzer für die Oberfläche.
   Die App erzeugt ihre Texte auf Deutsch; im englischen Modus werden sie nach dem Zeichnen übersetzt (Textknoten und Beschriftungen).
   Nur wo es Sinn macht: Fachbegriffe wie Hinge, Split Squat oder Hip Thrust bleiben, wie sie sind.
   Schlüssel mit {1}, {2} … stehen für dynamische Teile (Zahlen, Namen), sie werden ebenfalls übersetzt. */
(function () {
  "use strict";
  var KT = window.KT = window.KT || {};
  var LANG = 'de';
  try { LANG = localStorage.getItem('kt-lang') === 'en' ? 'en' : 'de'; } catch (e) {}

  /* ---------- Übungsnamen (eingebaute) ---------- */
  var EXEN = {
    'MedBall-Rotationswurf': 'Med ball rotational throw', 'Box Sprung': 'Box jump', 'Hexbar Züge': 'Hex bar pulls', 'Sprung mit Kurzhantel': 'Dumbbell jump', 'MedBall-Brustwurf': 'Med ball chest throw',
    'Kniebeuge vorn': 'Front squat', 'Kniebeuge hinten': 'Back squat', 'Ausfallschritt': 'Lunge', 'Beinpresse': 'Leg press', 'Beinstrecker': 'Leg extension',
    'Bankdrücken': 'Bench press', 'Schrägbankdrücken': 'Incline dumbbell press', 'Überkopfdrücken': 'Overhead press', 'Kurzhantel-Schulterdrücken': 'Dumbbell shoulder press', 'Bankdrücken mit Bändern': 'Banded bench press', 'Brustpresse': 'Chest press',
    'Hexbar Kreuzheben': 'Hex bar deadlift', 'Rumänisches Kreuzheben': 'Romanian deadlift', 'Beinbeuger': 'Leg curl', 'Einbeiniges Kreuzheben': 'Single-leg deadlift',
    'Latzug': 'Lat pulldown', 'Klimmzug': 'Pull-up', 'Kurzhantel Rudern': 'Dumbbell row', 'Ruderzug eng': 'Close-grip cable row', 'Ruderzug breit': 'Wide-grip cable row', 'Band Rudern': 'Band row',
    'Kabelrotation': 'Cable rotation', 'Seitstütz statisch': 'Side plank', 'Roll-Out': 'Ab roll-out', 'Wadenheben': 'Calf raise',
    'Y-T-W-Heben': 'Y-T-W raises', 'Schulterblatt-Liegestütz': 'Scapular push-up', 'Clamshell mit Band': 'Banded clamshell', 'Hüftbeuger-Dehnung': 'Hip flexor stretch',
    'Katze-Kuh': 'Cat-cow', 'Thorakale Rotation (Seitenlage)': 'Thoracic rotation (side-lying)', 'Türrahmen-Dehnung Brust': 'Doorway chest stretch', 'Brustwirbelsäule über Rolle': 'Thoracic spine on foam roller',
    'Kabel-Seitneigen': 'Cable side bends',
    'Ruderergometer': 'Rowing erg', 'Skiergometer': 'Ski erg', 'Fahrradergometer': 'Bike erg', 'Ellipsenmaschine': 'Elliptical', 'Allgemeine Erwärmung': 'General warm-up',
    'Wadenheben einbeinig exzentrisch': 'Single-leg eccentric calf raise', 'Wadenheben einbeinig exzentrisch, Knie gebeugt': 'Single-leg eccentric calf raise, bent knee', 'Wadenheben exzentrisch an der Maschine': 'Eccentric calf raise (machine)',
    'Wadenheben zwei Beine hoch, ein Bein runter': 'Calf raise, two legs up, one leg down', 'Wadenhalten isometrisch': 'Isometric calf hold',
    'Schulterflexion an der Wand': 'Wall shoulder flexion', 'Scapular Shrug im Stütz': 'Scapular shrug in plank', 'Hollow-Body-Halten': 'Hollow body hold', 'Brust-zur-Wand-Handstand halten': 'Chest-to-wall handstand hold', 'Handgelenk-Vorbereitung': 'Wrist prep',
    'Band-Außenrotation': 'Band external rotation', 'Face Pull mit Außenrotation': 'Face pull with external rotation'
    /* gleichlautend und daher nicht eingetragen: Split Squat, Hip Thrust, Kettlebell Swing, Pallof Press, Face Pull, Hammer Curl, Wall Angels, Band Pull-Apart, Dead Bug, Bird Dog, Glute Bridge, Farmer Carry, Suitcase Carry, Plank, Hollow-Hold, Airbike, Scapular Wall Slide, Serratus Wall Slide, Scapula Push-up */
  };
  var CUSTOM = {};   /* eigene Übungen: Name -> englischer Name (von der App gesetzt) */

  /* ---------- Fachwörterbuch für Namensvorschläge ---------- */
  var GLOSS = {
    'kniebeuge': 'squat', 'bankdrücken': 'bench press', 'kreuzheben': 'deadlift', 'rumänisches': 'Romanian', 'rudern': 'row', 'ruderzug': 'cable row', 'latzug': 'lat pulldown', 'klimmzug': 'pull-up', 'liegestütz': 'push-up',
    'ausfallschritt': 'lunge', 'beinpresse': 'leg press', 'beinstrecker': 'leg extension', 'beinbeuger': 'leg curl', 'wadenheben': 'calf raise', 'schulterdrücken': 'shoulder press', 'überkopfdrücken': 'overhead press',
    'schrägbankdrücken': 'incline press', 'dehnung': 'stretch', 'halten': 'hold', 'seitstütz': 'side plank', 'unterarmstütz': 'forearm plank', 'stütz': 'plank', 'rotation': 'rotation', 'wurf': 'throw', 'sprung': 'jump',
    'kurzhantel': 'dumbbell', 'langhantel': 'barbell', 'kettlebell': 'kettlebell', 'band': 'band', 'bänder': 'bands', 'bändern': 'bands', 'einbeinig': 'single-leg', 'einbeiniges': 'single-leg', 'einarmig': 'single-arm',
    'exzentrisch': 'eccentric', 'isometrisch': 'isometric', 'schulter': 'shoulder', 'brust': 'chest', 'rücken': 'back', 'hüfte': 'hip', 'bein': 'leg', 'beine': 'legs', 'arm': 'arm', 'arme': 'arms', 'handgelenk': 'wrist',
    'heben': 'raise', 'seitheben': 'lateral raise', 'frontheben': 'front raise', 'rolle': 'foam roller', 'mobilisation': 'mobility', 'mit': 'with', 'an': 'on', 'der': 'the', 'die': 'the', 'das': 'the', 'und': 'and', 'ohne': 'without',
    'wand': 'wall', 'maschine': 'machine', 'seil': 'cable', 'kabel': 'cable', 'zug': 'pull', 'züge': 'pulls', 'drücken': 'press', 'ziehen': 'pull', 'vorn': 'front', 'hinten': 'back', 'eng': 'close-grip', 'breit': 'wide-grip',
    'gebeugt': 'bent', 'knie': 'knee', 'hoch': 'up', 'runter': 'down', 'seite': 'side', 'seitlich': 'side', 'vorbereitung': 'prep', 'übung': 'exercise', 'schulterblatt': 'scapular', 'brustwirbelsäule': 'thoracic spine',
    'erwärmung': 'warm-up', 'aufwärmen': 'warm-up', 'handstand': 'handstand', 'bauch': 'abs', 'rumpf': 'core', 'gesäß': 'glute', 'nacken': 'neck', 'trizeps': 'triceps', 'bizeps': 'biceps', 'außenrotation': 'external rotation',
    'innenrotation': 'internal rotation', 'tragen': 'carry', 'gehen': 'walk', 'laufen': 'run', 'springen': 'jump', 'sprint': 'sprint', 'schritt': 'step', 'aufstieg': 'step-up', 'brücke': 'bridge', 'liegend': 'lying', 'stehend': 'standing',
    'sitzend': 'seated', 'einseitig': 'single-side', 'beidseitig': 'both sides', 'langsam': 'slow', 'schwer': 'heavy', 'leicht': 'light'
  };
  function suggestEn(de) {
    var s = String(de || '').trim();
    if (!s) return '';
    if (EXEN[s]) return EXEN[s];
    var changed = false;
    var out = s.split(/(\s+|[-–,()\/])/).map(function (tok) {
      if (!tok || /^(\s+|[-–,()\/])$/.test(tok)) return tok;
      var k = tok.toLowerCase();
      if (GLOSS[k]) { changed = true; return GLOSS[k]; }
      return tok;
    }).join('');
    if (!changed) return s;
    return out.charAt(0).toUpperCase() + out.slice(1);
  }

  /* ---------- Oberfläche: feste Texte ---------- */
  var EXACT = {};
  /* ---------- Oberfläche: Muster mit {1}, {2} … ---------- */
  var RULES = [];
  var compiled = null;

  function esc(t) { return t.replace(/[.*+?^$()|[\]\\]/g, '\\$&'); }
  function compile() {
    compiled = RULES.map(function (r) {
      var k = r[0], order = [],
        re = esc(k).replace(/\\?\{(#?)(\d)\}/g, function (all, num, d) { order.push(+d); return num ? '(\\d[\\d.,–:+-]*(?: (?:min|s|kg|m|km|kcal|W|bpm))?)' : '(.+?)'; });
      return { re: new RegExp('^' + re + '$'), tpl: r[1], len: k.length, order: order };
    }).sort(function (a, b) { return b.len - a.len; });
  }
  function trCore(c) {
    if (Object.prototype.hasOwnProperty.call(EXACT, c)) return EXACT[c];
    if (Object.prototype.hasOwnProperty.call(CUSTOM, c)) return CUSTOM[c];
    if (Object.prototype.hasOwnProperty.call(EXEN, c)) return EXEN[c];
    if (/^·\s/.test(c)) return '· ' + trCore(c.replace(/^·\s+/, ''));
    if (/\s·$/.test(c)) return trCore(c.replace(/\s+·$/, '')) + ' ·';
    if (c.indexOf(' · ') > -1) return c.split(' · ').map(trCore).join(' · ');
    if (!compiled) compile();
    for (var i = 0; i < compiled.length; i++) {
      var m = compiled[i].re.exec(c);
      if (m) {
        var caps = {}, raw = {};
        compiled[i].order.forEach(function (num, idx) { raw[num] = m[idx + 1]; caps[num] = trCore(m[idx + 1]); });
        return compiled[i].tpl.replace(/\{#?(\d)\}|\[(\d)\]/g, function (x, a, b) { return a ? (caps[+a] != null ? caps[+a] : x) : (raw[+b] != null ? raw[+b] : x); });
      }
    }
    /* Aufzählungen: Teile einzeln übersetzen */
    if (c.indexOf(' / ') > -1) { var a = c.split(' / ').map(trCore).join(' / '); if (a !== c) return a; }
    if (c.indexOf(', ') > -1) { var b = c.split(', ').map(trCore).join(', '); if (b !== c) return b; }
    return c;
  }
  function trStr(s) {
    if (LANG !== 'en' || !s) return s;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    if (!m[2]) return s;
    var o = trCore(m[2]);
    return o === m[2] ? s : m[1] + o + m[3];
  }
  var ATTR = ['aria-label', 'placeholder', 'title', 'alt'];
  function trDom(root) {
    if (LANG !== 'en' || !root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      var p = t.parentNode;
      if (!p || (p.closest && p.closest('[data-nt]')) || /^(SCRIPT|STYLE)$/.test(p.nodeName)) return;
      var v = t.nodeValue, o = trStr(v);
      if (o !== v) t.nodeValue = o;
    });
    var els = root.querySelectorAll ? root.querySelectorAll('[aria-label],[placeholder],[title],[alt]') : [];
    Array.prototype.forEach.call(els, function (e) {
      if (e.closest('[data-nt]')) return;
      ATTR.forEach(function (a) { var v = e.getAttribute(a); if (v) { var o = trStr(v); if (o !== v) e.setAttribute(a, o); } });
    });
  }
  function setLang(l) {
    LANG = l === 'en' ? 'en' : 'de';
    try { localStorage.setItem('kt-lang', LANG); } catch (e) {}
    try { document.documentElement.lang = LANG; } catch (e) {}
  }
  try { document.documentElement.lang = LANG; } catch (e) {}

  KT.i18n = {
    EXEN: EXEN, EXACT: EXACT, RULES: RULES, CUSTOM: CUSTOM, GLOSS: GLOSS,
    lang: function () { return LANG; }, setLang: setLang, tr: trStr, trDom: trDom, suggestEn: suggestEn,
    add: function (exact, rules) { Object.keys(exact || {}).forEach(function (k) { EXACT[k] = exact[k]; }); (rules || []).forEach(function (r) { RULES.push(r); }); compiled = null; }
  };
})();
