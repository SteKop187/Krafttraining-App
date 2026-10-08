/* Einordnung neuer Übungen ins Trainingsprinzip (Bewegungsmuster, Richtung, Seiten, Komplexität, Messung, Equipment).
   Regelbasiert aus dem Namen, Vorschlag ist immer änderbar. */
(function () {
  "use strict";
  var KT = window.KT = window.KT || {};
  var norm = function (s) { return KT.norm(s); };

  var RULES = [
    [/(ergometer|airbike|air bike|ellipse|crosstrainer|laufband|cardio|aufwarm)/, { cat: 'warm', meas: 'time', cx: 'isoliert' }, 'Erwärmung mit Cardio, daher Erwärmung'],
    [/(handstand|schulterflexion|scapular|scap shrug|handgelenk ?vorbereit)/, { cat: 'zusatz', sg: 'hand', cx: 'isoliert' }, 'Handstand-Vorbereitung, daher Spezial (Handstand)'],
    [/(achilles|wadenheb|waden|calf)/, { cat: 'zusatz', sg: 'as', cx: 'isoliert' }, 'Wadenvariante für die Achillessehne, daher Prävention · Reha (AS-Prävention)'],
    [/(serratus|schulterstabil|scapula push|scapula-push)/, { cat: 'zusatz', sg: 'schulter', cx: 'isoliert' }, 'Schulterblattkontrolle, daher Prävention · Reha (Schulterstabilität)'],
    [/(katze|cat ?cow|thorakal|brustwirbel|mobilis|kindshaltung|turrahmen|dehn|stretch)/, { cat: 'mobil', cx: 'isoliert' }, 'Beweglichkeit und Dehnung, daher Aufrichtung (Mobilisation)'],
    [/(wall angel|pull ?apart|y ?t ?w|schulterblatt|skapula|scapula|aufricht)/, { cat: 'haltung', cx: 'isoliert' }, 'Haltung und Schulterblatt, daher Aufrichtung (Haltung)'],
    [/(dead ?bug|bird ?dog|vierfussler|glute|bridge|clam|beckenheben|hip airplane)/, { cat: 'huefte', cx: 'isoliert' }, 'Hüfte und Rumpfkontrolle, daher Aufrichtung (Hüfte)'],
    [/(face ?pull|aussenrotation|nacken|trizeps|bizeps|curl|wade|seitheben|frontheben|handgelenk|abduktion|adduktion|shrug)/, { cat: 'assist', cx: 'isoliert' }, 'Zusatzmuskulatur, daher Assistenz'],
    [/(kniebeuge|squat|beinpresse|leg press|ausfallschritt|lunge|step ?up|beinstrecker|goblet|pistol)/, { cat: 'squat' }, 'kniedominant, daher Squat'],
    [/(kreuzheb|deadlift|hip ?thrust|good ?morning|beinbeug|rumanisch|rdl|rucken ?streck|hyperextension|nordic|swing)/, { cat: 'hinge' }, 'hüftdominant, daher Hinge'],
    [/(klimmzug|latzug|pull ?up|chin ?up|pulldown|lat pull)/, { cat: 'pull', dir: 'vertikal' }, 'Zug von oben, daher Ziehen vertikal'],
    [/(rudern|\brow\b|ruderzug)/, { cat: 'pull', dir: 'horizontal' }, 'Rudern, daher Ziehen horizontal'],
    [/(uberkopf|schulterdruck|military|overhead|landmine|shoulder press|arnold)/, { cat: 'push', dir: 'vertikal' }, 'Druck über Kopf, daher Drücken vertikal'],
    [/(bankdruck|bench|liegestutz|push ?up|brustpresse|\bfly\b|\bdips?\b|schragbank)/, { cat: 'push', dir: 'horizontal' }, 'Druck nach vorn, daher Drücken horizontal'],
    [/(sprung|jump|wurf|throw|clean|snatch|explosiv|hexbar zug|plyo|sprint)/, { cat: 'schnell', focus: 'neuronal-schnell' }, 'explosive Übung, daher Schnellkraft'],
    [/(plank|stutz|pallof|rotation|roll ?out|sit ?up|crunch|beinheben|scheibenwischer|carry|superman|rumpf|core|hollow)/, { cat: 'rumpf' }, 'Rumpfübung'],
    [/press\b/, { cat: 'push' }, 'Pressbewegung, daher Drücken']
  ];
  var EQ = [
    ['Cardio', /(ergometer|airbike|air bike|ellipse|crosstrainer|laufband|cardio)/], ['Langhantel', /(langhantel|barbell|hexbar|trap ?bar|\bbb\b)/], ['Kurzhantel', /(kurzhantel|dumbbell|\bdb\b|goblet)/],
    ['Kettlebell', /(kettlebell|\bkb\b)/], ['Medizinball', /(medizinball|medball|med ball)/], ['Seilzug', /(kabel|seilzug|cable|latzug|pulldown|face ?pull|pallof)/],
    ['Maschine', /(maschine|machine|beinpresse|beinstrecker|beinbeuger|brustpresse)/], ['Band', /(\bband\b|bander|theraband)/], ['Box', /\bbox\b/],
    ['Körpergewicht', /(klimmzug|liegestutz|plank|\bdips?\b|push ?up|bodyweight|korpergewicht|seitstutz|roll ?out)/]
  ];
  var SIDE = /(einbein|einarm|unilateral|einseitig|split|ausfall|lunge|step ?up|bulgar|single|one arm|1 arm|seitstutz|pistol)/;
  var TIME = /(plank|stutz|halte|hold|carry|isometr|wall ?sit|hang|superman|dehn|stretch|kindshaltung|brustwirbel)/;
  var ISO = /(curl|seitheben|frontheben|beinstrecker|beinbeuger|\bfly\b|extension|trizeps|bizeps|wade|abduktion|adduktion|kickback|isolation)/;
  var DEFEQ = { warm: 'Cardio', zusatz: 'Körpergewicht', push: 'Langhantel', pull: 'Seilzug', squat: 'Langhantel', hinge: 'Langhantel', schnell: 'Medizinball', rumpf: 'Körpergewicht', assist: 'Kurzhantel', haltung: 'Körpergewicht', huefte: 'Körpergewicht', mobil: 'Körpergewicht' };
  var LABEL = { warm: 'Erwärmung', zusatz: 'Spezial', schnell: 'Schnell', squat: 'Squat', push: 'Drücken', hinge: 'Hinge', pull: 'Ziehen', rumpf: 'Rumpf', assist: 'Assistenz', haltung: 'Haltung', huefte: 'Hüfte', mobil: 'Mobilisation' };

  /* lib = vorhandene Übungen [{name,cat,eq}] für den Ähnlichkeitshinweis */
  KT.classify = function (name, lib) {
    var n = norm(name), out = { sg: '', cat: 'assist', dir: 'horizontal', side: 'bilateral', cx: 'komplex', meas: 'reps', focus: 'mechanisch', eq: null, known: false, why: '', similar: null }, i, r;
    if (!n) { out.why = 'Gib einen Namen ein, dann schlage ich die Einordnung vor.'; out.eq = 'Langhantel'; return out; }
    for (i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(n)) { for (var k in RULES[i][1]) out[k] = RULES[i][1][k]; out.known = true; out.why = RULES[i][2]; break; }
    }
    if (!out.known) { out.cat = 'assist'; out.why = 'Name nicht eindeutig. Wähle das Bewegungsmuster selbst.'; }
    if (SIDE.test(n)) out.side = 'unilateral';
    if (TIME.test(n) && !/liegestutz/.test(n)) out.meas = 'time';
    if (ISO.test(n)) out.cx = 'isoliert';
    for (i = 0; i < EQ.length; i++) { if (EQ[i][1].test(n)) { out.eq = EQ[i][0]; break; } }
    if (!out.eq) out.eq = DEFEQ[out.cat] || 'Langhantel';
    if (out.cat === 'rumpf' || out.cat === 'assist') { out.focus = 'mechanisch'; }
    if (out.cat === 'rumpf') { out.sg = /(seitst|seitneig|seitlich|suitcase|side)/.test(n) ? 'seit' : (/(plank|roll ?out|hollow|crunch|sit ?up|beinheben)/.test(n) ? 'ger' : (/(pallof|rotation)/.test(n) ? 'rot' : '')); }
    if (lib && lib.length) {
      r = KT.rankNames(name, lib, 0.5).filter(function (x) { return norm(x.item.name) !== n; });
      if (r.length) out.similar = { name: r[0].item.name, cat: r[0].item.cat };
    }
    out.label = LABEL[out.cat];
    return out;
  };
})();
