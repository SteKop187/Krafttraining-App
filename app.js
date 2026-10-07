(function(){
"use strict";
/* ---------- Helfer ---------- */
var $=function(s){return document.querySelector(s)};
/* Sprache: Wörterbuch und Übersetzer kommen aus kt-i18n.js (ohne die Datei bleibt alles deutsch) */
var I18N=(window.KT&&KT.i18n)||{lang:function(){return 'de'},tr:function(s){return s},trDom:function(){},setLang:function(){},suggestEn:function(s){return s},EXEN:{},CUSTOM:{},GLOSS:{}};
var EXEN=I18N.EXEN;
function isEn(){return I18N.lang()==='en'}
function LOC(){return isEn()?'en-US':'de-DE'}
function suggestEn(s){return I18N.suggestEn(s)}
var IC={
 dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r=".8"/><circle cx="15" cy="15" r=".8"/><circle cx="15" cy="9" r=".8"/><circle cx="9" cy="15" r=".8"/>',
 trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12h10l1-12M9 7V4h6v3"/>',
 lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
 swap:'<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
 back:'<path d="M15 5l-7 7 7 7"/>', next:'<path d="M9 5l7 7-7 7"/>', chevd:'<path d="M6 9l6 6 6-6"/>',
 check:'<path d="M5 12l5 5 9-10"/>', play:'<path d="M8 5v14l11-7z"/>', stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',
 today:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 home:'<path d="M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5"/>', spine:'<circle cx="12" cy="4.5" r="1.8"/><path d="M12 8v13M9 10.5c2 1 4 1 6 0M9 14.5c2 1 4 1 6 0"/>', dumbbell:'<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',
 book:'<path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h10"/>',
 chart:'<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
 edit:'<path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/>',
 list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
 more:'<circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
 image:'<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M4 17l5-4 4 3 3-2 4 3"/>',
 video:'<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2z"/>',
 link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
 up:'<path d="M12 19V5M6 11l6-6 6 6"/>', down:'<path d="M12 5v14M6 13l6 6 6-6"/>', eq:'<path d="M5 9h14M5 15h14"/>',
 alert:'<path d="M12 4l9 16H3zM12 10v4M12 17v.5"/>', search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/>', table:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16M10 10v9"/>',
 pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>', timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 3h6"/>'
};
function ic(n,s){s=s||20;return '<svg class="ic" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" aria-hidden="true">'+IC[n]+'</svg>'}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fmt(n,d){return Number(n).toLocaleString(LOC(),{maximumFractionDigits:d==null?1:d})}
function fmtRest(s){return s<60?s+' s':fmt(s/60)+' min'}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var MON=['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],MON_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var TODAY=(function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate())})();
function dateOf(w){var d=new Date(TODAY.getTime()-(40-w)*7*864e5);return isEn()?MON_EN[d.getMonth()]+' '+d.getDate():d.getDate()+'. '+MON[d.getMonth()]}
function kwOf(w){var d=new Date(TODAY.getTime()-(40-w)*7*864e5);var t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);var y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-y)/864e5+1)/7)}

/* ---------- Domänendaten ---------- */
var SLOT={
 warm:{l:'Erwärmung',c:'--c-warm'}, schnell:{l:'Schnell',c:'--c-schnell'}, squat:{l:'Squat',c:'--c-squat'}, push:{l:'Drücken',c:'--c-push'},
 hinge:{l:'Hinge',c:'--c-hinge'}, pull:{l:'Ziehen',c:'--c-pull'}, rumpf:{l:'Rumpf',c:'--c-rumpf'}, assist:{l:'Assistenz',c:'--c-rumpf'}, zusatz:{l:'Zusatz',c:'--c-zusatz'},
 haltung:{l:'Haltung',c:'--c-aufricht'}, huefte:{l:'Hüfte',c:'--c-aufricht'}, mobil:{l:'Mobilisation',c:'--c-aufricht'}, aufricht:{l:'Aufrichtung',c:'--c-aufricht'}
};
var ORDER=['warm','schnell','squat','push','hinge','pull','rumpf','assist','zusatz','haltung','huefte','mobil'];
var KRAFT_CATS=['warm','schnell','squat','push','hinge','pull','rumpf','assist','zusatz'],AUFR_CATS=['haltung','huefte','mobil'];
/* Untergruppen: Rumpf seitlich/gerade/Rotation, Zusatz AS-Prävention/Handstand/Schulterstabilität */
var SG={seit:'seitlich',ger:'gerade',rot:'Rotation',as:'AS-Prävention',hand:'Handstand-Vorbereitung',schulter:'Schulterstabilität',cardio:'Cardio',allg:'allgemein'};
var SG_OF={warm:['cardio','allg'],rumpf:['seit','ger','rot'],zusatz:['as','hand','schulter']};
/* Messgröße je Cardio-Übung (wählbar), wird nach der Erwärmung eingetragen */
var PARAMS={m:{u:'m',l:'Meter'},km:{u:'km',l:'Kilometer'},kcal:{u:'kcal',l:'Kalorien'},w:{u:'W',l:'Watt'},bpm:{u:'bpm',l:'Herzfrequenz'}};
/* Plätze in einer Vorlage: „rumpf“ oder „rumpf:seit“ (Muster plus Untergruppe) */
function slotCat(s){return String(s).split(':')[0]}
function slotSg(s){return String(s).split(':')[1]||''}
function slotLabel(s){var c=slotCat(s),g=slotSg(s);return SLOT[c].l+(g?' '+SG[g]:'')}
/* Kategorien der Statistik: die drei Aufrichtungs-Muster werden zusammengefasst, Erwärmung zählt nicht mit */
var STATCATS=['schnell','squat','push','hinge','pull','rumpf','zusatz','aufricht'];
var TYPES={kraft:{name:'Krafttraining',sub:'Ganzkörper-, Unter- und Oberkörpereinheiten',icon:'dumbbell'},aufricht:{name:'Aufrichtung',sub:'Haltung, Hüfte und Mobilisation',icon:'spine'}};
function typeName(t){return TYPES[t]?TYPES[t].name:'Gelöschte Trainingsart'}
/* x: sg (Untergruppe), both (beidseitig, je Seite ein Durchgang), eqs (mehrere mögliche Geräte), param (Messgröße bei Cardio) */
function P(name,eq,sets,reps,rest,sub,mode,machine,x){var p={name:name,eq:eq,sets:sets,reps:reps,rest:rest,sub:sub||'',mode:mode||'reps',machine:machine||''};if(x){if(x.sg)p.sg=x.sg;if(x.both)p.both=true;if(x.eqs&&x.eqs.length>1)p.eqs=x.eqs;if(x.param)p.param=x.param}return p}
var POOL={
 schnell:[P('MedBall-Rotationswurf','Medizinball',3,'5/Seite',30,'Wurf'),P('Box Sprung','Box',3,'5',90,'Sprung'),P('Hexbar Züge','Langhantel',4,'3',180,'Gewichtheben'),P('Sprung mit Kurzhantel','Kurzhantel',3,'3',180,'Sprung'),P('MedBall-Brustwurf','Medizinball',3,'5',90,'Wurf')],
 squat:[P('Kniebeuge vorn','Langhantel',4,'6',150,'bilateral · komplex'),P('Kniebeuge hinten','Langhantel',4,'6',150,'bilateral · komplex'),P('Ausfallschritt','Kurzhantel',3,'8/Seite',120,'unilateral'),P('Split Squat','Kurzhantel',3,'8/Seite',120,'unilateral'),P('Beinpresse','Maschine',3,'10',120,'bilateral','reps','Beinpresse'),P('Beinstrecker','Maschine',3,'12',90,'isoliert','reps','Beinstrecker')],
 push:[P('Bankdrücken','Langhantel',4,'8',120,'horizontal'),P('Schrägbankdrücken','Kurzhantel',3,'8',120,'horizontal'),P('Überkopfdrücken','Langhantel',3,'8',120,'vertikal'),P('Kurzhantel-Schulterdrücken','Kurzhantel',3,'10',90,'vertikal'),P('Bankdrücken mit Bändern','Band',3,'5',90,'horizontal'),P('Brustpresse','Maschine',3,'10',90,'horizontal','reps','Brustpresse')],
 hinge:[P('Hexbar Kreuzheben','Langhantel',3,'6',150,'bilateral · komplex'),P('Rumänisches Kreuzheben','Langhantel',3,'8',120,'bilateral'),P('Hip Thrust','Langhantel',3,'8',120,'bilateral'),P('Beinbeuger','Maschine',3,'10',90,'isoliert','reps','Beinbeuger'),P('Kettlebell Swing','Kettlebell',4,'10',90,'bilateral · ballistisch'),P('Einbeiniges Kreuzheben','Kurzhantel',3,'8/Seite',90,'unilateral')],
 pull:[P('Latzug','Seilzug',3,'8',90,'vertikal'),P('Klimmzug','Körpergewicht',3,'6',120,'vertikal'),P('Kurzhantel Rudern','Kurzhantel',3,'8/Seite',90,'horizontal'),P('Ruderzug eng','Seilzug',3,'10',90,'horizontal'),P('Ruderzug breit','Seilzug',3,'10',90,'horizontal'),P('Band Rudern','Band',3,'12',60,'horizontal')],
 warm:[P('Ruderergometer','Cardio',1,'5 min',0,'Cardio','time','Ruderergometer',{sg:'cardio',param:'m'}),P('Skiergometer','Cardio',1,'5 min',0,'Cardio','time','Skiergometer',{sg:'cardio',param:'m'}),P('Fahrradergometer','Cardio',1,'5 min',0,'Cardio','time','Fahrradergometer',{sg:'cardio',param:'km'}),P('Airbike','Cardio',1,'5 min',0,'Cardio','time','Airbike',{sg:'cardio',param:'kcal'}),P('Ellipsenmaschine','Cardio',1,'5 min',0,'Cardio','time','Ellipsenmaschine',{sg:'cardio',param:'kcal'}),P('Allgemeine Erwärmung','Körpergewicht',1,'5 min',0,'Gehen, Mobilisieren','time','',{sg:'allg'})],
 rumpf:[P('Seitstütz statisch','Körpergewicht',2,'45 s',30,'Seitneige · stabilisieren','time','',{sg:'seit',both:true}),P('Kabel-Seitneigen','Seilzug',2,'10/Seite',45,'Seitneige · bewegen','reps','',{sg:'seit'}),P('Suitcase Carry','Kurzhantel',2,'30 s',60,'Seitneige · stabilisieren','time','',{sg:'seit',both:true,eqs:['Kurzhantel','Kettlebell']}),
  P('Roll-Out','Körpergewicht',2,'8',60,'Beugung · stabilisieren','reps','',{sg:'ger'}),P('Plank','Körpergewicht',2,'45 s',45,'Rumpf gerade · stabilisieren','time','',{sg:'ger'}),P('Hollow-Hold','Körpergewicht',2,'30 s',45,'Rumpf gerade · stabilisieren','time','',{sg:'ger'}),
  P('Pallof Press','Seilzug',3,'8/Seite',30,'Rotation · stabilisieren','reps','',{sg:'rot'}),P('Kabelrotation','Seilzug',3,'8/Seite',30,'Rotation · bewegen','reps','',{sg:'rot'})],
 assist:[P('Face Pull','Seilzug',3,'12',90,'Schulterblatt'),P('Wadenheben','Maschine',3,'12',60,'Waden','reps','Wadenmaschine'),P('Hammer Curl','Kurzhantel',3,'10',60,'Arme')],
 zusatz:[P('Wadenheben einbeinig exzentrisch','Kurzhantel',3,'8–12/Bein',90,'AS-Prävention · exzentrisch · einbeinig','reps','',{sg:'as',eqs:['Kurzhantel','Kettlebell']}),P('Wadenheben einbeinig exzentrisch, Knie gebeugt','Kurzhantel',3,'8–12/Bein',90,'AS-Prävention · exzentrisch · Soleus','reps','',{sg:'as',eqs:['Kurzhantel','Kettlebell']}),P('Wadenheben exzentrisch an der Maschine','Maschine',3,'8–12',90,'AS-Prävention · exzentrisch','reps','Wadenmaschine',{sg:'as'}),P('Wadenheben zwei Beine hoch, ein Bein runter','Körpergewicht',3,'10/Bein',60,'AS-Prävention · exzentrisch','reps','',{sg:'as'}),P('Wadenhalten isometrisch','Körpergewicht',3,'30 s',60,'AS-Prävention · isometrisch','time','',{sg:'as'}),
  P('Schulterflexion an der Wand','Körpergewicht',3,'45 s',30,'Handstand · Arm-Rumpf-Winkel öffnen','time','',{sg:'hand'}),P('Scapular Wall Slide','Körpergewicht',3,'10',45,'Handstand · Schulterblatt hochschieben','reps','',{sg:'hand'}),P('Scapular Shrug im Stütz','Körpergewicht',3,'10',45,'Handstand · Schulterblatt hochschieben','reps','',{sg:'hand'}),P('Hollow-Body-Halten','Körpergewicht',3,'30 s',45,'Handstand · Körperspannung','time','',{sg:'hand'}),P('Brust-zur-Wand-Handstand halten','Körpergewicht',3,'20 s',90,'Handstand · Haltung','time','',{sg:'hand'}),P('Handgelenk-Vorbereitung','Körpergewicht',2,'45 s',20,'Handstand · Handgelenke','time','',{sg:'hand'}),
  P('Serratus Wall Slide','Körpergewicht',3,'10',45,'Schulterstabilität · Serratus','reps','',{sg:'schulter'}),P('Band-Außenrotation','Band',3,'12/Seite',45,'Schulterstabilität · Rotatorenmanschette','reps','',{sg:'schulter'}),P('Scapula Push-up','Körpergewicht',3,'10',45,'Schulterstabilität · Schulterblattkontrolle','reps','',{sg:'schulter'}),P('Face Pull mit Außenrotation','Seilzug',3,'12',60,'Schulterstabilität · Außenrotation','reps','',{sg:'schulter'}),P('Y-T-W-Heben','Körpergewicht',3,'8',45,'Schulterstabilität · Schulterblatt','reps','',{sg:'schulter'})],
 haltung:[P('Wall Angels','Körpergewicht',3,'10',45,'Schulterblatt'),P('Band Pull-Apart','Band',3,'15',45,'Schulterblatt'),P('Y-T-W-Heben','Körpergewicht',3,'8',45,'Schulterblatt · Rückenstrecker'),P('Schulterblatt-Liegestütz','Körpergewicht',3,'10',45,'Schulterblatt')],
 huefte:[P('Dead Bug','Körpergewicht',3,'8/Seite',45,'Rumpf · Hüfte'),P('Bird Dog','Körpergewicht',3,'8/Seite',45,'Rumpf · Hüfte'),P('Glute Bridge','Körpergewicht',3,'12',45,'Gesäß'),P('Clamshell mit Band','Band',3,'12/Seite',45,'Gesäß · seitlich'),P('Hüftbeuger-Dehnung','Körpergewicht',2,'45 s',20,'Dehnung','time')],
 mobil:[P('Katze-Kuh','Körpergewicht',2,'10',20,'Wirbelsäule'),P('Thorakale Rotation (Seitenlage)','Körpergewicht',2,'8/Seite',20,'Brustwirbelsäule'),P('Türrahmen-Dehnung Brust','Körpergewicht',2,'40 s',20,'Dehnung','time'),P('Brustwirbelsäule über Rolle','Körpergewicht',2,'60 s',20,'Mobilisation','time')]
};
var EQGROUP={'Hexbar':'Langhantel'};
var EQ_ALL=['Körpergewicht','Langhantel','Kurzhantel','Kettlebell','Maschine','Seilzug','Band','Medizinball','Box','Cardio'];
/* Belastete Gelenke je Muster (für „Heute meiden“) und Start-/Schrittgewichte je Equipment */
var JOINTS={push:['Schulter','Ellbogen','Handgelenk'],pull:['Schulter','Ellbogen'],squat:['Knie'],hinge:['Rücken'],schnell:['Knie','Rücken'],rumpf:['Rücken'],assist:[],warm:[],zusatz:[],haltung:['Schulter'],huefte:[],mobil:[]};
var JOINT_X={'Brust-zur-Wand-Handstand halten':['Schulter','Handgelenk'],'Handgelenk-Vorbereitung':['Handgelenk'],'Scapular Shrug im Stütz':['Schulter','Handgelenk'],'Scapula Push-up':['Schulter','Handgelenk'],'Schulterflexion an der Wand':['Schulter'],'Hollow-Hold':[],'Plank':['Schulter'],'Beinpresse':['Knie'],'Beinbeuger':[],'Beinstrecker':['Knie'],'Hip Thrust':[],'Face Pull':['Schulter'],'Hammer Curl':['Ellbogen'],'Wadenheben':[],'Seitstütz statisch':['Schulter'],'Roll-Out':['Schulter','Rücken'],'Pallof Press':[],'Kabelrotation':[],'MedBall-Rotationswurf':['Schulter'],'Box Sprung':['Knie'],'Kettlebell Swing':['Rücken']};
function jointsOf(cat,name){return JOINT_X[name]||JOINTS[cat]||[]}
/* Unterkategorien von „Maschine“: je Ort ein-/ausschaltbar, beliebig erweiterbar */
var MACH_DEFAULT=['Beinpresse','Beinbeuger','Beinstrecker','Brustpresse','Wadenmaschine'];
/* Cardio-Geräte für die Erwärmung: ebenfalls je Ort einstellbar, beliebig erweiterbar (jedes Gerät ist zugleich eine Erwärmungs-Übung) */
var CARD_DEFAULT=['Ruderergometer','Skiergometer','Fahrradergometer','Airbike','Ellipsenmaschine'];
var SUBS={'Maschine':{list:'machines',flag:'mach',what:'Maschinen'},'Cardio':{list:'cardios',flag:'card',what:'Geräte'}};
var EQDEF={'Cardio':{kg:0,step:2.5},'Langhantel':{kg:40,step:2.5},'Kurzhantel':{kg:12,step:2},'Maschine':{kg:30,step:2.5},'Seilzug':{kg:20,step:2.5},'Kettlebell':{kg:16,step:4},'Medizinball':{kg:4,step:1},'Körpergewicht':{kg:0,step:2.5},'Band':{kg:0,step:2.5},'Box':{kg:0,step:5}};
var REF={
 'MedBall-Rotationswurf':{kg:4,reps:5,sug:4,step:1,why:'Maximale Absicht, weit weg vom Muskelversagen.'},
 'Box Sprung':{kg:0,reps:5,sug:0,step:5,why:'Sprunghöhe steigern, solange die Landung sauber bleibt.'},
 'Kniebeuge vorn':{kg:70,reps:6,sug:72.5,step:2.5,why:'Letztes Mal alle Sätze am oberen Ende, 1–2 RIR.'},
 'Bankdrücken':{kg:60,reps:8,sug:62.5,step:2.5,why:'Letzte Bewertung „Mehr“, daher +2,5 kg.'},
 'Hexbar Kreuzheben':{kg:100,reps:6,sug:100,step:2.5,why:'Gewicht halten, Technik vor Last.'},
 'Latzug':{kg:60,reps:8,sug:57.5,step:2.5,why:'Zuletzt dreimal „Weniger“, daher −2,5 kg.'},
 'Pallof Press':{kg:15,reps:8,sug:15,step:2.5,why:'Rumpf stabil halten, nicht rotieren.'},
 'Seitstütz statisch':{kg:0,sec:42,sug:45,step:5,why:'Letztes Mal 3 × 42 s, Bewertung „Mehr“.'}
};
/* Vorschlag fürs Training: letzte echte Einträge zählen, sonst ein Startwert nach Equipment (kein „Letztes Mal“ erfinden) */
/* Zeit-Übungen: Zielzeit aus „45 s“ oder „5 min“, Schrittweite 5 s (Erwärmung 30 s) */
function secOf(ex){var m=/(\d+(?:[.,]\d+)?)\s*(min|s)?/.exec(String(ex.reps||''));if(!m)return 30;var v=parseFloat(m[1].replace(',','.'));return Math.round(/min/.test(m[2]||'')?v*60:v)}
function secStep(n){var le=LIB.filter(function(x){return x.name===n})[0];return le&&le.cat==='warm'?30:5}
function fmtSec(s){return s>=120&&s%60===0?(s/60)+' min':(s>=60?mmss(s):s+' s')}
function getRef(n,eqSel){
 var r=getRefOld(n),le=LIB.filter(function(x){return x.name===n})[0],d=EQDEF[eqSel||(le?le.eq:'')]||null;
 if(!r.hist){r=Object.assign({},r,{why:'Noch keine Einträge, daher ein Startwert als Vorschlag. Danach passt sich die App an deine Bewertungen an.',start:true});
  if(d)r=Object.assign({},r,{kg:d.kg,sug:d.kg,step:d.step})}
 else if(d&&!REF[n]&&!r.dd){var dir=r.sug>r.kg?1:(r.sug<r.kg?-1:0);r=Object.assign({},r,{step:d.step,sug:Math.max(0,r.kg+dir*d.step)})}
 return r;
}
function getRefOld(n){
 var td=new Date(),tds=td.getFullYear()+'-'+String(td.getMonth()+1).padStart(2,'0')+'-'+String(td.getDate()).padStart(2,'0'),h=(S.hist||[]).filter(function(x){return x.name===n&&x.date!==tds});
 if(h.length){var l=h[h.length-1],b=REF[n]||{},step=b.step||2.5;
  /* war beim Bewerten eine Menge gewählt (d), gilt sie, sonst die übliche Schrittweite */
  if(l.sec&&!l.kg){var ss=secStep(n),ds5=typeof l.d==='number'?l.d:(l.r==='m'?ss:(l.r==='w'?-ss:0));return {kg:0,sec:l.sec,sug:Math.max(ss,l.sec+ds5),step:ss,hist:true,why:ds5>0?'Letzte Bewertung „Mehr“, daher +'+fmt(ds5)+' s.':(ds5<0?'Letzte Bewertung „Weniger“, daher −'+fmt(-ds5)+' s.':'Letzte Bewertung „Passt“, Zeit bleibt.')}}
  var dk=typeof l.d==='number'?l.d:(l.r==='m'?step:(l.r==='w'?-step:0)),sug=Math.max(0,l.kg+dk);
  return {kg:l.kg,reps:l.reps,sug:sug,step:step,hist:true,dd:typeof l.d==='number',why:dk>0?'Letzte Bewertung „Mehr“, daher +'+fmt(dk)+' kg.':(dk<0?'Letzte Bewertung „Weniger“, daher −'+fmt(-dk)+' kg.':'Letzte Bewertung „Passt“, Gewicht bleibt.')}}
 return REF[n]||{kg:40,reps:8,sug:40,step:2.5,why:'Noch keine Vorgeschichte, starte mit einem leichten Satz.'}}
var LIB=[];
function libEntry(c,e){var o={name:e.name,cat:c,eq:e.eq,machine:e.machine||'',sub:e.sub||'',mode:e.mode||'reps',uses:0,img:0,vid:0,link:0};if(e.sg)o.sg=e.sg;if(e.both)o.both=true;if(e.eqs&&e.eqs.length>1)o.eqs=e.eqs;if(e.param)o.param=e.param;return o}
(function(){var r=rng(11);ORDER.forEach(function(c){POOL[c].forEach(function(e){if(!LIB.some(function(x){return x.name===e.name}))LIB.push(libEntry(c,e))})});LIB.push({name:'Farmer Carry',cat:'rumpf',eq:'Kurzhantel',sub:'Seitneige · stabilisieren',mode:'time',uses:0,img:0,vid:0,link:0})})();
/* Originalbestand der eingebauten Übungen: damit gelöschte oder überschriebene wieder hergestellt werden können */
var BASE={};
(function(){ORDER.forEach(function(c){POOL[c].forEach(function(e){if(!BASE[e.name])BASE[e.name]={cat:c,pe:Object.assign({},e)}})});LIB.forEach(function(l){if(!BASE[l.name])BASE[l.name]={cat:l.cat,pe:null};BASE[l.name].lib=Object.assign({},l)})})();
function removeEx(name){Object.keys(POOL).forEach(function(k){POOL[k]=POOL[k].filter(function(x){return x.name!==name})});for(var i=LIB.length-1;i>=0;i--){if(LIB[i].name===name)LIB.splice(i,1)}}
function restoreBase(name){var b=BASE[name];if(!b)return;if(b.pe&&!fromPool(b.cat,name))POOL[b.cat].push(Object.assign({},b.pe));if(b.lib&&!LIB.some(function(x){return x.name===name}))LIB.push(Object.assign({},b.lib))}
var STEPS={
 'Bankdrücken':{cues:'Handgelenke gerade, Ellbogen etwa 45–60° zum Rumpf, Stange nicht auf der Brust prellen.',st:['Auf der Bank liegen, Schulterblätter zusammen und nach unten, Füße fest am Boden.','Griff etwas breiter als Schulterbreite, Stange über den Schultern ausheben.','Kontrolliert zur unteren Brust senken, Unterarme bleiben senkrecht.','Explosiv drücken, oben Ellbogen nicht überstrecken, ausatmen im letzten Drittel.']},
 'Kniebeuge vorn':{cues:'Ellbogen hoch, Rumpf aufrecht, Knie folgen den Zehen.',st:['Stange auf den vorderen Schultern ablegen, Ellbogen zeigen nach vorn.','Fußstellung etwa schulterbreit, Zehen leicht nach außen.','Hüfte und Knie gleichzeitig beugen, Rumpf aufrecht halten.','Aus der Mitte des Fußes aufstehen, oben Hüfte komplett strecken.']},
 'Latzug':{cues:'Brust zur Stange, nicht mit dem Rücken schwingen.',st:['Oberschenkel unter den Polstern fixieren, Griff etwas breiter als Schulterbreite.','Schulterblätter zuerst nach unten ziehen, dann Ellbogen zur Hüfte.','Stange zur oberen Brust führen, kurz halten.','Kontrolliert zurück bis zur vollen Streckung.']}
};

/* ---------- Zustand ---------- */
var S={
 screen:'start',prev:'start',exp:-1,toast:null,sheet:null,undo:null,type:'kraft',stash:{},
 plan:[
  {cat:'schnell',grp:'A1',rest:30},{cat:'schnell',grp:'A2',rest:90},{cat:'squat',grp:'B',rest:150},{cat:'push',grp:'C',rest:120},
  {cat:'hinge',grp:'D',rest:150},{cat:'pull',grp:'E',rest:90},{cat:'rumpf',grp:'F',rest:30}
 ],
 hist:[],custom:[],media:{},stepsX:{},demo:false,planDate:'',tpl:'gka',
 tr:null,lib:{cat:'alle',q:''},detail:'Bankdrücken',
 wiz:null,wizCtx:{mode:'lib'},wizHint:'Gib einen Namen ein, dann schlage ich die Einordnung vor.',cardios:CARD_DEFAULT.slice(),eqPick:{},live:null,removed:[],sumDur:0,setup:{cardio:true,as:true,hand:true,schulter:false,aufr:false},setupTpl:'',confirmDel:'',
 stats:{range:12,sub:'ueber',ex:'Bankdrücken',table:false},
 locs:[
  {id:'potsdam',name:'Potsdam Ruderzentrum',eq:{'Körpergewicht':1,'Langhantel':1,'Kurzhantel':1,'Kettlebell':0,'Maschine':1,'Seilzug':1,'Band':0,'Medizinball':1,'Box':1}},
  {id:'lagoazul',name:'Trainingslager Lago Azul',eq:{'Körpergewicht':1,'Langhantel':0,'Kurzhantel':1,'Kettlebell':1,'Maschine':0,'Seilzug':0,'Band':1,'Medizinball':1,'Box':1}}
 ],loc:'potsdam',editLoc:null,locRecent:[],moreLocs:false,showDone:false,machines:MACH_DEFAULT.slice(),types:[],editType:null,scrollTo:'',
 set:{avoid:{Schulter:0,Knie:0,Rücken:0,Ellbogen:0,Handgelenk:0},perWeek:3,voice:true}
};
(function(){var init={'A1':'MedBall-Rotationswurf','A2':'Box Sprung','B':'Kniebeuge vorn','C':'Bankdrücken','D':'Hexbar Kreuzheben','E':'Latzug','F':'Pallof Press'};
 S.plan=S.plan.map(function(p){var e=POOL[p.cat].filter(function(x){return x.name===init[p.grp]})[0];return {cat:p.cat,grp:p.grp,rest:p.rest,name:e.name,eq:e.eq,sets:e.sets,reps:e.reps,mode:e.mode,sub:e.sub,locked:false}})})();
function newWiz(){return {name:'',eq:'Langhantel',eqs:['Langhantel'],machine:'',cat:'push',sg:'',dir:'horizontal',side:'bilateral',cx:'komplex',meas:'reps',focus:'mechanisch',sets:3,repsTxt:'8',rest:90,both:false,steps:'',cues:'',linkUrl:'',linkTitle:'',pending:[],param:'',en:'',enAuto:true}}
S.wiz=newWiz();
function locById(id){return S.locs.filter(function(l){return l.id===id})[0]}
function curLoc(){return locById(S.loc)||S.locs[0]}
function eqOn(e){return !!curLoc().eq[EQGROUP[e]||e]}
function eqList(l){return EQ_ALL.filter(function(e){return l.eq[e]})}
function eqCount(){return eqList(curLoc()).length}
/* Maschinen: eine Übung an einer Maschine braucht „Maschine“ am Ort und genau diese Maschine */
function machOf(e){if(e.machine)return e.machine;var le=LIB.filter(function(x){return x.name===e.name})[0];return le&&le.machine||''}
/* Mehrere mögliche Geräte je Übung (z. B. Kurzhantel oder Kettlebell): die Übung geht, wenn eines davon am Ort passt */
function eqsOf(e){return e.eqs&&e.eqs.length?e.eqs:[e.eq]}
function eqsOfName(n){var le=LIB.filter(function(x){return x.name===n})[0];return le?eqsOf(le):[]}
function subOkFor(e,q){var c=SUBS[q];if(!c)return true;var m=machOf(e);if(!m||S[c.list].indexOf(m)<0)return true;var l=curLoc();return !!(l[c.flag]&&l[c.flag][m])}
function machOk(e){return subOkFor(e,'Maschine')}
function eqOk(e){return eqsOf(e).some(function(q){return eqOn(q)&&subOkFor(e,q)})}
function eqLabel(e){return eqsOf(e).map(function(q){var m=SUBS[q]?machOf(e):'';return q==='Cardio'?(m||q):(m?q+' · '+m:q)}).join(' / ')}
function subOn(l,q){var c=SUBS[q];return S[c.list].filter(function(m){return l[c.flag]&&l[c.flag][m]})}
function machOn(l){return subOn(l,'Maschine')}
function machineUsed(m){return LIB.some(function(e){return e.machine===m})}
function eqNames(l){return eqList(l).filter(function(e){return e!=='Körpergewicht'}).map(function(e){return SUBS[e]?e+' ('+subOn(l,e).length+')':e})}
/* Altdaten: Orte ohne Geräteliste übernehmen den bisherigen Schalter für alle Maschinen; Cardio hat Potsdam (Ruder- und Skiergometer), sonst nichts */
function ensureMach(){S.locs.forEach(function(l){
 var legacy=!l.mach;if(legacy)l.mach={};S.machines.forEach(function(m){if(!(m in l.mach))l.mach[m]=legacy&&l.eq.Maschine?1:0});
 var legC=!l.card;if(legC){l.card={};if(!('Cardio' in l.eq))l.eq.Cardio=l.id==='potsdam'?1:0}
 S.cardios.forEach(function(m){if(!(m in l.card))l.card[m]=legC&&l.id==='potsdam'&&(m==='Ruderergometer'||m==='Skiergometer')?1:0})})}
/* Übung passt: Equipment am Ort vorhanden und kein gesperrtes Gelenk belastet */
function okEx(e,cat){return eqOk(e)&&!jointsOf(cat||e.cat,e.name).some(function(j){return S.set.avoid[j]})}
function usesOf(name){var d={};S.hist.forEach(function(h){if(h.name===name)d[h.date]=1});return Object.keys(d).length}
function mediaCount(name,t){return (S.media[name]||[]).filter(function(m){return m.type===t}).length}
/* Orte merken: letzter gewählter Ort ist beim nächsten Öffnen Standard (nur in diesem Browser) */
var LSKEY='krafttraining-app-v1';
function saveLocs(){try{localStorage.setItem(LSKEY,JSON.stringify({v:2,locs:S.locs,loc:S.loc,locRecent:S.locRecent,machines:S.machines,cardios:S.cardios,eqPick:S.eqPick,live:S.live,removed:S.removed,setup:S.setup,types:S.types,plan:S.plan,set:S.set,hist:S.hist,custom:S.custom,media:S.media,stepsX:S.stepsX,planDate:S.planDate,tpl:S.tpl,type:S.type,stash:S.stash}))}catch(e){}}
function applyData(d){
 if(!d)return;
 if(Array.isArray(d.machines)&&d.machines.length)S.machines=d.machines.filter(function(m){return typeof m==='string'&&m});
 if(Array.isArray(d.cardios)&&d.cardios.length)S.cardios=d.cardios.filter(function(m){return typeof m==='string'&&m});
 if(d.eqPick&&typeof d.eqPick==='object')S.eqPick=d.eqPick;
 if(d.setup&&typeof d.setup==='object'){['cardio','as','hand','schulter','aufr'].forEach(function(k){if(k in d.setup)S.setup[k]=!!d.setup[k]})}
 if(Array.isArray(d.removed)){S.removed=d.removed.filter(function(n){return typeof n==='string'});S.removed.forEach(removeEx)}
 if(d.live&&d.live.start)S.live=d.live;
 if(Array.isArray(d.types)){S.types.forEach(unregisterType);S.types=d.types.filter(function(t){return t&&t.id&&t.name&&Array.isArray(t.cats)});S.types.forEach(registerType)}
 if(Array.isArray(d.locRecent))S.locRecent=d.locRecent;
 if(d.locs&&d.locs.length){S.locs=d.locs;S.loc=locById(d.loc)?d.loc:d.locs[0].id}
 if(d.custom&&d.custom.length){S.custom=d.custom;d.custom.forEach(function(c){if(c.cat==='warm'&&c.eq==='Cardio'&&!c.sg){c.sg='cardio';c.param=c.param||'m'}addCustom(c)})}
 /* umbenannte eingebaute Übungen in alten Daten nachziehen */
 var RENAMED={'Allgemeines Aufwärmen':'Allgemeine Erwärmung'};
 ['plan','hist'].forEach(function(k){if(Array.isArray(d[k]))d[k].forEach(function(x){if(x&&RENAMED[x.name])x.name=RENAMED[x.name]})});
 if(d.plan&&d.plan.length)S.plan=d.plan;
 if(d.set){if(d.set.avoid)S.set.avoid=d.set.avoid;if(d.set.perWeek)S.set.perWeek=d.set.perWeek;if('voice' in d.set)S.set.voice=d.set.voice}
 if(d.hist)S.hist=d.hist;
 if(d.media)S.media=d.media;
 if(d.stepsX)S.stepsX=d.stepsX;
 if(d.planDate)S.planDate=d.planDate;
 if(d.tpl&&TPL[d.tpl])S.tpl=d.tpl;
 if(d.type&&TYPES[d.type])S.type=d.type;
 if(d.stash&&typeof d.stash==='object')S.stash=d.stash;
 ensureMach();initRecent();syncCustomEn();
}
function loadLocs(){try{applyData(JSON.parse(localStorage.getItem(LSKEY)||'null'))}catch(e){}}
/* Zuletzt genutzte Orte: ohne gespeicherte Reihenfolge aus dem Verlauf ableiten, der gewählte Ort steht immer vorn */
function initRecent(){
 if(!S.locRecent.length){var seen={};for(var i=S.hist.length-1;i>=0;i--){var l=S.locs.filter(function(x){return x.name===S.hist[i].loc})[0];if(l&&!seen[l.id]){seen[l.id]=1;S.locRecent.push(l.id)}}}
 touchLoc(S.loc);
}
function touchLoc(id){S.locRecent=[id].concat(S.locRecent.filter(function(x){return x!==id&&locById(x)}))}
function recentLocs(){var ids=[S.loc].concat(S.locRecent.filter(function(x){return x!==S.loc&&locById(x)}));S.locs.forEach(function(l){if(ids.indexOf(l.id)<0)ids.push(l.id)});return ids.map(locById)}
/* Englische Namen eigener Übungen an den Übersetzer melden */
function syncCustomEn(){Object.keys(I18N.CUSTOM).forEach(function(k){delete I18N.CUSTOM[k]});S.custom.forEach(function(c){if(c.en)I18N.CUSTOM[c.name]=c.en})}
/* Eigene Übungen aus dem Assistenten */
function addCustom(c){
 if(!POOL[c.cat])return;
 removeEx(c.name);/* eine eigene Fassung ersetzt eine gleichnamige eingebaute oder frühere */
 var pe=P(c.name,c.eq,c.sets||3,c.reps||'8',c.rest==null?90:c.rest,c.sub||'',c.mode||'reps',c.machine,{sg:c.sg,both:c.both,eqs:c.eqs,param:c.param});
 POOL[c.cat].push(pe);
 LIB.push(libEntry(c.cat,pe));
}
/* Übung aus dem Katalog löschen (eingebaute werden ausgeblendet und lassen sich unter Mehr wiederherstellen); Einträge im Verlauf bleiben */
function delEx(name){
 S.custom=S.custom.filter(function(x){return x.name!==name});
 removeEx(name);
 if(BASE[name]&&S.removed.indexOf(name)<0)S.removed.push(name);
 S.plan=S.plan.filter(function(p){return p.name!==name});relabel();
 saveLocs();
}
function restoreEx(name){S.removed=S.removed.filter(function(x){return x!==name});restoreBase(name);syncCustomEn();saveLocs()}
/* Plan an das Equipment am Ort anpassen: fehlt Equipment, wird eine Übung desselben Musters eingesetzt */
function adaptPlan(){
 var changed=0,missing=0;
 S.plan.forEach(function(p,i){
  if(p.was&&!p.locked){var o=fromPool(p.cat,p.was);if(o&&okEx(o,p.cat)&&S.plan.every(function(x){return x.name!==o.name})){S.plan[i]=Object.assign({},p,o,{rest:o.rest,na:false,was:null});changed++;return}}
  if(okEx(p,p.cat)){p.na=false;return}
  var names=S.plan.map(function(x){return x.name}),c=POOL[p.cat].filter(function(x){return okEx(x,p.cat)&&names.indexOf(x.name)<0&&(!p.sg||x.sg===p.sg)});
  if(p.locked||!c.length){p.na=true;missing++;return}
  var n=c[0];S.plan[i]=Object.assign({},n,{cat:p.cat,locked:false,grp:p.grp,na:false,was:p.was||p.name});changed++;
 });
 return {changed:changed,missing:missing};
}
function setLoc(id){
 if(id===S.loc)return;snap();S.loc=id;touchLoc(id);saveLocs();var r=adaptPlan();
 toast(curLoc().name+(r.changed?' · '+r.changed+' Übung'+(r.changed>1?'en':'')+' angepasst':' · Plan passt')+(r.missing?' · '+r.missing+' ohne Ersatz':''),true);
}
function fromPool(cat,name){return POOL[cat].filter(function(x){return x.name===name})[0]}
function metaLine(p){if(p.cat==='warm'){var lw=lastWarm(p.name);return (lw?'Letztes Mal '+mmss(lw.sec)+(warmVal(lw)?' · '+warmVal(lw):''):'Timer läuft hoch')+' · '+eqLabel(p)}return p.sets+' × '+p.reps+(p.both?' (beide Seiten)':'')+(p.rest?' · '+fmtRest(p.rest)+' Pause':'')+' · '+eqLabel(p)}
/* ---------- Einheiten und Tagesplan ---------- */
var TPL={
 gka:{name:'Ganzkörper A',slots:['warm:cardio','warm:allg','schnell','schnell','squat','push','hinge','pull','rumpf:seit','rumpf:ger','zusatz:as','zusatz:hand']},
 gkb:{name:'Ganzkörper B',slots:['warm:cardio','warm:allg','schnell','schnell','hinge','pull','squat','push','rumpf:seit','rumpf:ger','zusatz:as','zusatz:hand']},
 uk:{name:'Unterkörper',slots:['warm:cardio','warm:allg','schnell','schnell','hinge','squat','hinge','squat','rumpf:seit','rumpf:ger','zusatz:as','zusatz:hand']},
 ok:{name:'Oberkörper',slots:['warm:cardio','warm:allg','schnell','schnell','push','pull','push','pull','rumpf:seit','rumpf:ger','zusatz:as','zusatz:hand']},
 aufa:{name:'Aufrichtung A',slots:['mobil','haltung','huefte','haltung','huefte','mobil']},
 aufb:{name:'Aufrichtung B',slots:['huefte','mobil','haltung','huefte','haltung','mobil']}
};
Object.keys(TPL).forEach(function(k){TPL[k].type=/^auf/.test(k)?'aufricht':'kraft'});
/* Eigene Trainingsarten: ein Name und die Bewegungsmuster, aus denen die Einheit besteht (in der festen Reihenfolge der Muster) */
function typeCats(t){return ORDER.filter(function(c){return t.cats.indexOf(c)>-1})}
function registerType(t){
 TYPES[t.id]={name:t.name,sub:'Eigene Trainingsart · '+typeCats(t).map(function(c){return SLOT[c].l}).join(' · '),icon:'dumbbell',custom:true};
 TPL[t.id]={name:t.name,slots:typeCats(t),type:t.id};
}
function unregisterType(t){delete TYPES[t.id];delete TPL[t.id]}
function customType(id){return S.types.filter(function(t){return t.id===id})[0]}
function rotation(){return TYPES[S.type]&&TYPES[S.type].custom?[S.type]:(S.type==='aufricht'?['aufa','aufb']:(S.set.perWeek===2?['gka','gkb']:['uk','ok','gka']))}
function typOf(h){return h.typ||'kraft'}
function todayStr(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function pastDates(){var o={};S.hist.forEach(function(h){if(h.date!==todayStr()&&typOf(h)===S.type)o[h.date]=h.tpl||''});return Object.keys(o).sort().map(function(d){return {date:d,tpl:o[d]}})}
function nextTpl(){var rot=rotation(),p=pastDates(),last=p.length?p[p.length-1].tpl:'',i=rot.indexOf(last);return rot[(i+1)%rot.length]}
function recentNames(n){var ds=pastDates().slice(-n).map(function(x){return x.date});return S.hist.filter(function(h){return ds.indexOf(h.date)>-1&&typOf(h)===S.type}).map(function(h){return h.name})}
function cxRank(p){var s=p.sub||'';return /komplex/.test(s)?0:(/unilateral/.test(s)?2:(/isoliert/.test(s)?3:1))}
/* Plätze einer Vorlage: im Krafttraining je nach Einrichtung (Allgemeine Erwärmung ist immer dabei) */
function slotsFor(id){
 var t=TPL[id],o=S.setup;
 if(!t||t.slots.indexOf('warm:allg')<0)return t.slots;
 var s=t.slots.filter(function(x){return !((x==='warm:cardio'&&!o.cardio)||(x==='zusatz:as'&&!o.as)||(x==='zusatz:hand'&&!o.hand))});
 if(o.schulter)s.push('zusatz:schulter');
 if(o.aufr)s.push(['haltung','huefte','mobil'][Math.floor(Math.random()*3)]);
 return s;
}
function generatePlan(id){
 var t=TPL[id],used=[],recent=recentNames(2),items=[];
 slotsFor(id).forEach(function(slot){
  var cat=slotCat(slot),sg=slotSg(slot);
  var c=POOL[cat].filter(function(x){return okEx(x,cat)&&used.indexOf(x.name)<0&&(!sg||x.sg===sg)}),fresh=c.filter(function(x){return recent.indexOf(x.name)<0});
  if(fresh.length)c=fresh;
  if(!c.length)return;
  var p=c[Math.floor(Math.random()*c.length)];used.push(p.name);
  items.push(Object.assign({},p,{cat:cat,grp:'',locked:false,na:false,was:null}));
 });
 ['squat','hinge','push','pull'].forEach(function(cat){var ix=[],ls=[];items.forEach(function(it,i){if(it.cat===cat){ix.push(i);ls.push(it)}});
  if(ls.length>1){ls.sort(function(a,b){return cxRank(a)-cxRank(b)});ix.forEach(function(k,j){items[k]=ls[j]})}});
 return items;
}
function newDayPlan(){S.tpl=nextTpl();S.plan=generatePlan(S.tpl);S.planDate=todayStr();relabel();saveLocs()}
function weekCount(){var d=new Date(),dow=(d.getDay()+6)%7,mon=new Date(d.getFullYear(),d.getMonth(),d.getDate()-dow),o={};
 S.hist.forEach(function(h){var p=h.date.split('-'),x=new Date(+p[0],+p[1]-1,+p[2]);if(x>=mon)o[h.date]=1});
 var n=Object.keys(o).length;return o[todayStr()]?n:n+1}
/* Fortschritt heute: die heute geloggten Sätze einer Übung (nach Name und Trainingsart) bestimmen, ob sie offen oder abgeschlossen ist */
function todaySets(p){var d=todayStr();return S.hist.filter(function(h){return h.date===d&&h.name===p.name&&typOf(h)===S.type})}
function setsDone(p){return todaySets(p).length}
/* Übung gilt als erledigt, wenn alle Sätze gemacht sind oder du sie vorzeitig abgeschlossen hast (fin) */
function isDone(p){return !!p.fin||(p.sets>0&&setsDone(p)>=p.sets)}
function progP(p){var n=setsDone(p);return p.fin&&n<p.sets?n+' von '+p.sets+' Sätzen · vorzeitig beendet':progText(n,p.sets)}
function openIdx(){var o=[];S.plan.forEach(function(p,i){if(!isDone(p))o.push(i)});return o}
function nextOpenIdx(from){var o=openIdx().filter(function(i){return i!==from}),a=o.filter(function(i){return i>from});return a.length?a[0]:(o.length?o[0]:-1)}
function progText(n,total){return n+' von '+total+' Sätzen · '+(total-n>0?(total-n)+' offen':'alles erledigt')}
function planMinutes(){var s=0;S.plan.forEach(function(p){var d=p.mode==='time'?secOf(p)*(p.both?2:1):40;s+=p.sets*d+(p.sets-1)*p.rest});return Math.max(5,Math.round(s/60/5)*5)}
/* Trainingsart wechseln: der Plan der bisherigen Art wird für heute zwischengespeichert */
function setType(t){
 if(!TYPES[t]||t===S.type)return;
 S.stash[S.type]={plan:S.plan,tpl:S.tpl,date:S.planDate};
 var s=S.stash[t];S.type=t;
 if(s&&s.date===todayStr()&&s.plan&&s.plan.length&&TPL[s.tpl]&&TPL[s.tpl].type===t){S.plan=s.plan;S.tpl=s.tpl;S.planDate=s.date}
 else newDayPlan();
 adaptPlan();saveLocs();
}
loadLocs();ensureMach();initRecent();if(S.planDate!==todayStr()||!TPL[S.tpl]||TPL[S.tpl].type!==S.type)newDayPlan();adaptPlan();

/* ---------- Auswertungsdaten ---------- */
var SERIES={};
function build(name,unit,start,end,perWeek,step,seed,plateau,eps){
 var r=rng(seed),pts=[],prev=null,pv=null,t;
 for(t=0;t<=39.9;t+=1/perWeek){
  var f=Math.pow(t/39,0.92),v=start+(end-start)*f+(r()-0.5)*step*0.7;
  if(plateau!=null&&t>=plateau){v=pv!=null?pv:v}
  v=Math.round(v/step)*step; if(prev!=null&&r()<0.88){v=Math.max(v,prev)}
  if(pv==null||plateau==null||t<plateau){pv=v}
  var rt=prev==null?'p':(v>prev?'m':(v<prev?'w':'p'));
  pts.push({w:t,v:v,r:rt}); prev=v;
 }
 SERIES[name]={unit:unit,pts:pts,uses:pts.length,eps:eps||''};
}
build('Bankdrücken','kg',57.5,70,1,2.5,3);
build('Kniebeuge vorn','kg',60,80,.9,2.5,5,34.5);
build('Hexbar Kreuzheben','kg',80,112.5,.7,2.5,7);
build('Latzug','kg',50,62.5,.8,2.5,9);
build('Box Sprung','cm',40,60,.7,5,13);
build('Seitstütz statisch','s',25,52,.6,1,17);
var STACK=[];
(function(){var r=rng(21),base={schnell:5,squat:6,push:6,hinge:5,pull:6,rumpf:4};
 for(var w=0;w<40;w++){var row={w:w},tot=0;['schnell','squat','push','hinge','pull','rumpf'].forEach(function(c){var v=Math.max(2,Math.round(base[c]*(0.75+0.15*Math.min(1,w/12))+(r()-.5)*3));if(w%9===8)v=Math.max(2,Math.round(v*.6));row[c]=v;tot+=v});row.t=tot;row.n=(w%9===8)?2:(r()<.5?2:3);STACK.push(row)}})();

/* ---------- Screens ---------- */
var JUMPS=[['heute','Heute'],['ort','Ort wählen'],['voice','Sprache'],['train','Training'],['time','Zeit-Übung'],['stats','Auswertung'],['lib','Bibliothek'],['detail','Übungsdetail'],['wizard','Neue Übung'],['more','Einstellungen']];
function slotTag(cat){var s=SLOT[cat];return '<span class="tag"><i class="dot" style="--c:var('+s.c+')"></i>'+s.l+'</span>'}

/* Training läuft: die Übersicht bleibt die Basis, der Timer läuft weiter, wenn man zwischen Übungen wechselt */
function isLive(){return !!(S.live&&S.live.date===todayStr())}
function startLive(){if(!isLive()){S.live={start:Date.now(),date:todayStr(),last:0};saveLocs()}ensureTick()}
/* Timer oben: Gesamtdauer des Trainings (läuft ab der ersten Übung bis „Training beenden“) und, daneben, die Zeit seit dem letzten Satz (zählt hoch, kein Countdown) */
function sinceLast(){return isLive()&&S.live.last?Math.max(0,Math.floor((Date.now()-S.live.last)/1000)):-1}
function totalSec(){return isLive()?Math.max(0,Math.floor((Date.now()-S.live.start)/1000)):-1}
function hms(s){var h=Math.floor(s/3600);return h?h+':'+(Math.floor(s/60)%60<10?'0':'')+Math.floor(s/60)%60+':'+(s%60<10?'0':'')+s%60:mmss(s)}
function restBanner(){
 var t=totalSec(),s=sinceLast();if(t<0)return '';
 return '<div class="restbn" role="timer"><div class="rt"><small>Gesamt</small><b id="totn">'+hms(t)+'</b></div>'+(s>=0?'<div class="rt r"><small>Seit dem letzten Satz</small><b id="restn">'+mmss(s)+'</b></div>':'')+'</div>';
}
function ensureTick(){if(!S.rtmr)S.rtmr=setInterval(restTick,1000)}
function markSet(){startLive();S.live.last=Date.now();saveLocs();ensureTick()}
function endRest(){clearInterval(S.rtmr);S.rtmr=null;if(S.live)S.live.last=0}
function restTick(){var t=totalSec();if(t<0){clearInterval(S.rtmr);S.rtmr=null;return}var s=sinceLast(),a=$('#totn'),n=$('#restn');if(a)a.textContent=hms(t);if(n&&s>=0)n.textContent=mmss(s)}

function sHeute(){
 var openL=openIdx(),doneL=S.plan.length-openL.length,anySets=S.plan.some(function(p){return setsDone(p)>0}),live=isLive();
 var out='<div class="pad"><div class="eyebrow">'+(live?'Training läuft · seit '+new Date(S.live.start).toTimeString().slice(0,5):new Date().toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'}))+'</div><h1 class="h1">'+esc(TPL[S.tpl].name)+'</h1>'+
 '<p class="sub">Einheit '+weekCount()+' dieser Woche · '+S.plan.length+' Übungen'+(doneL?' · '+doneL+' erledigt':'')+' · ca. '+planMinutes()+' min</p>'+
 restBanner()+
 '<button class="locrow" data-act="sheet" data-s="loc" aria-label="Trainingsort wechseln"><span class="pin">'+ic('pin',20)+'</span><span class="txt"><small>Trainingsort · '+eqCount()+' Geräte</small><b>'+esc(curLoc().name)+'</b></span><span class="mut" style="font-size:13px;font-weight:600;display:flex;align-items:center;gap:2px">wechseln'+ic('next',14)+'</span></button>'+
 (openL.length?'<div class="group">':'<div class="hint">'+ic('check',18)+'<span><b>Alle '+S.plan.length+' Übungen sind erledigt.</b> Gut gemacht. Unten findest du sie unter „Abgeschlossen“.</span></div>');
 S.plan.forEach(function(p,i){
  if(isDone(p))return;
  /* Supersatz-Kopf nur, wenn beide Übungen des Supersatzes noch offen sind */
  if(p.grp==='A2'&&i>0&&!isDone(S.plan[i-1])){out+='<div class="ss">'+ic('swap',13)+'Supersatz · abwechselnd</div>'}
  var open=S.exp===i,nd=setsDone(p),up=moveTarget(i,-1)>-1,dn=moveTarget(i,1)>-1;
  out+='<div class="item"><div class="irow"><button class="item-main" data-act="exp" data-i="'+i+'" aria-expanded="'+open+'"><span class="grp">'+p.grp+'</span><span class="txt">'+slotTag(p.cat)+'<b>'+esc(p.name)+(p.locked?' &nbsp;'+ic('lock',13):'')+'</b><small>'+esc(metaLine(p))+'</small>'+(nd?'<span class="prog" aria-label="'+esc(progText(nd,p.sets))+'"><span class="mini">'+Array.apply(null,Array(p.sets)).map(function(x,k){return '<i'+(k<nd?' class="done"':'')+'></i>'}).join('')+'</span>'+esc(progText(nd,p.sets))+'</span>':'')+(p.na?'<span class="warn">'+ic('alert',13)+(eqOk(p)?'Wegen „Heute meiden“ gesperrt':esc(eqOn(p.eq)?machOf(p):p.eq)+' gibt es hier nicht')+'</span>':(p.was&&p.was!==p.name?'<span class="was">statt '+esc(p.was)+'</span>':''))+'</span><span class="mut">'+ic(open?'chevd':'next',16)+'</span></button>'+
   '<button class="playbtn" data-act="enter" data-i="'+i+'" aria-label="'+esc(p.name)+(nd?' fortsetzen':' starten')+'">'+ic('play',20)+'</button></div>';
  if(open){out+='<div class="actions">'+
   '<button class="act" data-act="dice" data-i="'+i+'">'+ic('dice',20)+'Würfeln</button>'+
   '<button class="act" data-act="pick" data-i="'+i+'">'+ic('swap',20)+'Ersetzen</button>'+
   '<button class="act" data-act="lock" data-i="'+i+'" aria-pressed="'+!!p.locked+'">'+ic('lock',20)+'Behalten</button>'+
   '<button class="act" data-act="mv" data-i="'+i+'" data-d="-1"'+(up?'':' disabled')+'>'+ic('up',20)+'Nach oben</button>'+
   '<button class="act" data-act="mv" data-i="'+i+'" data-d="1"'+(dn?'':' disabled')+'>'+ic('down',20)+'Nach unten</button>'+
   '<button class="act" data-act="editex" data-n="'+esc(p.name)+'" data-i="'+i+'">'+ic('edit',20)+'Bearbeiten</button>'+
   '<button class="act" data-act="del" data-i="'+i+'">'+ic('trash',20)+'Streichen</button></div>'}
  out+='</div>';
 });
 if(openL.length)out+='</div>';
 /* Abgeschlossene Übungen sind unter einem Punkt gesammelt, nur offene stehen in der Liste */
 if(doneL){
  out+='<button class="donebtn" data-act="toggledone" aria-expanded="'+S.showDone+'"><span class="ck">'+ic('check',16)+'</span><span class="txt"><b>Abgeschlossen · '+doneL+(doneL===1?' Übung':' Übungen')+'</b><small>'+(S.showDone?'Tippen zum Einklappen':'Tippen zum Anzeigen')+'</small></span>'+ic(S.showDone?'chevd':'next',16)+'</button>';
  if(S.showDone)out+='<div class="group" style="margin-bottom:12px">'+S.plan.map(function(p,i){return isDone(p)?'<button class="lrow" data-act="reopen" data-i="'+i+'"><span class="grp">'+p.grp+'</span><span class="txt"><b>'+esc(p.name)+'</b><small>'+esc(progP(p))+'</small></span><span class="okbadge">'+ic('check',14)+'Erledigt</span></button>':''}).join('')+'</div>';
 }
 out+='<button class="btn ghost" data-act="sheet" data-s="add">'+ic('plus',18)+'Übung hinzufügen</button>'+
 '<div class="row2" style="margin-top:10px"><button class="btn" style="flex:1" data-act="rerollall">'+ic('dice',18)+'Alles neu würfeln</button><button class="btn" style="flex:1" data-act="sheet" data-s="tpl">'+ic('swap',18)+'Einheit wechseln</button></div>'+
 ((live||anySets)?'<button class="btn wide" style="margin-top:10px" data-act="finish">'+ic('check',18)+'Training abschließen</button><p class="mut" style="margin:8px 0 0;font-size:12px">Jederzeit möglich, auch wenn noch Übungen oder Sätze offen sind.</p>':'')+'</div>'+
 '<div class="cta">'+(openL.length?'<button class="btn primary big" data-act="start">'+ic('play',18)+(anySets?'Training fortsetzen':'Training starten')+'</button>':'<button class="btn primary big" data-act="finish">'+ic('check',18)+'Training abschließen</button>')+'<button class="fab" data-act="voice" aria-label="Plan per Sprache ändern">'+ic('mic',24)+'</button></div>';
 return out;
}

/* Ziel der Verschiebung: der nächste noch offene Nachbar in dieser Richtung (erledigte Übungen werden übersprungen) */
function moveTarget(i,d){for(var j=i+d;j>=0&&j<S.plan.length;j+=d){if(!isDone(S.plan[j]))return j}return -1}
function movePlan(i,d){var j=moveTarget(i,d);if(j<0)return i;snap();var t=S.plan[i];S.plan[i]=S.plan[j];S.plan[j]=t;relabel();return j}

function curEx(){return S.tr.over||S.plan[S.tr.i]}
function eqChoices(ex){var l=eqsOf(ex).filter(function(q){return eqOn(q)});return l.length?l:[ex.eq]}
function wstepOf(ex,eq,rf){return (eq==='Kurzhantel'||eq==='Kettlebell')?0.5:rf.step}
function resetInputs(){
 var ex=curEx(),ch=eqChoices(ex),pk=S.eqPick[ex.name],t=S.tr;
 t.eq=ch.indexOf(pk)>-1?pk:ch[0];
 var rf=getRef(ex.name,t.eq);
 t.kg=rf.sug;t.reps=parseInt(ex.reps,10)||8;t.rir=1;t.sec=ex.mode==='time'?(rf.hist?rf.sug:secOf(ex)):0;t.running=false;t.held=[];t.secLog=0;t.el=0;t.pv='';t.peek=-1;t.ra='';t.phase='input';
}
function sTrain(){
 var t=S.tr,ex=curEx(),eqSel=t.eq||ex.eq,rf=getRef(ex.name,eqSel),time=ex.mode==='time',warm=ex.cat==='warm',total=ex.sets,out='',ch=eqChoices(ex),ss=secStep(ex.name);
 var idx=t.over?S.plan.length:t.i+1,par=warm&&paramOf(ex)?PARAMS[paramOf(ex)]:null;
 out+='<div class="top-bar"><button class="iconbtn" data-act="go" data-s="heute" aria-label="Zur Übersicht">'+ic('list',24)+'</button><span class="cnt">Übung '+idx+' von '+S.plan.length+'</span>'+
  '<span class="row2"><button class="iconbtn nav" data-act="exnav" data-d="-1" aria-label="Vorige Übung">'+ic('back',28)+'</button><button class="iconbtn nav" data-act="exnav" data-d="1" aria-label="Nächste Übung">'+ic('next',28)+'</button><button class="iconbtn nav" data-act="sheet" data-s="exmenu" aria-label="Weitere Aktionen">'+ic('more',24)+'</button></span></div><div class="pad">';
 out+=restBanner()+slotTag(ex.cat)+'<h1 class="h1" style="font-size:36px">'+esc(ex.name)+'</h1>';
 var nLog=t.log.length;out+='<div class="setline"><b>'+nLog+' von '+total+' Sätzen erledigt</b> · '+(total-nLog>0?(total-nLog)+' offen':'alles erledigt')+'</div>';
 /* Satz-Streifen: erledigte Sätze sind antippbar und zeigen, was du genommen hast */
 out+='<div class="dots">';for(var s=1;s<=total;s++){var cls=(s<t.set?'done':(s===t.set&&t.phase!=='done'?'cur':(t.phase==='done'&&s<=nLog?'done':''))),isDoneSet=s<=nLog;
  out+='<button type="button" class="dotb '+cls+'" data-act="peek" data-k="'+(s-1)+'" aria-label="Satz '+s+(isDoneSet?' ansehen':'')+'"'+(isDoneSet?'':' disabled')+'><i></i></button>'}out+='</div>';
 if(t.peek>=0&&t.log[t.peek]){var pl=t.log[t.peek];
  out+='<div class="peek"><b>Satz '+(t.peek+1)+'</b> · '+(warm?mmss(pl.sec)+(pl.pv!=null?' · '+fmt(pl.pv)+' '+pl.pu:''):(time?fmtSec(pl.sec):fmt(pl.kg)+' kg × '+pl.reps+(pl.rir!=null?' · '+pl.rir+' RIR':'')))+(warm?'':' · '+(pl.r==='m'?'Mehr':(pl.r==='w'?'Weniger':'Passt'))+(pl.d?' ('+(pl.d>0?'+':'−')+fmt(Math.abs(pl.d))+(time?' s':' kg')+')':''))+'</div>'}
 if(t.phase==='done'){
  var last=t.log[t.log.length-1],nx=warm?'':nextSuggest(last,rf,time,ss);
  out+='<div class="eyebrow" style="margin-bottom:8px">Übung abgeschlossen</div><div class="group" style="margin-bottom:12px">';
  t.log.forEach(function(l,k){out+='<div class="logrow"><span><b>Satz '+(k+1)+'</b> &nbsp;'+(warm?mmss(l.sec)+(l.pv!=null?' · '+fmt(l.pv)+' '+l.pu:''):(time?fmtSec(l.sec):fmt(l.kg)+' kg × '+l.reps))+'</span>'+(warm?'':'<span class="ic">'+ic(l.r==='m'?'up':(l.r==='w'?'down':'eq'),18)+'</span>')+'</div>'});
  out+='</div>'+(warm?'':'<div class="hint">'+ic('info',18)+'<span>Nächstes Mal: <b>'+nx+'</b> (abgeleitet aus deiner letzten Bewertung).</span></div>');
  var nxi=t.over?-1:nextOpenIdx(t.i),nxt=nxi>=0?S.plan[nxi]:null;
  if(!warm)out+='<button class="btn wide" data-act="addset" style="margin-bottom:8px">'+ic('plus',18)+'Satz hinzufügen</button>';
  out+='</div><div class="cta"><button class="btn primary big" data-act="nextex">'+(nxt?'Weiter: '+esc(nxt.name):'Einheit abschließen')+ic('next',18)+'</button></div>';
  return out;
 }
 if(t.phase==='rate'){
  out+='<div class="field"><small>Satz '+t.set+' gespeichert</small><div class="num" style="font-size:44px;line-height:1.1;padding:2px 6px">'+(time?fmtSec(t.secLog||t.sec):fmt(t.kg)+' kg × '+t.reps)+(!time?' <span class="mut" style="font-size:20px">· '+t.rir+' RIR</span>':'')+'</div></div>'+
  '<div class="eyebrow" style="margin:14px 0 0">Wie war der Satz?</div><div class="rate">'+
  '<button data-act="rate" data-r="w">'+ic('down',26)+'Weniger<small>nächstes Mal</small></button>'+
  '<button data-act="rate" data-r="p">'+ic('eq',26)+'Passt<small>so lassen</small></button>'+
  '<button data-act="rate" data-r="m">'+ic('up',26)+'Mehr<small>nächstes Mal</small></button></div></div>';
  return out;
 }
 if(t.phase==='amount'){
  var more=t.ra==='m',cur=time?fmtSec(t.secLog||t.sec):fmt(t.kg)+' kg × '+t.reps;
  out+='<div class="field"><small>Satz '+t.set+' gespeichert</small><div class="num" style="font-size:44px;line-height:1.1;padding:2px 6px">'+cur+'</div></div>'+
  '<div class="eyebrow" style="margin:14px 0 8px">'+(more?'Wie viel mehr beim nächsten Satz?':'Wie viel weniger beim nächsten Satz?')+'</div><div class="amounts">'+
  amountChoices(ex,eqSel).map(function(v){return '<button data-act="rateamt" data-v="'+v+'">'+(more?'+':'−')+fmt(v)+(time?' s':' kg')+'</button>'}).join('')+'</div>'+
  '<button class="btn wide" style="margin-top:12px" data-act="rateback">'+ic('back',18)+'Zurück zur Bewertung</button></div>';
  return out;
 }
 var canDone=true;
 if(warm){
  /* Erwärmung: Timer läuft hoch, am Ende Messgröße eintragen; Letztes Mal und Durchschnitt aller Erwärmungen */
  var lw=lastWarm(ex.name),av=warmAvg(),tl=t.running?Math.max(0,Math.floor((Date.now()-t.start)/1000)):t.el;
  out+='<div class="hint">'+ic('info',18)+'<span><b>'+(lw?'Letztes Mal '+mmss(lw.sec)+(warmVal(lw)?' · '+warmVal(lw):''):'Noch keine Einträge')+'.</b>'+(av.n>1||(av.n===1&&!lw)?'':'')+(av.n?' Ø aller Erwärmungen: '+mmss(av.avg)+' ('+av.n+'×).':' Der Timer läuft hoch, stoppe ihn, wenn du fertig bist.')+'</span></div>';
  canDone=!t.running&&t.el>0;
  out+='<div class="field"><small>'+(t.running?'läuft':'Zeit')+'</small><div class="stepper"><button class="sb" data-act="wuadj" data-d="-30" aria-label="30 Sekunden weniger"'+(t.running?' disabled':'')+'>'+ic('minus',22)+'</button><div class="val" id="secv">'+mmss(tl)+'</div><button class="sb" data-act="wuadj" data-d="30" aria-label="30 Sekunden mehr"'+(t.running?' disabled':'')+'>'+ic('plus',22)+'</button></div></div>'+
  (t.running?'<button class="btn wide" data-act="wustop" style="height:56px;margin-bottom:10px">'+ic('stop',20)+'Stopp</button>':'<button class="btn primary wide" data-act="wustart" style="height:56px;margin-bottom:10px">'+ic('timer',20)+(t.el>0?'Weiter':'Start')+'</button>');
  if(par)out+='<div class="field"><small>'+par.l+' ('+par.u+', optional)</small><input class="inp" id="warmval" inputmode="decimal" value="'+esc(t.pv)+'" placeholder="'+(lw&&lw.pv!=null?fmt(lw.pv):'')+'" aria-label="'+esc(par.l)+'"></div>';
 }else{
  out+='<div class="goal"><div><small>Ziel</small><b>'+total+' × '+esc(ex.reps)+'</b></div><div><small>'+(time?'Pause (Empfehlung)':'Pause (Empfehlung) · Reserve')+'</small><b>'+(ex.rest?fmtRest(ex.rest):'–')+(time?'':' · 1 RIR')+'</b></div></div>'+
  '<div class="hint">'+ic('info',18)+'<span><b>'+(rf.hist?(time?'Letztes Mal '+fmtSec(rf.sec):'Letztes Mal '+fmt(rf.kg)+' kg × '+rf.reps):'Startwert')+'.</b> '+esc(rf.why)+'</span></div>';
  if(time){
   /* Zeit-Übung: Stoppuhr zählt von der Zielzeit auf 0 herunter, bei beidseitigen Übungen je Seite ein Durchgang */
   var sides=ex.both?2:1,hd=t.held||[],side=Math.min(hd.length+1,sides),left=t.running?Math.max(0,Math.ceil((t.end-Date.now())/1000)):t.sec,fin=hd.length>=sides;
   canDone=!t.running&&(!ex.both||fin);
   out+='<div class="field"><small>'+(ex.both?'Seite '+side+' von '+sides+' · ':'')+(t.running?'läuft':'Zielzeit')+'</small><div class="stepper"><button class="sb" data-act="adj" data-f="sec" data-d="-'+ss+'" aria-label="'+ss+' Sekunden weniger"'+((t.running||fin)?' disabled':'')+'>'+ic('minus',22)+'</button><div class="val" id="secv">'+mmss(left)+'</div><button class="sb" data-act="adj" data-f="sec" data-d="'+ss+'" aria-label="'+ss+' Sekunden mehr"'+((t.running||fin)?' disabled':'')+'>'+ic('plus',22)+'</button></div>'+
   (hd.length?'<p class="mut" style="margin:8px 6px 0;font-size:13px">'+hd.map(function(h,k){return (ex.both?'Seite '+(k+1)+': ':'')+fmtSec(h)}).join(' · ')+'</p>':'')+'</div>'+
   (t.running?'<button class="btn wide" data-act="cdstop" style="height:56px;margin-bottom:10px">'+ic('stop',20)+'Stopp</button>':(fin?'':'<button class="btn primary wide" data-act="cdstart" style="height:56px;margin-bottom:10px">'+ic('timer',20)+'Start'+(ex.both?' · Seite '+side+' von '+sides:'')+'</button>'));
  }else{
   var ws=wstepOf(ex,eqSel,rf);
   if(ch.length>1)out+='<div class="field"><small>Gerät</small><div class="seg">'+ch.map(function(q){return '<button data-act="seteq" data-v="'+esc(q)+'" aria-pressed="'+(q===eqSel)+'">'+esc(q)+'</button>'}).join('')+'</div></div>';
   out+='<div class="field"><small>Gewicht</small><div class="stepper"><button class="sb" data-act="adj" data-f="kg" data-d="-'+ws+'" aria-label="Gewicht verringern">'+ic('minus',22)+'</button><div class="val">'+fmt(t.kg)+'<em>kg</em></div><button class="sb" data-act="adj" data-f="kg" data-d="'+ws+'" aria-label="Gewicht erhöhen">'+ic('plus',22)+'</button></div></div>'+
   '<div class="field"><small>Wiederholungen</small><div class="stepper"><button class="sb" data-act="adj" data-f="reps" data-d="-1" aria-label="Eine Wiederholung weniger">'+ic('minus',22)+'</button><div class="val">'+t.reps+'</div><button class="sb" data-act="adj" data-f="reps" data-d="1" aria-label="Eine Wiederholung mehr">'+ic('plus',22)+'</button></div></div>'+
   '<div class="field"><small>Wiederholungen in Reserve (optional)</small><div class="seg">'+[0,1,2,3].map(function(v){return '<button data-act="rir" data-v="'+v+'" aria-pressed="'+(t.rir===v)+'">'+v+(v===3?'+':'')+' RIR</button>'}).join('')+'</div></div>';
  }
 }
 if(!warm)out+='<div class="row2" style="margin-bottom:8px"><button class="btn" style="flex:1" data-act="addset">'+ic('plus',18)+'Satz hinzufügen</button><button class="btn" style="flex:1" data-act="finex"'+(nLog?'':' disabled')+'>'+ic('check',18)+'Übung abschließen</button></div>';
 out+='<button class="btn" data-act="go" data-s="detail" data-n="'+esc(ex.name)+'" style="width:100%;margin-bottom:4px">'+ic('video',18)+'Ablauf und Medien ansehen</button></div>'+
 '<div class="cta"><button class="btn primary big" data-act="done"'+(canDone?'':' disabled')+'>'+ic('check',20)+'Satz abschließen</button></div>';
 return out;
}
function mmss(s){var m=Math.floor(s/60),r=s%60;return m+':'+(r<10?'0':'')+r}
function nextSuggest(last,rf,time,ss){
 if(time){var d=last.r==='m'?ss:(last.r==='w'?-ss:0);return fmtSec(Math.max(ss,last.sec+d))}
 var d2=last.r==='m'?rf.step:(last.r==='w'?-rf.step:0);return fmt(last.kg+d2)+' kg × '+last.reps
}

/* Diagramme */
var CH={};
/* Quelle der Auswertung: echte Sätze, oder Beispieldaten solange noch nichts geloggt ist und der Schalter an ist */
var CURSRC=null;
function statsSrc(){
 var demo=S.demo&&!S.hist.length;
 CURSRC=demo?{demo:true,series:SERIES,rows:function(r){return STACK.slice(Math.max(0,40-r))}}:{demo:false,series:KT.buildSeries(S.hist),rows:function(r){return KT.weekRows(S.hist,r)}};
 return CURSRC;
}
function rangeEff(){var r=S.stats.range;if(r)return r;return CURSRC&&CURSRC.demo?40:Math.max(12,Math.min(156,KT.maxAgeWeeks(S.hist)+1))}
function seriesSlice(name,range){return CURSRC.series[name].pts.filter(function(p){return p.w>=40-range})}
function trend(pts){
 var n=pts.length,sx=0,sy=0,sxy=0,sxx=0;pts.forEach(function(p){sx+=p.w;sy+=p.v;sxy+=p.w*p.v;sxx+=p.w*p.w});
 var den=n*sxx-sx*sx;if(!den)return {a:sy/n,b:0};var b=(n*sxy-sx*sy)/den;return {a:(sy-b*sx)/n,b:b};
}
function lineChart(name,range,id){
 var sr=CURSRC.series[name],pts=seriesSlice(name,range),W=340,ml=34,mr=10,mt=12,pb=118,track=146;
 if(!pts.length)return null;
 var vs=pts.map(function(p){return p.v}),lo=Math.min.apply(null,vs),hi=Math.max.apply(null,vs);
 var st=sr.unit==='s'?10:5;lo=Math.floor((lo-1)/st)*st;hi=Math.ceil((hi+1)/st)*st;
 while((hi-lo)/st>4)st*=2;lo=Math.floor(lo/st)*st;hi=Math.ceil(hi/st)*st;
 var x0=40-range,xs=function(w){return ml+(w-x0)/range*(W-ml-mr)},ys=function(v){return mt+(1-(v-lo)/(hi-lo))*(pb-mt)};
 var g='',v;for(v=lo;v<=hi+0.001;v+=st){g+='<line class="grid" x1="'+ml+'" x2="'+(W-mr)+'" y1="'+ys(v).toFixed(1)+'" y2="'+ys(v).toFixed(1)+'"/><text x="'+(ml-6)+'" y="'+(ys(v)+3).toFixed(1)+'" text-anchor="end">'+fmt(v)+'</text>'}
 var d='M'+pts.map(function(p){return xs(p.w).toFixed(1)+' '+ys(p.v).toFixed(1)}).join(' L');
 var tr=trend(pts),ta=tr.a+tr.b*pts[0].w,tb=tr.a+tr.b*pts[pts.length-1].w;
 var pr=pts.reduce(function(a,p){return p.v>=a.v?p:a},pts[0]),lastp=pts[pts.length-1];
 var svg='<svg viewBox="0 0 '+W+' 192" role="img" aria-label="Verlauf '+esc(name)+'">'+g+
  '<text x="'+ml+'" y="136" text-anchor="start">'+dateOf(x0)+'</text><text x="'+((ml+W-mr)/2)+'" y="136" text-anchor="middle">'+dateOf(x0+range/2)+'</text><text x="'+(W-mr)+'" y="136" text-anchor="end">'+dateOf(40)+'</text>'+
  '<line x1="'+xs(pts[0].w).toFixed(1)+'" y1="'+ys(ta).toFixed(1)+'" x2="'+xs(lastp.w).toFixed(1)+'" y2="'+ys(tb).toFixed(1)+'" stroke="var(--ink-3)" stroke-width="1.5" stroke-dasharray="4 4"/>'+
  '<path d="'+d+'" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'+
  '<circle cx="'+xs(pr.w).toFixed(1)+'" cy="'+ys(pr.v).toFixed(1)+'" r="5" fill="var(--c-push)" stroke="var(--surface)" stroke-width="2"/>'+
  '<text x="'+(xs(pr.w)>W-90?xs(pr.w)-9:xs(pr.w)+9).toFixed(1)+'" text-anchor="'+(xs(pr.w)>W-90?'end':'start')+'" y="'+(ys(pr.v)-6).toFixed(1)+'" style="fill:var(--ink-2);font-weight:700">PR '+fmt(pr.v)+' '+sr.unit+'</text>'+
  '<circle cx="'+xs(lastp.w).toFixed(1)+'" cy="'+ys(lastp.v).toFixed(1)+'" r="5" fill="var(--ink)" stroke="var(--surface)" stroke-width="2"/>'+
  '<text x="4" y="'+(track+4)+'">Mehr</text><text x="4" y="'+(track+16)+'">Passt</text><text x="4" y="'+(track+28)+'">Weniger</text>';
 pts.forEach(function(p){var yy=p.r==='m'?track:(p.r==='p'?track+12:track+24);svg+='<circle cx="'+xs(p.w).toFixed(1)+'" cy="'+(yy+0).toFixed(1)+'" r="2.6" '+(p.r==='p'?'fill="none" stroke="var(--ink-3)" stroke-width="1.5"':'fill="var(--ink)"')+'/>'});
 svg+='<line id="'+id+'x" x1="0" x2="0" y1="'+mt+'" y2="'+pb+'" stroke="var(--ink)" stroke-width="1" opacity="0"/></svg>';
 CH[id]={kind:'line',pts:pts,xs:xs,W:W,unit:sr.unit,vbH:192,ys:ys,H:192};
 return {svg:svg,tr:tr,pts:pts,pr:pr,last:lastp};
}
function stackChart(range,id){
 var rows=CURSRC.rows(range),W=340,ml=26,mr=6,mt=8,pb=130,H=170;
 var max=0;rows.forEach(function(r){max=Math.max(max,r.t)});var top=Math.max(10,Math.ceil(max/10)*10);
 var bw=(W-ml-mr)/rows.length,gap=Math.max(1.5,bw*.18),ys=function(v){return pb-(v/top)*(pb-mt)};
 var g='',v;for(v=0;v<=top;v+=10){g+='<line class="grid" x1="'+ml+'" x2="'+(W-mr)+'" y1="'+ys(v).toFixed(1)+'" y2="'+ys(v).toFixed(1)+'"/><text x="'+(ml-5)+'" y="'+(ys(v)+3).toFixed(1)+'" text-anchor="end">'+v+'</text>'}
 var bars='';
 rows.forEach(function(r,i){
  var x=ml+i*bw+gap/2,w=bw-gap,acc=0;
  var lastK=-1;STATCATS.forEach(function(c,k){if((r[c]||0)>0)lastK=k});
  STATCATS.forEach(function(c,k){
   var h=((r[c]||0)/top)*(pb-mt),y=pb-acc-h;acc+=h;var hh=Math.max(0,h-2),isTop=k===lastK;
   if(isTop&&w>6){var rr=Math.min(4,w/2,hh/2);bars+='<path d="M'+x.toFixed(1)+' '+(y+2+hh).toFixed(1)+'V'+(y+2+rr).toFixed(1)+'Q'+x.toFixed(1)+' '+(y+2).toFixed(1)+' '+(x+rr).toFixed(1)+' '+(y+2).toFixed(1)+'H'+(x+w-rr).toFixed(1)+'Q'+(x+w).toFixed(1)+' '+(y+2).toFixed(1)+' '+(x+w).toFixed(1)+' '+(y+2+rr).toFixed(1)+'V'+(y+2+hh).toFixed(1)+'Z" style="fill:var('+SLOT[c].c+')"/>'}
   else bars+='<rect x="'+x.toFixed(1)+'" y="'+(y+2).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+hh.toFixed(1)+'" style="fill:var('+SLOT[c].c+')"/>';
  });
  bars+='<rect data-i="'+i+'" x="'+(ml+i*bw).toFixed(1)+'" y="0" width="'+bw.toFixed(1)+'" height="'+pb+'" fill="transparent"/>';
 });
 var svg='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Sätze pro Woche nach Bewegungsmuster">'+g+bars+
  '<text x="'+ml+'" y="148" text-anchor="start">KW '+kwOf(rows[0].w)+'</text><text x="'+(W-mr)+'" y="148" text-anchor="end">KW '+kwOf(rows[rows.length-1].w)+'</text></svg>';
 CH[id]={kind:'stack',rows:rows,W:W,ml:ml,bw:bw};
 return svg;
}
function spark(name){
 var pts=CURSRC.series[name].pts.filter(function(p){return p.w>=28}),vs=pts.map(function(p){return p.v}),lo=Math.min.apply(null,vs),hi=Math.max.apply(null,vs);
 if(pts.length<2)return '<svg width="64" height="24" viewBox="0 0 64 24" aria-hidden="true"></svg>';
 if(hi===lo)hi=lo+1;
 var d='M'+pts.map(function(p){return (2+(p.w-28)/12*60).toFixed(1)+' '+(20-(p.v-lo)/(hi-lo)*16).toFixed(1)}).join(' L');
 var l=pts[pts.length-1];
 return '<svg width="64" height="24" viewBox="0 0 64 24" aria-hidden="true"><path d="'+d+'" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="'+(2+(l.w-28)/12*60).toFixed(1)+'" cy="'+(20-(l.v-lo)/(hi-lo)*16).toFixed(1)+'" r="3" fill="var(--ink)"/></svg>';
}
function sStats(){
 var src=statsSrc(),st=S.stats,names=Object.keys(src.series),empty=!names.length,range=rangeEff(),out;
 out='<div class="pad"><h1 class="h1">Auswertung</h1><p class="sub">'+(src.demo?'Beispieldaten für 40 Wochen. Sobald du Sätze loggst, siehst du hier deine echten Werte.':'Alle Werte stammen aus deinen geloggten Sätzen.')+'</p>';
 if(empty){
  return out+'<div class="card"><h3>Noch keine Einträge</h3><p class="cap" style="margin-bottom:12px">Starte ein Training und logge deine Sätze. Danach erscheinen hier Verlauf, Trend, Bestleistungen und die Nutzung deiner Übungen.</p><div class="row2"><button class="btn primary" style="flex:1" data-act="tab" data-t="heute">Zum Training</button><button class="btn" style="flex:1" data-act="demo" data-v="1">Beispieldaten ansehen</button></div></div></div>';
 }
 if(src.demo)out+='<div class="hint" style="margin-bottom:12px">'+ic('info',18)+'<span>Das sind Beispieldaten. <button data-act="demo" data-v="0" style="background:none;border:0;padding:0;font-weight:700;text-decoration:underline">Ausblenden</button></span></div>';
 out+='<div class="seg" style="margin-bottom:10px">'+[[4,'4 Wo.'],[12,'12 Wo.'],[26,'6 Mon.'],[0,'Alles']].map(function(r){return '<button data-act="range" data-r="'+r[0]+'" aria-pressed="'+(st.range===r[0])+'">'+r[1]+'</button>'}).join('')+'</div>'+
 '<div class="seg" style="margin-bottom:14px"><button data-act="sub" data-v="ueber" aria-pressed="'+(st.sub==='ueber')+'">Überblick</button><button data-act="sub" data-v="ex" aria-pressed="'+(st.sub==='ex')+'">Übungen</button></div>';
 if(st.sub==='ueber'){
  var rows=src.rows(range),tot=0,n=0;rows.forEach(function(r){tot+=r.t;n+=r.n});
  out+='<div class="card"><h3>Sätze pro Woche</h3><p class="cap">Ø '+fmt(tot/rows.length,0)+' Sätze und '+fmt(n/rows.length)+' Einheiten pro Woche, nach Bewegungsmuster</p><div class="chart" data-ch="stk">'+stackChart(range,'stk')+'<div class="tip" hidden></div></div>'+
  '<div class="legend">'+STATCATS.map(function(c){return '<span><i class="dot" style="--c:var('+SLOT[c].c+')"></i>'+SLOT[c].l+'</span>'}).join('')+'</div></div>';
  out+='<div class="card"><h3>Konsistenz</h3><p class="cap">Einheiten pro Woche, letzte 12 Wochen</p><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:4px;align-items:end">';
  src.rows(12).forEach(function(r){out+='<div style="display:flex;flex-direction:column;gap:3px;align-items:center"><div style="display:flex;flex-direction:column-reverse;gap:3px;width:100%">'+[1,2,3].map(function(k){return '<i style="height:12px;border-radius:4px;background:'+(k<=r.n?'var(--ink)':'var(--line)')+'"></i>'}).join('')+'</div><span class="mut" style="font-size:10px">'+kwOf(r.w)+'</span></div>'});
  out+='</div></div>';
  var tn=KT.tendencies(src.series);
  out+='<div class="card"><h3>Tendenzen</h3><p class="cap">Hinweise aus deinen letzten Einheiten</p>'+(tn.length?tn.map(function(x){return '<div class="note">'+ic(x.icon,18)+'<span>'+x.text+'</span></div>'}).join(''):'<div class="note">'+ic('info',18)+'<span>Noch keine Auffälligkeiten. Ab etwa vier Einheiten pro Übung erscheinen hier Hinweise zu Stagnation und Fortschritt.</span></div>')+'</div>';
  var un=src.demo?[{name:'Hip Thrust'},{name:'Roll-Out'},{name:'Kurzhantel Rudern'}]:KT.unused(LIB,S.hist).slice(0,12);
  out+='<div class="card"><h3>Nicht genutzt</h3><p class="cap">Seit mehr als 8 Wochen nicht trainiert oder noch nie</p><div class="chips">'+(un.length?un.map(function(u){return '<span class="chip ex">'+esc(u.name)+(u.never?' · neu':'')+'</span>'}).join(''):'<span class="mut">Alles in Benutzung.</span>')+'</div></div>';
 }else{
  if(!src.series[st.ex])st.ex=names.sort(function(a,b){return src.series[b].uses-src.series[a].uses})[0];
  var r=lineChart(st.ex,range,'ln'),sr=src.series[st.ex];
  if(!r){out+='<div class="card"><h3>'+esc(st.ex)+'</h3><p class="cap">Im gewählten Zeitraum keine Einträge. Wähle einen längeren Zeitraum.</p></div>'}
  else{
   var first=r.pts[0],lastp=r.last,mon=r.tr.b*4.345,sign=mon>=0?'+':'−',enough=r.pts.length>=3;
   out+='<div class="card"><h3>'+esc(st.ex)+'</h3><p class="cap">'+(sr.unit==='s'?'Längste Haltezeit':(sr.unit==='kg'?'Bestes Satzgewicht':'Meiste Wiederholungen'))+' pro Einheit</p><div class="kpis"><div><small>Start</small><b>'+fmt(first.v)+' '+sr.unit+'</b></div><div><small>Aktuell</small><b>'+fmt(lastp.v)+' '+sr.unit+'</b></div><div><small>Trend</small><b>'+(enough?sign+fmt(Math.abs(mon))+' '+sr.unit+'/Monat':'noch offen')+'</b></div></div>';
   if(st.table){
    out+='<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Datum</th><th>Wert</th><th>Bewertung</th></tr></thead><tbody>'+r.pts.slice(-8).reverse().map(function(p){return '<tr><td>'+dateOf(p.w)+'</td><td>'+fmt(p.v)+' '+sr.unit+'</td><td>'+(p.r==='m'?'Mehr':(p.r==='w'?'Weniger':'Passt'))+'</td></tr>'}).join('')+'</tbody></table></div>';
   }else{
    out+='<div class="chart" data-ch="ln">'+r.svg+'<div class="tip" hidden></div></div><div class="legend"><span><svg width="22" height="8" aria-hidden="true"><path d="M1 4h20" stroke="var(--ink)" stroke-width="2"/></svg>Verlauf</span><span><svg width="22" height="8" aria-hidden="true"><path d="M1 4h20" stroke="var(--ink-3)" stroke-width="1.5" stroke-dasharray="4 3"/></svg>Trend</span><span><i class="dot" style="--c:var(--c-push)"></i>Bestleistung</span></div>';
   }
   out+='<div class="row2" style="margin-top:10px"><button class="btn" style="flex:1;height:40px" data-act="tbl">'+ic('table',16)+(st.table?'Diagramm':'Tabelle')+'</button></div></div>';
  }
  out+='<div class="group">';
  names.sort(function(a,b){return src.series[b].uses-src.series[a].uses}).forEach(function(nm){var s=src.series[nm],pp=seriesSlice(nm,range);
   if(!pp.length){out+='<button class="xrow" data-act="selex" data-n="'+esc(nm)+'" aria-pressed="'+(nm===st.ex)+'"><span><b>'+esc(nm)+'</b><small>keine Einträge im Zeitraum</small></span><span></span><span class="rng"></span><span></span></button>';return}
   var tt=KT.trend(pp).b*4.345;
   out+='<button class="xrow" data-act="selex" data-n="'+esc(nm)+'" aria-pressed="'+(nm===st.ex)+'"><span><b>'+esc(nm)+'</b><small>'+pp.length+' Einheit'+(pp.length>1?'en':'')+'</small></span>'+spark(nm)+'<span class="rng">'+fmt(pp[0].v)+' → '+fmt(pp[pp.length-1].v)+' '+s.unit+'</span><span class="ic">'+ic(pp.length<3?'eq':(tt>0.4?'up':(tt<-0.4?'down':'eq')),18)+'</span></button>'});
  out+='</div>';
 }
 return out+'</div>';
}
function bindCharts(){
 document.querySelectorAll('.chart[data-ch]').forEach(function(el){
  var id=el.getAttribute('data-ch'),c=CH[id],tip=el.querySelector('.tip'),svg=el.querySelector('svg');if(!c||!tip||!svg)return;
  function move(e){
   var b=svg.getBoundingClientRect(),px=(e.clientX-b.left)/b.width*c.W,py;
   if(c.kind==='line'){
    var best=null,bd=1e9;c.pts.forEach(function(p){var d=Math.abs(c.xs(p.w)-px);if(d<bd){bd=d;best=p}});
    if(!best)return;var x=c.xs(best.w),xl=svg.querySelector('#'+id+'x');xl.setAttribute('x1',x);xl.setAttribute('x2',x);xl.setAttribute('opacity','1');
    tip.innerHTML='<b>'+dateOf(best.w)+'</b><br>'+fmt(best.v)+' '+c.unit+' · '+(best.r==='m'?'Mehr':(best.r==='w'?'Weniger':'Passt'));
    tip.style.left=(x/c.W*b.width)+'px';tip.style.top=(c.ys(best.v)/c.H*b.height)+'px';
   }else{
    var i=Math.floor((px-c.ml)/c.bw);if(i<0||i>=c.rows.length)return;var r=c.rows[i];
    tip.innerHTML='<b>KW '+kwOf(r.w)+'</b> · '+r.t+' Sätze<br>'+STATCATS.filter(function(k){return r[k]}).map(function(k){return SLOT[k].l+' '+r[k]}).join(' · ');
    tip.style.left=Math.max(80,Math.min(b.width-80,(c.ml+i*c.bw+c.bw/2)/c.W*b.width))+'px';tip.style.top='40px';
   }
   tip.hidden=false;
  }
  function leave(){tip.hidden=true;var xl=svg.querySelector('#'+id+'x');if(xl)xl.setAttribute('opacity','0')}
  svg.addEventListener('pointermove',move);svg.addEventListener('pointerdown',move);svg.addEventListener('pointerleave',leave);
 });
}

function libList(){
 var q=S.lib.q.toLowerCase(),items=LIB.filter(function(e){return (S.lib.cat==='alle'||e.cat===S.lib.cat)&&(e.name+' '+I18N.tr(e.name)).toLowerCase().indexOf(q)>-1});
 if(!items.length)return '<div class="group"><div class="lrow"><span class="txt"><b>Keine Treffer</b><small>Lege die Übung neu an, sie ist danach sofort im Generator.</small></span></div></div>';
 return '<div class="group">'+items.map(function(e){
  return '<button class="lrow" data-act="open" data-n="'+esc(e.name)+'"><span class="txt">'+slotTag(e.cat)+'<b>'+esc(e.name)+'</b><small>'+esc(e.sub?e.sub+' · '+eqLabel(e):eqLabel(e))+'</small></span><span class="m">'+[['image','image'],['video','video'],['link','link']].map(function(t){var c=mediaCount(e.name,t[0]);return c?'<span>'+ic(t[1],14)+c+'</span>':''}).join('')+'</span><span class="num mut" style="font-size:18px;min-width:26px;text-align:right">'+usesOf(e.name)+'×</span></button>'}).join('')+'</div>';
}
function sLib(){
 var cats=['alle'].concat(ORDER);
 return '<div class="pad"><h1 class="h1">Bibliothek</h1><p class="sub">'+LIB.length+' Übungen · wächst mit dir</p>'+
 '<label class="search">'+ic('search',18)+'<input id="libq" type="search" placeholder="Übung suchen" value="'+esc(S.lib.q)+'" aria-label="Übung suchen"></label>'+
 '<div class="fchips">'+cats.map(function(c){return '<button class="chip" data-act="libcat" data-c="'+c+'" aria-pressed="'+(S.lib.cat===c)+'">'+(c==='alle'?'Alle':'<i class="dot" style="--c:var('+SLOT[c].c+')"></i>'+SLOT[c].l)+'</button>'}).join('')+'</div>'+
 '<div id="liblist">'+libList()+'</div></div>'+
 '<div class="cta" style="justify-content:flex-end"><button class="btn primary" style="height:56px;border-radius:18px;padding:0 20px" data-act="go" data-s="wizard">'+ic('plus',20)+'Neue Übung</button></div>';
}
function sDetail(){
 var n=S.detail,e=LIB.filter(function(x){return x.name===n})[0]||{name:n,cat:'push',eq:'Langhantel',sub:''},sx=stepsOf(n),med=S.media[n]||[],out;
 out='<div class="top-bar"><button class="iconbtn" data-act="back" aria-label="Zurück">'+ic('back',22)+'</button><span class="cnt">Übung</span><span style="width:44px"></span></div><div class="pad">'+slotTag(e.cat)+'<h1 class="h1" style="font-size:36px">'+esc(e.name)+'</h1><p class="sub">'+esc(e.sub?e.sub+' · '+eqLabel(e):eqLabel(e))+' · '+usesOf(n)+' Einheit'+(usesOf(n)===1?'':'en')+'</p>'+
 '<div class="sec" style="margin-top:4px">Medien</div>';
 if(med.length)out+='<div class="media">'+med.map(mediaTile).join('')+'</div>';
 else out+='<p class="mut" style="margin:0 0 10px">Noch keine Medien. Füge Fotos, Videos oder Links hinzu, zum Beispiel eine Aufnahme deiner Technik.</p>';
 out+='<div class="row2" style="margin-bottom:6px"><button class="btn" style="flex:1" data-act="pickfile">'+ic('plus',18)+'Foto / Video</button><button class="btn" style="flex:1" data-act="sheet" data-s="link">'+ic('link',18)+'Link</button></div><input type="file" id="mediafile" accept="image/*,video/*" multiple hidden>'+
 '<p class="mut" style="margin:6px 0 0;font-size:12px">Fotos und Videos bleiben auf diesem Gerät. Lange Videos lieber als Link ablegen.</p>';
 if(sx&&sx.st&&sx.st.length)out+='<div class="sec">Ablauf</div><ol class="steps">'+sx.st.map(function(s){return '<li><span>'+esc(s)+'</span></li>'}).join('')+'</ol>'+(sx.cues?'<div class="sec">Technikhinweis</div><p style="margin:0;color:var(--ink-2)">'+esc(sx.cues)+'</p>':'');
 else out+='<div class="sec">Ablauf</div><p style="margin:0 0 10px;color:var(--ink-2)">Noch kein Ablauf hinterlegt. Schreibe die Schritte auf oder diktiere sie mit der Tastatur.</p>';
 out+='<button class="btn wide" style="margin-top:12px" data-act="sheet" data-s="steps">'+ic('plus',18)+(sx&&sx.st&&sx.st.length?'Ablauf bearbeiten':'Ablauf hinzufügen')+'</button>'+
  '<div class="row2" style="margin-top:10px"><button class="btn" style="flex:1" data-act="editex" data-n="'+esc(n)+'">'+ic('edit',18)+'Bearbeiten</button><button class="btn" style="flex:1" data-act="delcat" data-n="'+esc(n)+'">'+ic('trash',18)+'Aus Katalog löschen</button></div></div>';
 return out;
}
function wizSummary(){
 var w=S.wiz,c=w.cat,defs={mechanisch:'3–4 × 6–12 · 1–2 RIR · 1,5–3 min Pause','neuronal-schwer':'3–6 × unter 6 · 1–3 RIR · über 3 min Pause','neuronal-schnell':'3–6 × unter 6 · weit weg vom Versagen · über 3 min Pause'};
 var where={warm:'am Anfang jedes Krafttrainings (Cardio-Gerät nach Verfügbarkeit)',push:'Ganzkörper A und B, Oberkörper (2×)',pull:'Ganzkörper A und B, Oberkörper (2×)',squat:'Ganzkörper A und B, Unterkörper (2×)',hinge:'Ganzkörper A und B, Unterkörper (2×)',schnell:'allen Einheiten, jeweils am Anfang',rumpf:'allen Einheiten, jeweils am Ende (seitlich und gerade)',assist:'am Ende der Einheit (optional)',zusatz:'am Ende jedes Krafttrainings (Waden, Handstand-Vorbereitung)',haltung:'den Aufrichtungs-Einheiten A und B',huefte:'den Aufrichtungs-Einheiten A und B',mobil:'den Aufrichtungs-Einheiten A und B'}[c];
 var pat=SLOT[c].l+(w.sg&&SG[w.sg]?' · '+SG[w.sg]:'')+((c==='push'||c==='pull')?' · '+(w.dir==='horizontal'?'horizontal':'vertikal'):'');
 var aufr=AUFR_CATS.indexOf(c)>-1,rule=aufr?'2–3 × 8–15 oder 20–60 s · kontrolliert, ohne Muskelversagen · 20–45 s Pause':((c==='rumpf'||c==='assist'||c==='zusatz'||c==='warm')?'wie unten eingestellt':defs[w.focus]);
 return '<p><b>'+esc(w.name)+'</b> wird einsortiert als <b>'+pat+' · '+w.side+' · '+w.cx+'</b>.</p><p>Erscheint in: <b>'+where+'</b>.</p><p>Vorgabe: <b>'+w.sets+' × '+esc(w.meas==='time'?fmtSec(wizSecs()):(w.repsTxt||'8'))+(w.both&&w.meas==='time'?' je Seite':'')+(w.rest?' · '+fmtRest(w.rest)+' Pause':'')+'</b> (<span>'+rule+'</span>).</p><p>Reihenfolge: '+(w.cx==='komplex'?'vor isolierten Übungen':'nach den komplexen Übungen')+', '+(w.side==='unilateral'?'nach bilateralen.':'vor unilateralen.')+'</p>';
}
function wizSecs(){var n=parseInt(String(S.wiz.repsTxt||'').replace(/[^\d]/g,''),10);return isNaN(n)||n<=0?45:n}
function chipsFor(f,vals,labels){return '<div class="chips">'+vals.map(function(v,i){return '<button class="chip" data-act="wz" data-f="'+f+'" data-v="'+v+'" aria-pressed="'+(S.wiz[f]===v)+'">'+(labels?labels[i]:v)+'</button>'}).join('')+'</div>'}
function chipsNum(f,vals,fmtL){return '<div class="chips">'+vals.map(function(v){return '<button class="chip" data-act="wzn" data-f="'+f+'" data-v="'+v+'" aria-pressed="'+(S.wiz[f]===v)+'">'+fmtL(v)+'</button>'}).join('')+'</div>'}
function pendingList(){
 var p=S.wiz.pending||[];
 return p.length?'<div class="chips" style="margin-top:8px">'+p.map(function(m,i){return '<span class="chip">'+ic(m.type==='link'?'link':(m.type==='video'?'video':'image'),14)+esc(m.title||m.url||'Medium')+'<button data-act="wzdelp" data-i="'+i+'" aria-label="Entfernen" style="background:none;border:0;padding:0;margin-left:4px;line-height:0">'+ic('close',14)+'</button></span>'}).join('')+'</div>':'';
}
function sWizard(){
 var w=S.wiz,ctx=S.wizCtx||{mode:'lib'},time=w.meas==='time',ta='height:auto;padding:12px 14px;line-height:1.4;font-weight:500;font-size:15px';
 var edit=ctx.mode==='edit',ttl=edit?'Übung bearbeiten':(ctx.mode==='replace'?'Übung ersetzen':(ctx.mode==='add'?'Übung hinzufügen':'Neue Übung'));
 var devs=w.eqs.indexOf('Maschine')>-1?['Maschine',S.machines]:(w.eqs.indexOf('Cardio')>-1?['Cardio',S.cardios]:null);
 return '<div class="top-bar"><button class="iconbtn" data-act="back" aria-label="Abbrechen">'+ic('close',22)+'</button><span class="cnt">'+ttl+'</span><span style="width:44px"></span></div><div class="pad">'+
 '<h1 class="h1" style="font-size:36px">'+(edit?'Bearbeiten':'Einordnen')+'</h1><p class="sub">'+(edit?'Ändere Titel, Seiten und alle übrigen Eigenschaften. Der Verlauf bleibt erhalten.':'Die App schlägt die Position im Trainingsprinzip vor. Du bestätigst oder änderst. Ablauf, Fotos, Videos und Links kannst du gleich mit anlegen.')+'</p>'+
 '<div class="q"><small>Name</small><input class="inp" id="wizname" value="'+esc(w.name)+'" aria-label="Name der Übung"></div>'+
 '<div class="q"><small>Englischer Name</small><input class="inp" id="wizen" value="'+esc(w.en)+'" placeholder="English name" aria-label="Englischer Name" autocomplete="off"></div>'+
 (edit?'':'<div class="hint">'+ic('info',18)+'<span>'+S.wizHint+' Ändere die Antworten unten, falls es nicht passt.</span></div>')+
 '<div class="q"><small>Bewegungsmuster</small><div class="chips">'+ORDER.map(function(c){return '<button class="chip" data-act="wz" data-f="cat" data-v="'+c+'" aria-pressed="'+(w.cat===c)+'"><i class="dot" style="--c:var('+SLOT[c].c+')"></i>'+SLOT[c].l+'</button>'}).join('')+'</div></div>'+
 (SG_OF[w.cat]?'<div class="q"><small>Gruppe</small>'+chipsFor('sg',[''].concat(SG_OF[w.cat]),['Keine Angabe'].concat(SG_OF[w.cat].map(function(g){return SG[g]})))+'</div>':'')+
 ((w.cat==='push'||w.cat==='pull')?'<div class="q"><small>Richtung</small>'+chipsFor('dir',['horizontal','schräg-vertikal','vertikal'],['Horizontal','Schräg','Vertikal'])+'</div>':'')+
 '<div class="q"><small>Seiten</small>'+chipsFor('side',['bilateral','unilateral'],['Beidseitig','Einseitig'])+'</div>'+
 '<div class="q"><small>Komplexität</small>'+chipsFor('cx',['komplex','isoliert'],['Mehrgelenkig','Isoliert'])+'</div>'+
 '<div class="q"><small>Equipment (mehrere möglich)</small><div class="chips">'+EQ_ALL.map(function(q){return '<button class="chip" data-act="wzeq" data-v="'+q+'" aria-pressed="'+(w.eqs.indexOf(q)>-1)+'">'+q+'</button>'}).join('')+'</div>'+(w.eqs.length>1?'<p class="mut" style="margin:6px 0 0;font-size:12px">Im Training wählst du, mit welchem Gerät du die Übung gerade machst.</p>':'')+'</div>'+
 (devs?'<div class="q"><small>'+(devs[0]==='Maschine'?'Welche Maschine?':'Welches Cardio-Gerät?')+'</small>'+chipsFor('machine',[''].concat(devs[1]),['Keine Angabe'].concat(devs[1]))+'<p class="mut" style="margin:6px 0 0;font-size:12px">Die Übung erscheint nur an Orten, an denen das eingeschaltet ist. Neue Geräte legst du unter Mehr bei „Orte und Equipment“ an.</p></div>':'')+
 '<div class="q"><small>Messung</small>'+chipsFor('meas',['reps','time'],['Wiederholungen','Haltezeit'])+'</div>'+
 (w.cat==='warm'?'<div class="q"><small>Messgröße nach der Erwärmung</small>'+chipsFor('param',['','m','km','kcal','w','bpm'],['Keine'].concat(['m','km','kcal','w','bpm'].map(function(k){return PARAMS[k].l})))+'</div>':'')+
 (time?'<div class="q"><small>Durchführung</small><div class="chips"><button class="chip" data-act="wzboth" data-v="0" aria-pressed="'+!w.both+'">Eine Seite</button><button class="chip" data-act="wzboth" data-v="1" aria-pressed="'+!!w.both+'">Beide Seiten, je ein Durchgang</button></div></div>':'')+
 '<div class="q"><small>Sätze</small>'+chipsNum('sets',[1,2,3,4,5,6],function(v){return v})+'</div>'+
 '<div class="q"><small>'+(time?'Zielzeit in Sekunden':'Wiederholungen (z. B. 8 oder 8/Seite)')+'</small><input class="inp" id="wizreps" value="'+esc(w.repsTxt)+'" inputmode="'+(time?'numeric':'text')+'" aria-label="Vorgabe"></div>'+
 '<div class="q"><small>Pause</small>'+chipsNum('rest',[0,30,45,60,90,120,150,180],function(v){return v?fmtRest(v):'keine'})+'</div>'+
 (time?'':'<div class="q"><small>Schwerpunkt</small>'+chipsFor('focus',['mechanisch','neuronal-schwer','neuronal-schnell'],['Muskelaufbau','Schwer','Schnell'])+'</div>')+
 '<div class="q"><small>Ablauf (ein Schritt pro Zeile)</small><textarea data-nt="1" class="inp" id="wizsteps" rows="4" style="'+ta+'" aria-label="Ablauf">'+esc(w.steps)+'</textarea></div>'+
 '<div class="q"><small>Technikhinweis</small><textarea data-nt="1" class="inp" id="wizcues" rows="2" style="'+ta+'" aria-label="Technikhinweis">'+esc(w.cues)+'</textarea></div>'+
 '<div class="q"><small>Fotos, Videos und Links</small><div class="row2" style="margin-bottom:8px"><input class="inp" id="wizlink" type="url" inputmode="url" placeholder="https://… (YouTube, Instagram …)" value="'+esc(w.linkUrl)+'" aria-label="Link"><button class="btn" data-act="wzlink" aria-label="Link hinzufügen" style="width:52px;padding:0">'+ic('plus',20)+'</button></div>'+
  '<button class="btn wide" data-act="wzpick">'+ic('image',18)+'Foto / Video vom Gerät wählen</button><input type="file" id="wizfile" accept="image/*,video/*" multiple hidden>'+pendingList()+'</div>'+
 '<div class="summary" id="wizsum"><div class="eyebrow" style="margin-bottom:4px">Ergebnis</div>'+wizSummary()+'</div>'+
 (edit?'<div class="row2"><button class="btn" style="flex:1" data-act="delcat" data-n="'+esc(ctx.orig)+'">'+ic('trash',18)+'Aus Katalog löschen</button><button class="btn primary" style="flex:1.4" data-act="wizedit">Änderungen speichern</button></div></div>':'<div class="row2"><button class="btn" style="flex:1" data-act="wizsave">Speichern</button>'+(ctx.mode==='replace'?'<button class="btn primary" style="flex:1.6" data-act="wizadd">Übung ersetzen</button>':'<button class="btn primary" style="flex:1.6" data-act="wizadd">'+(ctx.mode==='add'?'Zum Training hinzufügen':'In heutigen Plan')+'</button>')+'</div></div>');
}
/* Geräte-Unterkategorien (Maschinen, Cardio) für den bearbeiteten Ort, dazu das Anlegen eigener Einträge */
function subBlock(ed,q){
 var c=SUBS[q],cardio=q==='Cardio',idn=cardio?'newcard':'newmach';
 return '<div class="subtg">'+S[c.list].map(function(m){
  var del=cardio?CARD_DEFAULT.indexOf(m)<0:!machineUsed(m);
  return '<div class="mrow"><button class="tg" data-act="tg" data-k="'+c.flag+'" data-v="'+esc(m)+'" aria-pressed="'+!!(ed[c.flag]&&ed[c.flag][m])+'"><span>'+esc(m)+'</span><i class="sw"></i></button>'+(del?'<button class="iconbtn" data-act="delmach" data-q="'+q+'" data-v="'+esc(m)+'" aria-label="'+esc(m)+' löschen">'+ic('trash',18)+'</button>':'')+'</div>'}).join('')+
  '<div class="mnew"><input class="inp" id="'+idn+'" placeholder="'+(cardio?'Neues Cardio-Gerät, z. B. Laufband':'Neue Maschine, z. B. Rudermaschine')+'" autocomplete="off" aria-label="Name"><button class="btn" data-act="addmach" data-q="'+q+'" aria-label="Hinzufügen">'+ic('plus',18)+'</button></div></div>';
}
function sLocs(){
 var ed=locById(S.editLoc)||curLoc(),isCur=ed.id===S.loc;
 return '<div class="sec" style="margin-top:0">Orte und Equipment</div>'+
 '<div class="fchips" style="margin-bottom:10px">'+S.locs.map(function(l){return '<button class="chip" data-act="editloc" data-v="'+l.id+'" aria-pressed="'+(l.id===ed.id)+'">'+(l.id===S.loc?ic('pin',14):'')+esc(l.name)+'</button>'}).join('')+'<button class="chip ex" data-act="newloc">'+ic('plus',14)+'Neuer Ort</button></div>'+
 '<div class="q" style="margin-bottom:10px"><small>Name des Orts</small><input class="inp" id="locname" value="'+esc(ed.name)+'" aria-label="Name des Orts"></div>'+
 '<div class="group">'+EQ_ALL.map(function(e){return '<button class="tg" data-act="tg" data-k="eq" data-v="'+e+'" aria-pressed="'+!!ed.eq[e]+'"><span>'+e+(SUBS[e]&&ed.eq[e]?'<small>'+subOn(ed,e).length+' von '+S[SUBS[e].list].length+' '+SUBS[e].what+' vorhanden</small>':'')+'</span><i class="sw"></i></button>'+(SUBS[e]&&ed.eq[e]?subBlock(ed,e):'')}).join('')+'</div>'+
 '<div class="row2" style="margin-top:10px">'+(isCur?'<span class="hint" style="flex:1;margin:0">'+ic('pin',18)+'<span>Aktueller Ort. Wird beim nächsten Öffnen wieder vorausgewählt.</span></span>':'<button class="btn" style="flex:1.4" data-act="useloc" data-v="'+ed.id+'">'+ic('pin',18)+'Hier trainieren</button>')+(S.locs.length>1?'<button class="btn" style="flex:1" data-act="delloc" data-v="'+ed.id+'">'+ic('trash',18)+'Löschen</button>':'')+'</div>';
}
/* Trainingsarten verwalten: die eingebauten Arten ansehen, eigene anlegen, umbenennen und löschen */
function sTypes(){
 var ids=Object.keys(TYPES),ed=ids.indexOf(S.editType)>-1?S.editType:S.type,t=TYPES[ed],ct=customType(ed);
 var out='<div class="sec" id="sec-types">Trainingsarten</div>'+
 '<div class="fchips" style="margin-bottom:10px">'+ids.map(function(k){return '<button class="chip" data-act="edittype" data-v="'+esc(k)+'" aria-pressed="'+(k===ed)+'">'+(k===S.type?ic('pin',14):'')+esc(TYPES[k].name)+'</button>'}).join('')+'<button class="chip ex" data-act="newtype">'+ic('plus',14)+'Neue Trainingsart</button></div>';
 if(ct){
  out+='<div class="q" style="margin-bottom:10px"><small>Name der Trainingsart</small><input class="inp" id="typename" value="'+esc(ct.name)+'" aria-label="Name der Trainingsart"></div>'+
  '<div class="q"><small>Bewegungsmuster in der Einheit</small><div class="chips">'+ORDER.map(function(c){return '<button class="chip" data-act="tgcat" data-c="'+c+'" aria-pressed="'+(ct.cats.indexOf(c)>-1)+'"><i class="dot" style="--c:var('+SLOT[c].c+')"></i>'+SLOT[c].l+'</button>'}).join('')+'</div></div>'+
  '<p class="mut" style="margin:0 0 10px;font-size:13px">Jedes gewählte Muster ergibt eine Übung im Tagesplan, aus deiner Bibliothek ausgewählt nach Ort und Equipment. Änderungen gelten ab dem nächsten Plan, über „Einheit wechseln“ stellst du den heutigen neu zusammen.</p>';
 }else{
  var tp=Object.keys(TPL).filter(function(k){return TPL[k].type===ed});
  out+='<div class="card" style="margin-bottom:10px"><h3>'+esc(t.name)+'</h3><p class="cap" style="margin:0">'+esc(t.sub)+'. Eingebaute Art, Einheiten: '+tp.map(function(k){return esc(TPL[k].name)}).join(', ')+'.</p></div>';
 }
 out+='<div class="row2">'+(ed===S.type?'<span class="hint" style="flex:1;margin:0">'+ic('pin',18)+'<span>Aktuelle Trainingsart.</span></span>':'<button class="btn" style="flex:1.4" data-act="usetype" data-v="'+esc(ed)+'">'+ic('pin',18)+'Diese verwenden</button>')+(ct?'<button class="btn" style="flex:1" data-act="deltype" data-v="'+esc(ed)+'">'+ic('trash',18)+'Löschen</button>':'')+'</div>';
 return out;
}
function sMore(){
 return '<div class="pad"><h1 class="h1">Einstellungen</h1><p class="sub">Gilt für den Generator und den Plan.</p>'+
 sLocs()+sTypes()+
 '<div class="sec">Heute meiden</div><div class="chips" style="margin-bottom:6px">'+Object.keys(S.set.avoid).map(function(k){return '<button class="chip" data-act="tg" data-k="avoid" data-v="'+k+'" aria-pressed="'+!!S.set.avoid[k]+'">'+k+'</button>'}).join('')+'</div><p class="mut" style="margin:6px 0 0;font-size:13px">Der Generator schließt belastende Übungen aus, bis du die Markierung löschst.</p>'+
 '<div class="sec">Training</div><div class="field" style="margin-bottom:0"><small>Einheiten pro Woche</small><div class="seg">'+[2,3].map(function(n){return '<button data-act="perweek" data-v="'+n+'" aria-pressed="'+(S.set.perWeek===n)+'">'+n+' pro Woche</button>'}).join('')+'</div></div>'+
 '<div class="group" style="margin-top:10px"><button class="tg" data-act="tg" data-k="voice" data-v="x" aria-pressed="'+!!S.set.voice+'"><span>Spracheingabe<small>Befehle für den Tagesplan, nutzt die Spracherkennung des Browsers</small></span><i class="sw"></i></button></div>'+
 (S.removed.length?'<div class="sec">Gelöschte Übungen</div><div class="group">'+S.removed.map(function(n){return '<div class="logrow"><span><b>'+esc(n)+'</b></span><button class="btn" style="height:38px" data-act="restoreex" data-n="'+esc(n)+'">Wiederherstellen</button></div>'}).join('')+'</div>':'')+
 '<div class="sec">Daten</div><p class="mut" style="margin:0 0 8px;font-size:13px">'+S.hist.length+' Sätze gespeichert, nur auf diesem Gerät. Exportiere regelmäßig als Sicherung.</p><p class="mut" style="margin:14px 0 0;font-size:12px">Version '+esc(self.KT_VERSION||'?')+(self.KT_BUILD?' · Stand '+esc(self.KT_BUILD.split('-').reverse().join('.')):'')+'</p><div class="row2"><button class="btn" style="flex:1" data-act="export" data-f="json">JSON</button><button class="btn" style="flex:1" data-act="export" data-f="csv">CSV</button><button class="btn" style="flex:1" data-act="import">Import</button></div><input type="file" id="importfile" accept=".json,application/json" hidden>'+
 '<p class="mut" style="margin:10px 0 0;font-size:12px">Fotos und Videos aus der Bibliothek bleiben auf diesem Gerät und sind nicht im Export enthalten. Links und Abläufe sind enthalten.</p></div>';
}
/* ---------- Startbildschirm ---------- */
function parseDay(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function relDay(s){var n=Math.round((TODAY-parseDay(s))/864e5);return n<=0?'heute':(n===1?'gestern':'vor '+n+' Tagen')}
function lastSession(){
 if(!S.hist.length)return null;
 var l=S.hist[S.hist.length-1],sets=S.hist.filter(function(h){return h.date===l.date&&typOf(h)===typOf(l)}),ex={},order=[],ton=0,cnt={m:0,p:0,w:0};
 sets.forEach(function(h){
  var e=ex[h.name];if(!e){e=ex[h.name]={name:h.name,cat:h.cat,n:0,kg:0,reps:0,sec:0};order.push(h.name)}
  e.n++;
  if(h.sec){if(h.sec>e.sec)e.sec=h.sec}else if(h.kg>e.kg||(h.kg===e.kg&&h.reps>e.reps)){e.kg=h.kg;e.reps=h.reps}
  ton+=(h.kg||0)*(h.reps||0);if(cnt[h.r]!=null)cnt[h.r]++;
 });
 return {date:l.date,typ:typOf(l),tpl:l.tpl,loc:l.loc,sets:sets.length,list:order.map(function(n){return ex[n]}),ton:ton,cnt:cnt};
}
function exBest(e){return e.sec?e.sec+' s':(e.kg?fmt(e.kg)+' kg × '+e.reps:(e.reps?e.reps+' Wdh.':'–'))}
/* Orte (die drei zuletzt genutzten vorn, weitere hinter „Weitere Orte“) und Trainingsart: Startbildschirm und Einrichtung teilen sich das */
function locSection(title){
 var locs=recentLocs(),vis=locs.slice(0,3),more=locs.slice(3),locRow=function(l){var on=l.id===S.loc;
  return '<button class="lrow" data-act="startloc" data-v="'+l.id+'" aria-pressed="'+on+'"><span class="radio">'+(on?ic('check',14):'')+'</span><span class="txt"><b>'+esc(l.name)+'</b><small>'+eqList(l).length+' Geräte</small></span></button>'};
 return '<div class="sec" style="margin-top:6px">'+title+'</div><div class="group">'+vis.map(locRow).join('')+'</div>'+
 (more.length?'<button class="donebtn" style="margin-top:8px" data-act="moreloc" aria-expanded="'+S.moreLocs+'"><span class="txt"><b>Weitere Orte ('+more.length+')</b><small>'+(S.moreLocs?'Tippen zum Einklappen':'Tippen zum Auswählen')+'</small></span>'+ic(S.moreLocs?'chevd':'next',16)+'</button>'+(S.moreLocs?'<div class="group">'+more.map(locRow).join('')+'</div>':''):'')+
 '<button class="btn ghost" style="margin-top:8px;height:40px" data-act="manageloc">'+ic('more',16)+'Orte und Equipment verwalten</button>';
}
function typeSection(){
 return '<div class="sec">Welche Trainingsart?</div><div class="tsel">'+Object.keys(TYPES).map(function(t){var on=S.type===t;
  return '<button class="tcard" data-act="settype" data-v="'+t+'" aria-pressed="'+on+'"><span class="ti">'+ic(TYPES[t].icon,22)+'</span><b>'+esc(TYPES[t].name)+'</b><small>'+esc(TYPES[t].sub)+'</small></button>'}).join('')+'</div>'+
 '<button class="btn ghost" style="margin-top:8px;height:40px" data-act="managetype">'+ic('more',16)+'Trainingsarten verwalten</button>';
}
/* Heutiges Training einrichten: eine Seite mit Ein/Aus-Schaltern, alles lässt sich danach im Plan ändern */
function sSetup(){
 var kraft=S.type==='kraft',o=S.setup,l=curLoc(),anySets=S.plan.some(function(p){return setsDone(p)>0});
 var devs=l.eq&&l.eq.Cardio?S.cardios.filter(function(m){return l.card&&l.card[m]}):[];
 var tgRow=function(k,t,sub){return '<button class="tg" data-act="setopt" data-k="'+k+'" aria-pressed="'+!!o[k]+'"><span>'+t+'<small>'+sub+'</small></span><i class="sw"></i></button>'};
 var out='<div class="top-bar"><button class="iconbtn" data-act="tab" data-t="start" aria-label="Zurück">'+ic('back',22)+'</button><span class="cnt">Nächstes Training</span><span style="width:44px"></span></div><div class="pad"><h1 class="h1" style="font-size:36px">Nächstes Training einrichten</h1><p class="sub">Wähle Ort, Trainingsart und die Bestandteile. Alles lässt sich danach im Plan noch ändern.</p>';
 out+=locSection('Wo trainierst du?')+typeSection();
 if(kraft){
  var tpls=Object.keys(TPL).filter(function(k){return TPL[k].type==='kraft'}),cur=S.setupTpl&&TPL[S.setupTpl]?S.setupTpl:nextTpl();
  out+='<div class="sec">Welche Einheit?</div><div class="chips">'+tpls.map(function(k){return '<button class="chip" data-act="settplsel" data-v="'+k+'" aria-pressed="'+(k===cur)+'">'+esc(TPL[k].name)+'</button>'}).join('')+'</div>'+
  '<div class="sec">Bestandteile</div><div class="group">'+
  tgRow('cardio','Cardio-Gerät zur Erwärmung',devs.length?esc(devs.join(', ')):'Kein Cardio-Gerät am Ort eingeschaltet')+
  '<div class="tg fixed"><span>Allgemeine Erwärmung<small>immer dabei</small></span><span class="okbadge">'+ic('check',14)+'Immer</span></div>'+
  tgRow('as','Achillessehnen-Prävention','Wadenheben exzentrisch, einbeinig')+
  tgRow('hand','Handstand-Vorbereitung','Schulter, Handgelenke, Körperspannung')+
  tgRow('schulter','Schulterstabilität','Schulterblattkontrolle')+
  tgRow('aufr','Aufrichtung','Eine Übung für Haltung, Hüfte oder Mobilisation')+'</div>';
 }
 if(anySets)out+='<div class="hint" style="margin-top:12px">'+ic('info',18)+'<span>Heute sind schon Sätze geloggt. Der Plan wird neu zusammengestellt, die geloggten Sätze bleiben im Verlauf.</span></div>';
 return out+'</div><div class="cta"><button class="btn primary big" data-act="makeplan">'+ic('check',18)+'Plan erstellen</button></div>';
}
function sStart(){
 var ls=lastSession(),out='<div class="pad"><div class="eyebrow">'+new Date().toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'})+'</div><h1 class="h1">Start</h1>';
 if(ls){
  var nm=(TPL[ls.tpl]&&TPL[ls.tpl].name)||typeName(ls.typ),dt=parseDay(ls.date).toLocaleDateString(LOC(),{weekday:'short',day:'numeric',month:'short'});
  out+='<div class="card last tap" role="button" tabindex="0" data-act="startplan" aria-label="Plan der letzten Einheit öffnen"><div class="eyebrow" style="display:flex;justify-content:space-between;align-items:center">Letzte Einheit<span class="mut" style="display:flex;align-items:center;gap:2px;text-transform:none;letter-spacing:0;font-weight:600">Plan-Vorschau'+ic('next',14)+'</span></div><h3 style="margin-top:4px">'+esc(nm)+'</h3><p class="cap">'+relDay(ls.date)+' · '+esc(dt)+(ls.loc?' · '+esc(ls.loc):'')+'</p>'+
  '<div class="kpis"><div><small>Übungen</small><b>'+ls.list.length+'</b></div><div><small>Sätze</small><b>'+ls.sets+'</b></div>'+(ls.ton>0?'<div><small>Volumen</small><b>'+fmt(ls.ton,0)+' kg</b></div>':'')+'</div>'+
  '</div>';
 }else{
  out+='<div class="card"><div class="eyebrow">Letzte Einheit</div><h3 style="margin-top:4px">Noch keine Einheit</h3><p class="cap" style="margin:0">Starte dein erstes Training. Danach siehst du hier eine kurze Zusammenfassung.</p></div>';
 }
 if(isLive()){
  /* Training läuft schon: ein Tipp führt zurück in den Plan */
  out+='<div class="card hero"><div class="eyebrow">Training läuft</div><h3 style="margin-top:4px">'+esc(TPL[S.tpl].name)+'</h3><p class="cap">'+esc(curLoc().name)+' · seit '+new Date(S.live.start).toTimeString().slice(0,5)+'</p>'+
  '<button class="btn primary big wide" data-act="startplan">'+ic('play',18)+'Training fortsetzen</button></div></div>';
  return out;
 }
 var nt=TPL[S.setupTpl&&TPL[S.setupTpl]?S.setupTpl:nextTpl()];
 out+='<div class="card hero"><div class="eyebrow">Nächstes Training</div><h3 style="margin-top:4px">'+esc(nt?nt.name:typeName(S.type))+'</h3><p class="cap">'+esc(curLoc().name)+' · '+esc(typeName(S.type))+'</p>'+
 '<button class="btn primary big wide" data-act="setup">'+ic('play',18)+'Nächstes Training einrichten</button></div></div>';
 return out;
}
var SCREENS={start:sStart,heute:sHeute,train:sTrain,stats:sStats,lib:sLib,detail:sDetail,wizard:sWizard,more:sMore,summary:sSummary,setup:sSetup};

function tabbar(){
 var cur={start:'start',heute:'heute',train:'heute',stats:'stats',lib:'lib',detail:'lib',wizard:'lib',more:'more',summary:'start',setup:'start'}[S.screen];
 return [['start','home','Start'],['heute','today','Heute'],['lib','book','Bibliothek'],['stats','chart','Auswertung'],['more','more','Mehr']].map(function(t){return '<button class="tab" data-act="tab" data-t="'+t[0]+'" aria-current="'+(cur===t[0])+'"><i>'+ic(t[1],22)+'</i>'+t[2]+'</button>'}).join('');
}

/* ---------- Overlay ---------- */
var vtimer=null,REC=null;
/* ----- Plan-Aktionen (Tippen und Sprache nutzen dieselben Funktionen) ----- */
function exFromLib(name){var le=LIB.filter(function(x){return x.name===name})[0];if(!le)return null;return fromPool(le.cat,le.name)||P(le.name,le.eq,3,le.mode==='time'?'45 s':'8',90,le.sub,le.mode,le.machine,{sg:le.sg,both:le.both,eqs:le.eqs,param:le.param})}
/* Neuer Plan-Eintrag aus einer Übung: immer frisch aufbauen, damit keine Eigenschaften der vorherigen Übung (beidseitig, Geräte) hängen bleiben */
function planItem(pe,cat,grp){return Object.assign({},pe,{cat:cat,locked:false,grp:grp||'',na:false,was:null})}
function replaceAt(i,name,cat){var old=S.plan[i],pe=exFromLib(name);S.plan[i]=planItem(pe,cat||old.cat,old.grp);relabel()}
function diceAt(i){var p=S.plan[i],names=S.plan.map(function(x){return x.name}),c=POOL[p.cat].filter(function(x){return okEx(x,p.cat)&&names.indexOf(x.name)<0&&(!p.sg||x.sg===p.sg)});
 if(!c.length){toast('Keine weitere Übung mit dem Equipment am Ort verfügbar');return false}
 var n=c[Math.floor(Math.random()*c.length)];S.plan[i]=planItem(n,p.cat,p.grp);toast(p.name+' durch '+n.name+' ersetzt',true);return true}
function insertPos(cat){var at=S.plan.length,q;for(q=0;q<S.plan.length;q++){if(ORDER.indexOf(S.plan[q].cat)>ORDER.indexOf(cat)){at=q;break}}return at}
function addEx(name){var le=LIB.filter(function(x){return x.name===name})[0],pe=exFromLib(name);
 S.plan.splice(insertPos(le.cat),0,planItem(pe,le.cat,''));relabel()}
function rerollAll(){var items=generatePlan(S.tpl);S.plan.forEach(function(p,i){if(p.locked&&items[i]&&items[i].cat===p.cat)items[i]=p});S.plan=items;relabel();toast('Plan neu gewürfelt',true)}
function wizHintText(c){return (c.known?'Vorschlag: <b>'+c.label+'</b>, '+esc(c.why)+'.':esc(c.why))+(c.similar?' Ähnlich zu <b>'+esc(c.similar.name)+'</b>.':'')}
function guessMachine(name,eq){var l=eq==='Maschine'?S.machines:(eq==='Cardio'?S.cardios:null);if(!l)return '';var n=String(name).toLowerCase();return l.filter(function(m){return n.indexOf(m.toLowerCase())>-1})[0]||''}
/* Vorgaben je Muster: Erwärmung 1 × 5 min, Rumpf und Zusatz-Gruppen wie in der Bibliothek */
function wizDefaults(w){
 if(w.cat==='warm'){w.meas='time';w.repsTxt='300';w.sets=1;w.rest=0;w.both=false}
 else{if(w.meas==='time'&&w.repsTxt==='300')w.repsTxt='45';if(w.cat==='rumpf'){w.sets=2;w.rest=45}else if(w.sets===1&&w.rest===0){w.sets=3;w.rest=90}}
}
function applyClass(name){var c=KT.classify(name,LIB),w=S.wiz;
 Object.assign(w,{name:name,eq:c.eq,eqs:[c.eq],machine:guessMachine(name,c.eq),cat:c.cat,sg:c.sg||'',dir:c.dir||'horizontal',side:c.side,cx:c.cx,meas:c.meas,focus:c.focus});
 if(c.meas==='time'&&(w.repsTxt==='8'||!w.repsTxt))w.repsTxt='45';if(c.meas==='reps'&&w.repsTxt&&/^\d+$/.test(w.repsTxt)&&+w.repsTxt>=30)w.repsTxt='8';
 wizDefaults(w);if(w.enAuto)w.en=suggestEn(name);S.wizHint=wizHintText(c)}
function openWizard(name){S.wizCtx={mode:'lib'};applyClass(name||'');go('wizard',{keep:true})}

/* ----- Spracheingabe: Browser-Erkennung (de-DE) mit Textfeld als Ausweichlösung ----- */
function stopRec(){try{if(REC){REC.onend=null;REC.onresult=null;REC.onerror=null;REC.abort()}}catch(e){}REC=null}
function openVoice(){
 stopTimers();stopRec();S.sheet={type:'voice',phase:'listen',text:'',typed:'',res:null,rec:false,err:''};
 var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!S.set.voice)S.sheet.err='Die Spracherkennung ist in den Einstellungen ausgeschaltet. Du kannst den Befehl tippen.';
 else if(!SR)S.sheet.err='Dein Browser bietet keine Spracherkennung. Tippe den Befehl oder nutze das Mikrofon deiner Tastatur.';
 else{
  try{
   REC=new SR();REC.lang='de-DE';REC.interimResults=true;REC.maxAlternatives=1;REC.continuous=false;
   REC.onstart=function(){if(S.sheet&&S.sheet.type==='voice'){S.sheet.rec=true;render()}};
   REC.onresult=function(ev){var tx='',fin=false,i;for(i=ev.resultIndex;i<ev.results.length;i++){tx+=ev.results[i][0].transcript;if(ev.results[i].isFinal)fin=true}
    if(S.sheet&&S.sheet.type==='voice'){S.sheet.text=tx;var t=$('#vtext');if(t)t.textContent=tx}if(fin)handleVoiceText(tx)};
   REC.onerror=function(ev){if(!S.sheet||S.sheet.type!=='voice')return;S.sheet.rec=false;
    S.sheet.err=(ev.error==='not-allowed'||ev.error==='service-not-allowed')?'Mikrofon nicht erlaubt. Erlaube den Zugriff in den Browser-Einstellungen oder tippe den Befehl.':(ev.error==='no-speech'?'Ich habe nichts gehört. Tippe auf „Sprechen“ und versuche es noch einmal.':'Spracherkennung nicht möglich ('+ev.error+'). Tippe den Befehl.');render()};
   REC.onend=function(){if(S.sheet&&S.sheet.type==='voice'&&S.sheet.phase==='listen'){S.sheet.rec=false;if(!S.sheet.text&&!S.sheet.err)S.sheet.err='Ich habe nichts gehört. Tippe auf „Sprechen“ und versuche es noch einmal.';render()}};
   REC.start();
  }catch(e){S.sheet.err='Spracherkennung konnte nicht gestartet werden. Tippe den Befehl.'}
 }
 render();
}
function handleVoiceText(tx){
 stopRec();
 S.sheet={type:'voice',phase:'result',text:tx,typed:'',res:KT.parseVoice(tx,{plan:S.plan,lib:LIB}),rec:false,err:''};render();
}
function voiceCard(res){
 var k=res.kind,row=function(ico,txt){return '<div class="line">'+ic(ico,18)+txt+'</div>'};
 if(k==='replace')return row('swap','Ersetzen')+'<div class="line"><span class="mut" style="font-weight:500">'+esc(res.from.name)+'</span>'+ic('next',14)+esc(res.to.name)+'</div>'+slotTag(res.to.cat)+(S.plan[res.from.idx]&&S.plan[res.from.idx].cat!==res.to.cat?'<div class="warn">'+ic('alert',13)+'Anderes Bewegungsmuster als bisher</div>':'');
 if(k==='remove')return row('trash','Streichen')+'<div class="line">'+esc(res.name)+'</div>';
 if(k==='add')return row('plus','Hinzufügen')+'<div class="line">'+esc(res.to.name)+'</div>'+slotTag(res.to.cat);
 if(k==='reroll')return row('dice','Neu würfeln')+'<div class="line">'+esc(res.name)+'</div>';
 if(k==='rerollall')return row('dice','Alles neu würfeln')+'<div class="line mut" style="font-weight:500">Gesperrte Übungen bleiben erhalten.</div>';
 return row('plus','Neue Übung anlegen')+'<div class="line">'+esc(res.name||'ohne Namen')+'</div>';
}
function voiceSheet(sh){
 var out='',res=sh.res;
 if(sh.phase==='result'&&res){
  if(res.ok)return '<h3>Verstanden</h3><p class="quote" style="font-size:22px;min-height:0">„'+esc(sh.text)+'“</p><div class="parsed">'+voiceCard(res)+'</div><div class="row2"><button class="btn" style="flex:1" data-act="vretry">Neu sprechen</button><button class="btn primary" style="flex:1.4" data-act="voiceok">'+ic('check',18)+'Bestätigen</button></div>';
  return '<h3>Nicht verstanden</h3><p class="quote" style="font-size:22px;min-height:0">„'+esc(sh.text)+'“</p><p>'+esc(res.msg)+'</p>'+(res.suggestNew?'<button class="btn primary wide" style="margin-bottom:8px" data-act="vnew" data-n="'+esc(res.suggestNew)+'">'+ic('plus',18)+'„'+esc(res.suggestNew)+'“ neu anlegen</button>':'')+'<button class="btn wide" data-act="vretry">'+ic('mic',18)+'Nochmal versuchen</button>';
 }
 out+='<h3>'+(sh.rec?'Ich höre zu':'Sprachbefehl')+'</h3><p>Sag zum Beispiel <span data-nt="1">„Tausche Latzug gegen Klimmzug“, „Streiche Face Pull“ oder „Füge Hip Thrust hinzu“</span>. <span>Sprachbefehle verstehen nur Deutsch.</span></p>';
 if(sh.rec)out+='<div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
 out+='<p class="quote" id="vtext">'+esc(sh.text||'')+'</p>';
 if(sh.err)out+='<div class="hint" style="margin-bottom:10px">'+ic('info',18)+'<span>'+esc(sh.err)+'</span></div>';
 out+='<div class="row2" style="margin-bottom:8px"><input class="inp" id="vinput" placeholder="Oder Befehl tippen" value="'+esc(sh.typed||'')+'" aria-label="Sprachbefehl als Text" autocomplete="off"><button class="btn primary" data-act="vsend" aria-label="Befehl ausführen" style="width:52px;padding:0">'+ic('check',20)+'</button></div>'+
 '<div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Abbrechen</button>'+(sh.rec?'':'<button class="btn" style="flex:1" data-act="vretry">'+ic('mic',18)+'Sprechen</button>')+'</div>';
 return out;
}
function execVoice(res){
 var k=res.kind;
 if(k==='newex'){S.sheet=null;openWizard(res.name);return}
 snap();
 if(k==='replace'){var nm=S.plan[res.from.idx].name;replaceAt(res.from.idx,res.to.name,res.to.cat);toast(nm+' durch '+res.to.name+' ersetzt',true)}
 else if(k==='remove'){var gone=S.plan.splice(res.idx,1)[0];relabel();toast(gone.name+' gestrichen',true)}
 else if(k==='add'){addEx(res.to.name);toast(res.to.name+' zum Plan hinzugefügt',true)}
 else if(k==='reroll'){diceAt(res.idx)}
 else if(k==='rerollall'){rerollAll()}
 saveLocs();S.sheet=null;render();
}

/* ----- Medien und Ablauf je Übung ----- */
function stepsOf(n){return S.stepsX[n]||STEPS[n]||null}
function mediaTile(m,i){
 var ttl='<small>'+esc(m.title||'')+'</small>';
 if(m.type==='link'){var y=KT.media.ytId(m.url);
  return '<button class="mt" data-act="openmedia" data-i="'+i+'" aria-label="Link '+esc(m.title||'')+'">'+(y?'<img class="mimg" src="https://i.ytimg.com/vi/'+y+'/hqdefault.jpg" alt="">':ic('link',24))+'<span class="mbadge">'+ic(y?'play':'link',12)+(y?'YouTube':esc(KT.media.host(m.url)))+'</span>'+ttl+'</button>'}
 return '<button class="mt" data-act="openmedia" data-i="'+i+'" aria-label="'+(m.type==='video'?'Video ':'Foto ')+esc(m.title||'')+'"><span class="mimg" data-mid="'+m.id+'" data-mtype="'+m.type+'"></span><span class="mbadge">'+ic(m.type==='video'?'video':'image',12)+(m.type==='video'?'Video':'Foto')+'</span>'+ttl+'</button>';
}
function hydrateMedia(){
 document.querySelectorAll('[data-mid][data-mtype]').forEach(function(el){
  var id=el.getAttribute('data-mid'),t=el.getAttribute('data-mtype');
  KT.media.url(id).then(function(u){if(!u||!el.isConnected)return;if(t==='image')el.style.backgroundImage='url("'+u+'")';else el.innerHTML='<video muted playsinline preload="metadata" src="'+u+'#t=0.2"></video>'}).catch(function(){});
 });
 var mv=$('#mview');if(mv)KT.media.url(mv.getAttribute('data-mid')).then(function(u){if(u&&mv.isConnected)mv.src=u}).catch(function(){});
}
function sheetExtra(sh){
 var n=S.detail,out='';
 if(sh.type==='tpl'){return '<h3>Einheit wechseln</h3><p>Der Plan wird neu zusammengestellt.</p><div class="group">'+Object.keys(TPL).filter(function(k){return TPL[k].type===S.type}).map(function(k){return '<button class="lrow" data-act="settpl" data-v="'+k+'" aria-pressed="'+(k===S.tpl)+'"><span class="radio">'+(k===S.tpl?ic('check',14):'')+'</span><span class="txt"><b>'+TPL[k].name+'</b><small>'+TPL[k].slots.map(slotLabel).join(' · ')+'</small></span></button>'}).join('')+'</div>'}
 if(sh.type==='link'){return '<h3>Link hinzufügen</h3><p>YouTube, Instagram, Vimeo oder jede andere Adresse. Der Link öffnet im Browser.</p><div class="q"><small>Adresse</small><input class="inp" id="linkurl" type="url" inputmode="url" placeholder="https://…" autocomplete="off"></div><div class="q"><small>Titel (optional)</small><input class="inp" id="linktitle" placeholder="z. B. Technik von der Seite" autocomplete="off"></div><div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Abbrechen</button><button class="btn primary" style="flex:1.4" data-act="addlink">'+ic('plus',18)+'Hinzufügen</button></div>'}
 if(sh.type==='steps'){var sx=stepsOf(n)||{st:[],cues:''},ta='height:auto;padding:12px 14px;line-height:1.4;font-weight:500;font-size:15px';
  return '<h3>Ablauf bearbeiten</h3><p>'+esc(n)+'. Ein Schritt pro Zeile.</p><div class="q"><small>Ablauf</small><textarea data-nt="1" class="inp" id="stepstext" rows="6" style="'+ta+'">'+esc(sx.st.join('\n'))+'</textarea></div><div class="q"><small>Technikhinweis</small><textarea data-nt="1" class="inp" id="cuestext" rows="3" style="'+ta+'">'+esc(sx.cues||'')+'</textarea></div><div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Abbrechen</button><button class="btn primary" style="flex:1.4" data-act="savesteps">Speichern</button></div>'}
 var m=(S.media[n]||[])[sh.i];if(!m)return '<h3>Medium</h3><p>Nicht gefunden.</p>';
 out='<h3>'+esc(m.title||'Medium')+'</h3>';
 if(m.type==='image')out+='<img id="mview" data-mid="'+m.id+'" alt="'+esc(m.title||'Foto')+'" style="width:100%;border-radius:14px;margin:6px 0 12px;display:block">';
 else if(m.type==='video')out+='<video id="mview" data-mid="'+m.id+'" controls playsinline style="width:100%;border-radius:14px;margin:6px 0 12px;display:block;background:#000"></video>';
 else{var y=KT.media.ytId(m.url);out+='<p style="word-break:break-all">'+esc(m.url)+'</p>'+(y?'<img src="https://i.ytimg.com/vi/'+y+'/hqdefault.jpg" alt="" style="width:100%;border-radius:14px;margin:0 0 12px;display:block">':'')+'<a class="btn primary wide" style="text-decoration:none;margin-bottom:8px" href="'+esc(m.url)+'" target="_blank" rel="noopener noreferrer">'+ic('link',18)+'Öffnen</a>'}
 return out+'<div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Schließen</button><button class="btn" style="flex:1" data-act="delmedia" data-i="'+sh.i+'">'+ic('trash',18)+(sh.confirm?'Wirklich löschen?':'Löschen')+'</button></div>';
}
/* Übungen hinzufügen oder ersetzen: Suche, Neu-Anlegen direkt daneben, die Bibliothek nach Oberkategorien eingeklappt */
function exListHtml(sh){
 var replace=sh.type==='pick',cur=replace?S.plan[sh.i]:null,names=S.plan.map(function(x){return x.name}).filter(function(n){return !cur||n!==cur.name}),q=(sh.q||'').toLowerCase().trim(),out='',any=false;
 ORDER.forEach(function(c){
  var items=LIB.filter(function(e){return e.cat===c&&names.indexOf(e.name)<0&&eqOk(e)&&(!q||(e.name+' '+I18N.tr(e.name)).toLowerCase().indexOf(q)>-1||(e.sub||'').toLowerCase().indexOf(q)>-1||(e.sg&&SG[e.sg].toLowerCase().indexOf(q)>-1))});
  if(!items.length)return;any=true;
  var open=q?true:(sh.open?!!sh.open[c]:(replace&&cur.cat===c));
  out+='<div class="xgrp"><button class="xhead" data-act="exgrp" data-c="'+c+'" aria-expanded="'+open+'"><i class="dot" style="--c:var('+SLOT[c].c+')"></i><b>'+SLOT[c].l+'</b><span class="mut">'+items.length+'</span>'+ic(open?'chevd':'next',16)+'</button>'+
   (open?'<div class="group" style="margin-bottom:8px">'+items.map(function(e){return '<div class="xrow2"><button class="lrow" data-act="'+(replace?'pickdo':'adddo')+'" data-i="'+(replace?sh.i:'')+'" data-n="'+esc(e.name)+'"><span class="txt"><b>'+esc(e.name)+'</b><small>'+esc((e.sg?SG[e.sg]+' · ':'')+(e.sub&&!(e.sg&&e.sub.indexOf(SG[e.sg])===0)?e.sub+' · ':'')+eqLabel(e))+'</small></span>'+ic('plus',18)+'</button><button class="iconbtn sm" data-act="editex" data-n="'+esc(e.name)+'" aria-label="'+esc(e.name)+' bearbeiten">'+ic('edit',18)+'</button><button class="iconbtn sm" data-act="delcat" data-n="'+esc(e.name)+'" aria-label="'+esc(e.name)+' aus dem Katalog löschen">'+ic('trash',18)+'</button></div>'}).join('')+'</div>':'')+'</div>';
 });
 if(!any)out='<div class="hint">'+ic('info',18)+'<span>'+(q?'Keine Treffer für „'+esc(sh.q)+'“. Lege die Übung mit „Neu“ selbst an.':'Keine passende Übung am Ort gefunden.')+'</span></div>';
 return out;
}
function exSheet(sh){
 var replace=sh.type==='pick',cur=replace?S.plan[sh.i]:null;
 return '<h3>'+(replace?'Ersetzen':'Übung hinzufügen')+'</h3><p>'+(replace?esc(cur.name)+' durch eine Übung aus der Bibliothek ersetzen.':'Sie wird passend zur Reihenfolge einsortiert.')+' Nur Übungen, die zum Equipment am Ort passen.</p>'+
 '<div class="row2" style="margin-bottom:10px"><label class="search" style="flex:1;margin:0">'+ic('search',18)+'<input id="exq" type="search" placeholder="Übung suchen" value="'+esc(sh.q||'')+'" aria-label="Übung suchen" autocomplete="off"></label><button class="btn primary" data-act="newex" data-m="'+(replace?'replace':'add')+'" data-i="'+(replace?sh.i:'')+'" aria-label="Neue Übung anlegen" style="padding:0 14px;height:46px">'+ic('plus',18)+'Neu</button></div><div id="exlist">'+exListHtml(sh)+'</div>';
}
/* Menü der laufenden Übung: ersetzen, würfeln, verschieben, streichen, hinzufügen, Training abschließen */
function exMenu(){
 var i=S.tr?S.tr.i:0,ex=S.plan[i];if(!ex)return '<h3>Übung</h3><p>Keine Übung gewählt.</p>';
 var row=function(ico,txt,act,extra,dis){return '<button class="lrow" data-act="'+act+'" '+(extra||'')+(dis?' disabled':'')+'><span class="txt"><b>'+ic(ico,18)+' &nbsp;'+txt+'</b></span></button>'};
 return '<h3>'+esc(ex.name)+'</h3><p>Dein Training läuft weiter, der Timer auch.</p><div class="group">'+
  row('swap','Ersetzen','pick','data-i="'+i+'"')+row('dice','Würfeln','dice','data-i="'+i+'"')+
  row('up','Nach oben','mv','data-i="'+i+'" data-d="-1"',moveTarget(i,-1)<0)+row('down','Nach unten','mv','data-i="'+i+'" data-d="1"',moveTarget(i,1)<0)+
  row('plus','Übung hinzufügen','sheet','data-s="add"')+row('edit','Bearbeiten','editex','data-n="'+esc(ex.name)+'" data-i="'+i+'"')+row('trash','Übung streichen','del','data-i="'+i+'"')+row('check','Training abschließen','finish','')+'</div>';
}
function sSummary(){
 var done=[],open=[],sets=0,ton=0;
 S.plan.forEach(function(p){var n=setsDone(p);sets+=n;todaySets(p).forEach(function(h){ton+=(h.kg||0)*(h.reps||0)});if(isDone(p))done.push(p);else open.push(p)});
 var row=function(p){return '<div class="logrow"><span><b>'+esc(p.name)+'</b></span><span class="mut">'+esc(progP(p).replace(' · alles erledigt',''))+'</span></div>'};
 return '<div class="pad"><div class="eyebrow">Training abgeschlossen</div><h1 class="h1">Gut gemacht</h1><p class="sub">'+esc(TPL[S.tpl].name)+(S.sumDur?' · '+S.sumDur+' min':'')+'</p>'+
  '<div class="card"><div class="kpis"><div><small>Übungen</small><b>'+done.length+' von '+S.plan.length+'</b></div><div><small>Sätze</small><b>'+sets+'</b></div>'+(ton>0?'<div><small>Volumen</small><b>'+fmt(ton,0)+' kg</b></div>':'')+'</div></div>'+
  (done.length?'<div class="sec">Erledigt</div><div class="group">'+done.map(row).join('')+'</div>':'')+
  (open.length?'<div class="sec">Übersprungen oder offen</div><div class="group">'+open.map(row).join('')+'</div><p class="mut" style="margin:8px 0 0;font-size:12px">Sie bleiben im heutigen Plan. Ein weiteres Training am selben Tag setzt dort fort.</p>':'')+
  '<button class="btn primary wide" style="margin-top:14px" data-act="tab" data-t="start">Zum Start</button><button class="btn wide" style="margin-top:8px" data-act="tab" data-t="heute">Zurück zum Plan</button></div>';
}
function overlay(){
 var out='';
 if(S.sheet){
  var sh=S.sheet;out+='<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>';
  if(sh.type==='voice'){out+=voiceSheet(sh)
  }else if(sh.type==='link'||sh.type==='steps'||sh.type==='media'||sh.type==='tpl'){out+=sheetExtra(sh)
  }else if(sh.type==='loc'){
   out+='<h3>Wo trainierst du?</h3><p>Die Übungen richten sich nach dem Equipment vor Ort. Deine Wahl bleibt als Standard gespeichert.</p><div class="group">'+S.locs.map(function(l){var on=l.id===S.loc,ls=eqList(l);
    return '<button class="lrow" data-act="pickloc" data-v="'+l.id+'" aria-pressed="'+on+'"><span class="radio">'+(on?ic('check',14):'')+'</span><span class="txt"><b>'+esc(l.name)+'</b><small>'+ls.length+' Geräte · '+esc(eqNames(l).join(', '))+'</small></span>'+(on?'<span class="badge">Zuletzt</span>':'')+'</button>'}).join('')+'</div>'+
   '<button class="btn wide" style="margin-top:10px" data-act="manageloc">'+ic('more',18)+'Orte und Equipment verwalten</button>';
  }else if(sh.type==='pick'||sh.type==='add'){out+=exSheet(sh)
  }else if(sh.type==='exmenu'){out+=exMenu()}
  out+='</div></div>';
 }
 if(S.toast){out+='<div class="toast" role="status"><span>'+esc(S.toast.m)+'</span>'+(S.toast.undo?'<button data-act="undo">Rückgängig</button>':'')+'</div>'}
 return out;
}
var ttimer=null;
function toast(m,undo){S.toast={m:m,undo:!!undo};clearTimeout(ttimer);ttimer=setTimeout(function(){S.toast=null;render()},4200)}
function snap(){S.undo=JSON.stringify({plan:S.plan,loc:S.loc})}

/* ---------- Render & Navigation ---------- */
var scrollKey='';
function render(){
 var f=$('#frame'),sc=$('#screen');
 sc.innerHTML=SCREENS[S.screen]();
 var tb=$('#tabbar');tb.innerHTML=tabbar();tb.hidden=(S.screen==='train'||S.screen==='wizard'||S.screen==='detail'&&S.prev==='train');
 $('#overlay').innerHTML=overlay();
 renderVbar();I18N.trDom($('#frame'));bindCharts();hydrateMedia();
 saveLocs();ensureGuard();
 var jk=jumpKey();document.querySelectorAll('#jump button').forEach(function(b){b.setAttribute('aria-current',String(b.getAttribute('data-j')===jk))});
 if(scrollKey!==S.screen){sc.scrollTop=0;scrollKey=S.screen}
 if(S.scrollTo){var st=document.getElementById(S.scrollTo);S.scrollTo='';if(st)st.scrollIntoView()}
}
function jumpKey(){
 if(S.sheet&&S.sheet.type==='voice')return 'voice';
 if(S.sheet&&S.sheet.type==='loc')return 'ort';
 if(S.screen==='train')return (S.tr&&S.tr.over)?'time':'train';
 return S.screen;
}
function stopTimers(){clearInterval(S.tmr);S.tmr=null;clearInterval(vtimer);vtimer=null}
function go(s,o){
 stopTimers();o=o||{};
 if(s!==S.screen)S.prev=S.screen;
 stopRec();S.sheet=null;S.exp=-1;S.screen=s;
 if(s==='detail'&&o.n)S.detail=o.n;
 if(s==='wizard'&&!o.keep){S.wiz=newWiz();S.wizCtx={mode:'lib'};S.wizHint='Gib einen Namen ein, dann schlage ich die Einordnung vor.'}
 if(s==='train'){
  S.tr={i:o.i||0,set:o.set||1,phase:'input',log:o.log||[],over:o.over||null,kg:0,reps:8,rir:1,sec:0,running:false,held:[],secLog:0,eq:'',el:0,pv:'',peek:-1,ra:''};
  resetInputs();
 }
 render();
}
/* Zurück von Übungsdetail und Assistent (Pfeil oben links und Android-Zurück-Taste) */
function backStep(){
 if(S.prev==='train'&&S.tr&&S.screen==='detail'){S.screen='train';S.prev='heute';render()}
 else go(S.prev&&S.prev!=='detail'&&S.prev!=='wizard'?S.prev:'lib');
}
/* Android-Zurück-Taste: erst Fenster schließen, dann eine Ebene zurück, vom Start aus mit zweitem Druck beenden */
function appBack(){
 if(S.sheet){stopTimers();stopRec();S.sheet=null;render();return true}
 var sc=S.screen;
 if(sc==='detail'||sc==='wizard'){backStep();return true}
 if(sc==='train'||sc==='summary'){go('heute');return true}
 if(sc!=='start'){go('start');return true}
 return false;
}
/* Chrome überspringt Verlaufseinträge, die ohne Antippen der Seite angelegt wurden. Darum entsteht der Schutzeintrag erst nach dem ersten Tippen. */
var exitArmed=false,userActive=false;
function ensureGuard(){try{if(userActive&&!exitArmed&&!(history.state&&history.state.kt===1))history.pushState({kt:1},'')}catch(e){}}
/* Übung öffnen: heute schon geloggte Sätze zählen mit, es geht beim nächsten offenen Satz weiter */
function enterTrain(i){
 var ex=S.plan[i],log=todaySets(ex).map(function(h){return {kg:h.kg,reps:h.reps,sec:h.sec,rir:h.rir,r:h.r,d:h.d,pv:h.pv==null?null:h.pv,pu:h.pu||''}}),n=log.length;
 startLive();
 go('train',{i:i,set:Math.min(n+1,ex.sets),log:log});
 if(!n)return;
 var t=S.tr,last=log[n-1],rf=getRef(ex.name,t.eq),time=ex.mode==='time',step=time?secStep(ex.name):rf.step,d=typeof last.d==='number'?last.d:(last.r==='m'?step:(last.r==='w'?-step:0));
 if(ex.cat==='warm'){}
 else if(time)t.sec=Math.max(secStep(ex.name),last.sec+d);else{t.kg=Math.max(0,last.kg+d);t.reps=last.reps||t.reps;t.rir=last.rir==null?t.rir:last.rir}
 if(n>=ex.sets||ex.fin)t.phase='done';
 render();
}
/* Zeit-Übung: Countdown von der Zielzeit auf 0; je Seite ein Durchgang */
/* Signaltöne für den Countdown (Web Audio, wird beim Tippen auf Start freigeschaltet) */
var AC=null;
function audioCtx(){try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!AC)AC=new C();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function beep(ms,hz){var c=audioCtx();if(!c)return;try{var o=c.createOscillator(),g=c.createGain(),t0=c.currentTime;o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(0.5,t0+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t0+ms/1000);o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+ms/1000+0.05)}catch(e){}}
function cdFinish(held,ended){
 var t=S.tr;clearInterval(S.tmr);S.tmr=null;t.running=false;t.held.push(Math.max(1,held));
 if(ended)beep(900,660);
 try{if(navigator.vibrate)navigator.vibrate(ended?[300,100,300]:[150,80,150])}catch(e){}
 render();
}
function cdStart(){
 var t=S.tr;if(t.running)return;t.running=true;t.start=Date.now();t.end=t.start+t.sec*1000;audioCtx();t.lb=-1;
 clearInterval(S.tmr);S.tmr=setInterval(function(){
  var left=Math.ceil((t.end-Date.now())/1000),el=$('#secv');
  /* kurzer Piep bei 10 s und je einer bei 3, 2, 1; langer Ton beim Ablauf */
  if(left!==t.lb){t.lb=left;if(left<t.sec&&(left===10||left===3||left===2||left===1))beep(130,880)}
  if(left<=0){cdFinish(t.sec,true);return}
  if(el)el.textContent=mmss(left);
 },250);
 render();
}
/* Erwärmung: Timer läuft hoch, Stopp, danach die Messgröße (z. B. Meter) eintragen */
function wuStart(){
 var t=S.tr;if(t.running)return;t.running=true;t.start=Date.now()-t.el*1000;
 clearInterval(S.tmr);S.tmr=setInterval(function(){t.el=Math.floor((Date.now()-t.start)/1000);var e=$('#secv');if(e)e.textContent=mmss(t.el)},250);
 render();
}
function wuStop(){
 var t=S.tr;if(!t.running)return;t.el=Math.floor((Date.now()-t.start)/1000);t.running=false;clearInterval(S.tmr);S.tmr=null;
 try{if(navigator.vibrate)navigator.vibrate(150)}catch(e){}
 render();
}
function paramOf(e){if(e.param)return e.param;var le=LIB.filter(function(x){return x.name===e.name})[0];return le&&le.param||''}
function lastWarm(name){for(var i=S.hist.length-1;i>=0;i--){var h=S.hist[i];if(h.name===name&&h.sec>0)return h}return null}
function warmAvg(){var n=0,s=0;S.hist.forEach(function(h){if(h.cat==='warm'&&h.sec>0){n++;s+=h.sec}});return {n:n,avg:n?Math.round(s/n):0}}
function warmVal(h){return h&&h.pv!=null&&h.pu?fmt(h.pv)+' '+h.pu:''}
/* Auswahl beim Bewerten: wie viel mehr oder weniger für den nächsten Satz, in den gewohnten Einheiten */
function amountChoices(ex,eqSel){
 if(ex.mode==='time')return [5,10,15,30];
 return (eqSel==='Kurzhantel'||eqSel==='Kettlebell')?[0.5,1,2,4]:[1,2.5,5,10];
}
function applyRating(r,amt){
 var t=S.tr,ex=curEx(),eqSel=t.eq||ex.eq,time=ex.mode==='time',warm=ex.cat==='warm',secVal=time?(warm?t.el:(t.secLog||t.sec)):0,dd=(r==='m'?1:(r==='w'?-1:0))*(amt||0);
 var pv=null,pk=warm?paramOf(ex):'';if(pk&&String(t.pv).trim()!==''){pv=parseFloat(String(t.pv).replace(',','.'));if(!isFinite(pv))pv=null}
 t.log.push({kg:t.kg,reps:t.reps,sec:secVal,rir:t.rir,r:r,d:dd,pv:pv,pu:pv!==null?PARAMS[pk].u:''});
 var now=new Date(),ds=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
 var h={typ:S.type,tpl:S.tpl,date:ds,time:now.toTimeString().slice(0,5),loc:curLoc().name,name:ex.name,cat:ex.cat,eq:eqSel,set:t.set,kg:time?0:t.kg,reps:time?0:t.reps,sec:secVal,rir:time?null:t.rir,r:r,d:dd};
 if(pv!==null){h.pv=pv;h.pu=PARAMS[pk].u}
 S.hist.push(h);
 S.eqPick[ex.name]=eqSel;markSet();
 var n=t.log.length,done=n>=ex.sets;
 /* Satz fertig: zurück in die Übersicht, der Timer „seit dem letzten Satz“ läuft dort weiter */
 if(done)toast(ex.name+' abgeschlossen');
 go('heute');
}

document.addEventListener('click',function(e){
 var j=e.target.closest('[data-j]');
 if(j){var k=j.getAttribute('data-j');
  if(k==='voice'){go('heute');openVoice()}
  else if(k==='ort'){go('heute');S.sheet={type:'loc'};render()}
  else if(k==='train')go('train',{i:3,set:2,log:[{kg:62.5,reps:8,sec:0,rir:1,r:'m'}]});
  else if(k==='time')go('train',{over:{cat:'rumpf',name:'Seitstütz statisch',eq:'Körpergewicht',sets:3,reps:'45 s',rest:30,mode:'time',sub:'Seitneige · stabilisieren'},set:2,log:[{kg:0,reps:0,sec:42,rir:0,r:'m'}]});
  else if(k==='detail')go('detail',{n:'Bankdrücken'});
  else go(k);
  return;
 }
 var a=e.target.closest('[data-act]');if(!a)return;
 var act=a.getAttribute('data-act'),d=a.dataset;
 if(act==='scrim'){if(e.target===a&&S.sheet){stopTimers();stopRec();S.sheet=null;render()}return}
 switch(act){
  case 'tab':go(d.t);break;
  case 'lang':I18N.setLang(isEn()?'de':'en');render();break;
  case 'go':go(d.s,{n:d.n});break;
  case 'back':backStep();break;
  case 'exp':S.exp=S.exp===+d.i?-1:+d.i;render();break;
  case 'dice':{snap();var inT=S.screen==='train'&&!S.tr.over,okD=diceAt(+d.i);S.sheet=null;if(inT&&okD)enterTrain(+d.i);else render();break}
  case 'pick':S.sheet={type:'pick',i:+d.i,q:'',open:null};render();break;
  case 'pickdo':{var pi=+d.i,pp=S.plan[pi],le5=LIB.filter(function(x){return x.name===d.n})[0],pe5=exFromLib(d.n);snap();S.plan[pi]=planItem(pe5,le5.cat,pp.grp);relabel();S.sheet=null;toast(pp.name+' durch '+le5.name+' ersetzt',true);if(S.screen==='train'&&!S.tr.over)enterTrain(pi);else render();break}
  case 'lock':S.plan[+d.i].locked=!S.plan[+d.i].locked;render();break;
  case 'del':{snap();var gone=S.plan.splice(+d.i,1)[0];S.exp=-1;S.sheet=null;relabel();toast(gone.name+' gestrichen',true);if(S.screen==='train')go('heute');else render();break}
  case 'sheet':S.sheet={type:d.s,q:'',open:null};render();break;
  case 'sheetclose':stopTimers();stopRec();S.sheet=null;render();break;
  case 'exgrp':{if(!S.sheet)break;var og=S.sheet.open;if(!og){og={};var cur0=S.sheet.type==='pick'?S.plan[S.sheet.i]:null;if(cur0)og[cur0.cat]=true}og[d.c]=!og[d.c];S.sheet.open=og;render();break}
  case 'adddo':{var le=LIB.filter(function(x){return x.name===d.n})[0],pe=exFromLib(d.n),curN=S.screen==='train'&&!S.tr.over?S.plan[S.tr.i]:null;snap();
   S.plan.splice(insertPos(le.cat),0,planItem(pe,le.cat,''));relabel();if(curN)S.tr.i=S.plan.indexOf(curN);S.sheet=null;toast(le.name+' zum Plan hinzugefügt',true);render();break}
  case 'enter':enterTrain(+d.i);break;
  case 'mv':{var nj=movePlan(+d.i,+d.d);S.exp=nj;S.sheet=null;if(S.screen==='train'&&!S.tr.over)S.tr.i=nj;render();break}
  case 'finish':{S.sumDur=isLive()?Math.max(1,Math.round((Date.now()-S.live.start)/60000)):0;S.live=null;endRest();stopTimers();saveLocs();go('summary');break}
  case 'cdstart':cdStart();break;
  case 'cdstop':{var tc=S.tr;if(tc.running)cdFinish(Math.round((Date.now()-tc.start)/1000));break}
  case 'seteq':{var te=S.tr,ex4=curEx();te.eq=d.v;S.eqPick[ex4.name]=d.v;var rf4=getRef(ex4.name,d.v);if(rf4.start)te.kg=rf4.sug;saveLocs();render();break}
  case 'editex':{var we2=wizFromEx(d.n);if(!we2){toast('Übung nicht gefunden');render();break}S.wiz=we2.w;S.wizCtx={mode:'edit',orig:d.n,i:d.i===undefined||d.i===''?-1:+d.i,origSub:we2.origSub,origSide:we2.origSide,origCx:we2.origCx};S.wizHint='';go('wizard',{keep:true});break}
  case 'wizedit':{var wr3=wizCommit();if(!wr3)break;var wc=S.wizCtx;S.wizCtx={mode:'lib'};if(S.detail===wc.orig)S.detail=wr3.name;toast(wr3.name+' gespeichert');var back=S.prev&&S.prev!=='wizard'?S.prev:'lib';go(back);break}
  case 'delcat':{if(S.confirmDel!==d.n){S.confirmDel=d.n;toast('Nochmal tippen: '+d.n+' wird aus dem Katalog gelöscht (wiederherstellbar unter Mehr).');render();break}S.confirmDel='';var dn=d.n;delEx(dn);S.wizCtx={mode:'lib'};S.sheet=null;toast(dn+' aus dem Katalog gelöscht');if(S.screen==='wizard'||S.screen==='detail')go('lib');else if(S.screen==='train')go('heute');else render();break}
  case 'restoreex':{restoreEx(d.n);toast(d.n+' wiederhergestellt');render();break}
  case 'newex':{var nm0=d.m==='replace'?S.plan[+d.i]:null;S.wiz=newWiz();S.wizCtx={mode:d.m,i:d.i===''?-1:+d.i};if(nm0){S.wiz.cat=nm0.cat;S.wiz.sg=nm0.sg||''}S.wizHint='Gib einen Namen ein, dann schlage ich die Einordnung vor.';go('wizard',{keep:true});break}
  case 'voice':openVoice();break;
  case 'voiceok':{if(S.sheet&&S.sheet.res&&S.sheet.res.ok)execVoice(S.sheet.res);break}
  case 'vsend':{var vi=$('#vinput'),vv=vi?vi.value.trim():'';if(vv)handleVoiceText(vv);break}
  case 'vretry':openVoice();break;
  case 'vnew':S.sheet=null;openWizard(d.n);break;
  case 'rerollall':snap();rerollAll();render();break;
  case 'settpl':S.tpl=d.v;snap();S.plan=generatePlan(S.tpl);relabel();S.planDate=todayStr();S.sheet=null;toast(TPL[S.tpl].name+' zusammengestellt',true);render();break;
  case 'demo':S.demo=d.v==='1';render();break;
  case 'pickfile':{var mf=$('#mediafile');if(mf)mf.click();break}
  case 'addlink':doAddLink();break;
  case 'savesteps':{var lines=($('#stepstext').value||'').split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean);S.stepsX[S.detail]={st:lines,cues:($('#cuestext').value||'').trim()};S.sheet=null;saveLocs();toast('Ablauf gespeichert');render();break}
  case 'openmedia':S.sheet={type:'media',i:+d.i,confirm:false};render();break;
  case 'delmedia':{if(!S.sheet||S.sheet.type!=='media')break;if(!S.sheet.confirm){S.sheet.confirm=true;render();break}
   var mlist=S.media[S.detail]||[],mm=mlist[S.sheet.i];if(mm){if(mm.type!=='link')KT.media.remove(mm.id).catch(function(){});mlist.splice(S.sheet.i,1)}S.sheet=null;saveLocs();toast('Medium gelöscht');render();break}
  case 'undo':if(S.undo){var u=JSON.parse(S.undo);S.plan=u.plan;if(u.loc!==S.loc&&locById(u.loc)){S.loc=u.loc;saveLocs()}S.undo=null}S.toast=null;render();break;
  case 'toast':toast(d.m);render();break;
  case 'start':{var fo=openIdx();if(fo.length)enterTrain(fo[0]);else{toast('Alle Übungen sind schon erledigt');render()}break}
  case 'reopen':enterTrain(+d.i);break;
  case 'toggledone':S.showDone=!S.showDone;render();break;
  case 'adj':{var t=S.tr;if(d.f==='kg')t.kg=Math.max(0,Math.round((t.kg+(+d.d))*10)/10);else if(d.f==='reps')t.reps=Math.max(1,t.reps+(+d.d));else if(d.f==='sec'){if(t.running)break;t.sec=Math.max(secStep(curEx().name),t.sec+(+d.d))}render();break}
  case 'rir':S.tr.rir=+d.v;render();break;
  case 'done':{var td=S.tr;if(curEx().cat==='warm'){if(td.running)wuStop();applyRating('p',0);break}stopTimers();td.running=false;if(curEx().mode==='time')td.secLog=td.held.length?Math.min.apply(null,td.held):td.sec;td.phase='rate';render();break}
  case 'rate':{if(d.r==='p')applyRating('p',0);else{S.tr.ra=d.r;S.tr.phase='amount';render()}break}
  case 'rateamt':applyRating(S.tr.ra,+d.v);break;
  case 'rateback':S.tr.phase='rate';render();break;
  /* Satz hinzufügen: in der Eingabe einen Satz mehr als geplant, nach dem Abschluss mit einem Satz weitermachen */
  case 'addset':{var ta=S.tr,xa=curEx(),na=ta.log.length;
   xa.sets=ta.phase==='done'?Math.max(xa.sets,na+1):xa.sets+1;xa.fin=false;
   toast('Satz hinzugefügt · '+xa.sets+' Sätze');
   if(ta.phase==='done'){if(ta.over){ta.phase='input';ta.set=na+1;resetInputs();render()}else enterTrain(ta.i)}else render();
   break}
  /* Übung vorzeitig abschließen: gilt als erledigt, auch wenn nicht alle geplanten Sätze gemacht sind */
  case 'finex':{var tf=S.tr,xf=curEx();if(!tf.log.length)break;xf.fin=true;saveLocs();toast(xf.name+' abgeschlossen');go('heute');break}
  case 'peek':{var tp=S.tr;tp.peek=tp.peek===+d.k?-1:+d.k;render();break}
  case 'wustart':wuStart();break;
  case 'wustop':wuStop();break;
  case 'wuadj':{var tw=S.tr;if(tw.running)break;tw.el=Math.max(0,tw.el+(+d.d));render();break}
  case 'exnav':{var ni=(S.tr.over?S.plan.length-1:S.tr.i)+(+d.d);if(ni<0||ni>=S.plan.length)break;enterTrain(ni);break}
  case 'nextex':{var nx2=S.tr.over?-1:nextOpenIdx(S.tr.i);if(nx2<0){go('start');toast('Einheit abgeschlossen. Gut gemacht.');render()}else enterTrain(nx2);break}
  case 'range':S.stats.range=+d.r;render();break;
  case 'sub':S.stats.sub=d.v;render();break;
  case 'selex':S.stats.ex=d.n;render();break;
  case 'tbl':S.stats.table=!S.stats.table;render();break;
  case 'libcat':S.lib.cat=d.c;render();break;
  case 'open':go('detail',{n:d.n});break;
  case 'wz':{var wq0=S.wiz;wq0[d.f]=d.v;if(d.f==='cat'){if((SG_OF[d.v]||[]).indexOf(wq0.sg)<0)wq0.sg='';wizDefaults(wq0)}if(d.f==='meas')wq0.repsTxt=d.v==='time'?'45':'8';render();break}
  case 'wzn':S.wiz[d.f]=+d.v;render();break;
  case 'wzeq':{var wq=S.wiz,ix=wq.eqs.indexOf(d.v);if(ix>-1){if(wq.eqs.length>1)wq.eqs.splice(ix,1)}else wq.eqs.push(d.v);wq.eq=wq.eqs[0];if(wq.eqs.indexOf('Maschine')<0&&wq.eqs.indexOf('Cardio')<0)wq.machine='';render();break}
  case 'wzboth':S.wiz.both=d.v==='1';render();break;
  case 'wzlink':{var wu=KT.media.cleanUrl(S.wiz.linkUrl);if(!wu){toast('Bitte eine gültige Adresse eingeben, zum Beispiel https://youtu.be/…');render();break}S.wiz.pending.push({id:KT.media.uid(),type:'link',url:wu,title:KT.media.ytId(wu)?'YouTube':KT.media.host(wu),added:Date.now()});S.wiz.linkUrl='';render();break}
  case 'wzpick':{var wf=$('#wizfile');if(wf)wf.click();break}
  case 'wzdelp':{var wm=S.wiz.pending.splice(+d.i,1)[0];if(wm&&wm.type!=='link')KT.media.remove(wm.id).catch(function(){});render();break}
  case 'wizsave':{var wr=wizCommit();if(!wr)break;S.sheet=null;go('lib');toast(wr.name+' gespeichert. Taucht ab jetzt im Generator auf.');render();break}
  case 'wizadd':{var wr2=wizCommit();if(!wr2)break;var wctx=S.wizCtx||{mode:'lib'};snap();
   if(wctx.mode==='replace'&&S.plan[wctx.i]){S.plan[wctx.i]=planItem(wr2.pe,wr2.cat,S.plan[wctx.i].grp)}else S.plan.splice(insertPos(wr2.cat),0,planItem(wr2.pe,wr2.cat,''));
   relabel();S.wizCtx={mode:'lib'};go('heute');toast(wr2.name+(wctx.mode==='replace'?' ersetzt die Übung':' zum heutigen Plan hinzugefügt'),true);render();break}
  case 'export':{var blob,fn,stamp=new Date().toISOString().slice(0,10);
   if(d.f==='json'){blob=new Blob([JSON.stringify({v:2,locs:S.locs,loc:S.loc,locRecent:S.locRecent,machines:S.machines,cardios:S.cardios,removed:S.removed,types:S.types,plan:S.plan,set:S.set,hist:S.hist,custom:S.custom,media:S.media,stepsX:S.stepsX},null,2)],{type:'application/json'});fn='krafttraining-'+stamp+'.json'}
   else{var q=function(v){v=v==null?'':String(v);return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
    var rows=[['Datum','Uhrzeit','Ort','Übung','Muster','Satz','kg','Wdh','Sekunden','RIR','Bewertung','Art']].concat(S.hist.map(function(h){return [h.date,h.time,h.loc,h.name,SLOT[h.cat]?SLOT[h.cat].l:h.cat,h.set,h.kg?String(h.kg).replace('.',','):'',h.reps||'',h.sec||'',h.rir==null?'':h.rir,h.r==='m'?'Mehr':(h.r==='w'?'Weniger':'Passt'),typeName(typOf(h))]}));
    blob=new Blob(['\ufeff'+rows.map(function(r){return r.map(q).join(';')}).join('\r\n')],{type:'text/csv'});fn='krafttraining-'+stamp+'.csv'}
   var a2=document.createElement('a');a2.href=URL.createObjectURL(blob);a2.download=fn;document.body.appendChild(a2);a2.click();setTimeout(function(){URL.revokeObjectURL(a2.href);a2.remove()},500);toast(fn+' gespeichert');render();break}
  case 'import':{var fi=$('#importfile');if(fi)fi.click();break}
  case 'pickloc':S.sheet=null;if(d.v!==S.loc)setLoc(d.v);render();break;
  case 'startloc':if(d.v!==S.loc)setLoc(d.v);S.moreLocs=false;render();break;
  case 'moreloc':S.moreLocs=!S.moreLocs;render();break;
  case 'settype':S.setupTpl='';setType(d.v);render();break;
  case 'setup':go('setup');break;
  case 'setopt':S.setup[d.k]=!S.setup[d.k];saveLocs();render();break;
  case 'settplsel':S.setupTpl=d.v;render();break;
  case 'makeplan':{if(S.type==='kraft'&&S.setupTpl&&TPL[S.setupTpl])S.tpl=S.setupTpl;else S.tpl=nextTpl();S.plan=generatePlan(S.tpl);S.planDate=todayStr();relabel();adaptPlan();S.setupTpl='';S.exp=-1;saveLocs();toast('Plan erstellt: '+TPL[S.tpl].name);go('heute');break}
  case 'startplan':go('heute');break;
  case 'manageloc':S.editLoc=S.loc;go('more');break;
  case 'managetype':S.editType=S.type;S.scrollTo='sec-types';go('more');break;
  case 'edittype':S.editType=d.v;render();break;
  case 'usetype':setType(d.v);render();break;
  case 'newtype':{var tid='typ'+Date.now(),nt={id:tid,name:'Neue Trainingsart',cats:['squat','push','pull']};S.types.push(nt);registerType(nt);S.editType=tid;saveLocs();render();var tn=$('#typename');if(tn){tn.focus();tn.select()}break}
  case 'tgcat':{var ct=customType(S.editType);if(!ct)break;var ci=ct.cats.indexOf(d.c);if(ci>-1){if(ct.cats.length<2){toast('Mindestens ein Bewegungsmuster bleibt gewählt');render();break}ct.cats.splice(ci,1)}else ct.cats.push(d.c);registerType(ct);saveLocs();render();break}
  case 'deltype':{var dt=customType(d.v);if(!dt)break;if(S.type===dt.id)setType('kraft');unregisterType(dt);S.types=S.types.filter(function(x){return x.id!==dt.id});delete S.stash[dt.id];S.editType=S.type;saveLocs();toast(dt.name+' gelöscht. Bisherige Einträge bleiben in der Auswertung.');render();break}
  case 'addmach':addMachine(d.q);break;
  case 'delmach':{if(d.q==='Cardio'){if(CARD_DEFAULT.indexOf(d.v)>-1)break;S.cardios=S.cardios.filter(function(m){return m!==d.v});S.locs.forEach(function(l){if(l.card)delete l.card[d.v]});removeCustomEx(d.v)}
   else{if(machineUsed(d.v))break;S.machines=S.machines.filter(function(m){return m!==d.v});S.locs.forEach(function(l){if(l.mach)delete l.mach[d.v]})}
   saveLocs();toast(d.v+' gelöscht');render();break}
  case 'editloc':S.editLoc=d.v;render();break;
  case 'useloc':setLoc(d.v);render();break;
  case 'newloc':{var nid='ort'+Date.now();S.locs.push({id:nid,name:'Neuer Ort',eq:{'Körpergewicht':1}});ensureMach();S.editLoc=nid;saveLocs();render();var ni=$('#locname');if(ni){ni.focus();ni.select()}break}
  case 'delloc':{if(S.locs.length<2)break;var dl=locById(d.v);S.locs=S.locs.filter(function(l){return l.id!==d.v});S.editLoc=null;if(S.loc===d.v){S.loc=S.locs[0].id;adaptPlan()}saveLocs();toast(dl.name+' gelöscht');render();break}
  case 'tg':{if(d.k==='mach'||d.k==='card'){var ml=locById(S.editLoc)||curLoc();ml[d.k][d.v]=ml[d.k][d.v]?0:1;saveLocs();if(ml.id===S.loc){var am=adaptPlan();if(am.changed)toast(am.changed+' Übung'+(am.changed>1?'en':'')+' im heutigen Plan angepasst')}}
   else if(d.k==='eq'){var el=locById(S.editLoc)||curLoc();el.eq[d.v]=el.eq[d.v]?0:1;if(SUBS[d.v]&&el.eq[d.v]&&!subOn(el,d.v).length)S[SUBS[d.v].list].forEach(function(m){el[SUBS[d.v].flag][m]=1});saveLocs();if(el.id===S.loc){var ar=adaptPlan();if(ar.changed)toast(ar.changed+' Übung'+(ar.changed>1?'en':'')+' im heutigen Plan angepasst')}}else if(d.k==='avoid'){S.set.avoid[d.v]=S.set.avoid[d.v]?0:1;saveLocs();var ar2=adaptPlan();if(ar2.changed)toast(ar2.changed+' Übung'+(ar2.changed>1?'en':'')+' im Plan angepasst')}else S.set.voice=!S.set.voice;render();break}
  case 'perweek':S.set.perWeek=+d.v;render();break;
 }
});
function removeCustomEx(name){
 var c=S.custom.filter(function(x){return x.name===name})[0];S.custom=S.custom.filter(function(x){return x.name!==name});
 removeEx(name);
 return c;
}
/* Neue Maschine (Unterkategorie von Maschine) oder neues Cardio-Gerät; ein Cardio-Gerät ist zugleich eine Erwärmungs-Übung */
function addMachine(q){
 q=q==='Cardio'?'Cardio':'Maschine';var c=SUBS[q],inp=$(q==='Cardio'?'#newcard':'#newmach'),nm=inp?inp.value.trim().replace(/\s+/g,' '):'',l=locById(S.editLoc)||curLoc();
 if(!nm){toast('Bitte einen Namen eingeben');render();return}
 if(S[c.list].some(function(m){return m.toLowerCase()===nm.toLowerCase()})||(q==='Cardio'&&LIB.some(function(e){return e.name.toLowerCase()===nm.toLowerCase()}))){toast(nm+' gibt es schon');render();return}
 S[c.list].push(nm);ensureMach();l[c.flag][nm]=1;
 if(q==='Cardio'){var cu={name:nm,cat:'warm',eq:'Cardio',machine:nm,sets:1,reps:'5 min',rest:0,sub:'Cardio',mode:'time',sg:'cardio',param:'m'};S.custom.push(cu);addCustom(cu)}
 saveLocs();
 toast(q==='Cardio'?nm+' hinzugefügt und als Erwärmungs-Übung angelegt.':nm+' hinzugefügt. Eine passende Übung legst du in der Bibliothek an (Equipment Maschine).');render();
}
/* Neue oder bearbeitete Übung aus dem Assistenten speichern: Übung, Ablauf, Hinweise, Medien */
function wizCommit(){
 var w=S.wiz,name=w.name.trim();
 if(!name){toast('Bitte einen Namen eingeben');render();return null}
 var time=w.meas==='time',secs=wizSecs(),reps=time?fmtSec(secs):(String(w.repsTxt||'').trim()||'8');
 var cu={name:name,cat:w.cat,eq:w.eqs[0],machine:(w.eqs.indexOf('Maschine')>-1||w.eqs.indexOf('Cardio')>-1)?w.machine:'',sets:w.sets,reps:reps,rest:w.rest,sub:w.side+' · '+w.cx,mode:w.meas};
 if(w.eqs.length>1)cu.eqs=w.eqs.slice();if(w.sg)cu.sg=w.sg;if(time&&w.both)cu.both=true;if(w.cat==='warm'&&w.param)cu.param=w.param;
 cu.side=w.side;cu.cx=w.cx;cu.dir=w.dir;cu.focus=w.focus;if(String(w.en||'').trim())cu.en=String(w.en).trim();
 var ctx=S.wizCtx||{mode:'lib'},edit=ctx.mode==='edit'&&ctx.orig,lib=LIB.filter(function(x){return x.name===name})[0];
 if(edit){
  /* Bearbeiten: Titel, Seiten und alle Eigenschaften; bei neuem Titel zieht der Verlauf mit */
  if(name!==ctx.orig&&lib){toast(name+' gibt es schon im Katalog');render();return null}
  var keepSub=ctx.origSub&&w.side===ctx.origSide&&w.cx===ctx.origCx;if(keepSub)cu.sub=ctx.origSub;
  if(name!==ctx.orig)renameEx(ctx.orig,name);
  S.custom=S.custom.filter(function(x){return x.name!==name});S.custom.push(cu);addCustom(cu);
  S.removed=S.removed.filter(function(x){return x!==name});
  S.plan=S.plan.map(function(p){return (p.name===name||p.name===ctx.orig)?Object.assign(planItem(exFromLib(name),cu.cat,p.grp),{locked:p.locked}):p});relabel();
 }else if(!lib){S.removed=S.removed.filter(function(x){return x!==name});S.custom.push(cu);addCustom(cu)}
 var lines=String(w.steps||'').split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean),cues=String(w.cues||'').trim();
 if(lines.length||cues)S.stepsX[name]={st:lines,cues:cues};else if(edit)delete S.stepsX[name];
 if(w.pending.length){S.media[name]=(S.media[name]||[]).concat(w.pending);w.pending=[];KT.media.persist()}
 syncCustomEn();saveLocs();
 var pe=exFromLib(name);lib=LIB.filter(function(x){return x.name===name})[0];
 return {name:name,cat:lib?lib.cat:w.cat,pe:pe};
}
/* Umbenennen: Verlauf, Medien, Ablauf und Gerätewahl ziehen mit; die alte Übung verschwindet aus dem Katalog */
function renameEx(from,to){
 S.hist.forEach(function(h){if(h.name===from)h.name=to});
 [S.media,S.stepsX,S.eqPick].forEach(function(o){if(o[from]!==undefined){o[to]=o[from];delete o[from]}});
 S.custom=S.custom.filter(function(x){return x.name!==from});
 removeEx(from);if(BASE[from]&&S.removed.indexOf(from)<0)S.removed.push(from);
}
/* Assistent mit den Werten einer vorhandenen Übung füllen (Bearbeiten) */
function wizFromEx(name){
 var le=LIB.filter(function(x){return x.name===name})[0];if(!le)return null;
 var pe=fromPool(le.cat,name)||P(le.name,le.eq,3,le.mode==='time'?'45 s':'8',90,le.sub,le.mode,le.machine,{sg:le.sg,both:le.both,eqs:le.eqs,param:le.param}),cu=S.custom.filter(function(x){return x.name===name})[0]||{},w=newWiz(),sub=pe.sub||'',sx=stepsOf(name)||{st:[],cues:''};
 w.name=name;w.cat=le.cat;w.sg=pe.sg||'';w.eqs=(pe.eqs&&pe.eqs.length?pe.eqs:[pe.eq]).slice();w.eq=w.eqs[0];w.machine=pe.machine||'';
 w.meas=pe.mode;w.sets=pe.sets;w.rest=pe.rest;w.both=!!pe.both;w.param=pe.param||'';
 w.side=cu.side||(/unilateral/.test(sub)?'unilateral':'bilateral');w.cx=cu.cx||(/isoliert/.test(sub)?'isoliert':'komplex');w.dir=cu.dir||(/vertikal/.test(sub)?'vertikal':'horizontal');w.focus=cu.focus||'mechanisch';
 w.repsTxt=pe.mode==='time'?String(secOf(pe)):String(pe.reps);
 w.steps=sx.st.join('\n');w.cues=sx.cues||'';w.en=cu.en||EXEN[name]||'';w.enAuto=!w.en;
 return {w:w,origSub:sub,origSide:w.side,origCx:w.cx};
}
/* Beschriftung: Erwärmung heißt W, Schnellkraft A1/A2, alle anderen Übungen laufen ab B (oder A ohne Schnellkraft) */
function relabel(){var n=0,k=0,hasS=S.plan.some(function(x){return x.cat==='schnell'}),LET=hasS?'BCDEFGHIJKLMNOP':'ABCDEFGHIJKLMNOP';S.plan.forEach(function(p){
 if(p.cat==='warm'){p.grp='W'}
 else if(p.cat==='schnell'){p.grp=n===0?'A1':'A2';n++}
 else{p.grp=LET[k]||'X';k++}
})}
function addMediaFiles(list){
 var n=S.detail,files=Array.prototype.slice.call(list||[]),ok=0;if(!files.length)return;
 files.reduce(function(p,f){return p.then(function(){
  if(f.size>250*1048576){toast(f.name+' ist größer als 250 MB. Lege lange Videos besser als Link ab.');return}
  return KT.media.addFile(f).then(function(meta){(S.media[n]=S.media[n]||[]).push(meta);ok++}).catch(function(err){toast(err&&err.message?err.message:'Datei konnte nicht gespeichert werden')});
 })},Promise.resolve()).then(function(){KT.media.persist();saveLocs();if(ok)toast(ok+(ok===1?' Datei':' Dateien')+' gespeichert');render()});
}
function doAddLink(){
 var u=KT.media.cleanUrl(($('#linkurl')||{}).value),t=(($('#linktitle')||{}).value||'').trim();
 if(!u){toast('Bitte eine gültige Adresse eingeben, zum Beispiel https://youtu.be/…');render();return}
 (S.media[S.detail]=S.media[S.detail]||[]).push({id:KT.media.uid(),type:'link',url:u,title:t||(KT.media.ytId(u)?'YouTube':KT.media.host(u)),added:Date.now()});
 S.sheet=null;saveLocs();toast('Link gespeichert');render();
}
document.addEventListener('keydown',function(e){
 if(e.key!=='Enter')return;
 if(e.target.id==='vinput'){e.preventDefault();var v=e.target.value.trim();if(v)handleVoiceText(v)}
 else if(e.target.id==='linkurl'||e.target.id==='linktitle'){e.preventDefault();doAddLink()}
 else if(e.target.id==='newmach'){e.preventDefault();addMachine('Maschine')}
 else if(e.target.id==='newcard'){e.preventDefault();addMachine('Cardio')}
});
document.addEventListener('change',function(e){
 if(e.target.id==='wizname'){var nm=e.target.value.trim();if(nm&&!(S.wizCtx&&S.wizCtx.mode==='edit')){applyClass(nm);render()}return}
 if(e.target.id==='mediafile'){addMediaFiles(e.target.files);e.target.value='';return}
 if(e.target.id==='wizfile'){
  var wfiles=Array.prototype.slice.call(e.target.files||[]);e.target.value='';
  wfiles.reduce(function(p,f){return p.then(function(){
   if(f.size>250*1048576){toast(f.name+' ist größer als 250 MB. Lege lange Videos besser als Link ab.');return}
   return KT.media.addFile(f).then(function(meta){S.wiz.pending.push(meta)}).catch(function(err){toast(err&&err.message?err.message:'Datei konnte nicht gespeichert werden')});
  })},Promise.resolve()).then(function(){render()});
  return;
 }
 if(e.target.id!=='importfile'||!e.target.files[0])return;
 var rd=new FileReader();rd.onload=function(){try{var dd=JSON.parse(rd.result);if(!dd||!dd.locs)throw 0;applyData(dd);adaptPlan();relabel();saveLocs();toast('Import abgeschlossen')}catch(err){toast('Datei konnte nicht gelesen werden')}render()};rd.readAsText(e.target.files[0]);
});
document.addEventListener('input',function(e){
 if(e.target.id==='locname'){var le2=locById(S.editLoc)||curLoc();le2.name=e.target.value||'Ort';saveLocs();document.querySelectorAll('[data-act="editloc"][aria-pressed="true"]').forEach(function(b){b.innerHTML=(le2.id===S.loc?ic('pin',14):'')+esc(le2.name)})}
 if(e.target.id==='typename'){var ty=customType(S.editType);if(ty){ty.name=e.target.value||'Trainingsart';registerType(ty);saveLocs();document.querySelectorAll('[data-act="edittype"][aria-pressed="true"]').forEach(function(b){b.innerHTML=(ty.id===S.type?ic('pin',14):'')+esc(ty.name)})}}
 if(e.target.id==='libq'){S.lib.q=e.target.value;var ll=$('#liblist');ll.innerHTML=libList();I18N.trDom(ll)}
 if(e.target.id==='vinput'&&S.sheet)S.sheet.typed=e.target.value;
 if(e.target.id==='wizen'){S.wiz.en=e.target.value;S.wiz.enAuto=false}
 if(e.target.id==='wizname'){S.wiz.name=e.target.value||'Neue Übung';if(S.wiz.enAuto){S.wiz.en=suggestEn(e.target.value);var we=$('#wizen');if(we)we.value=S.wiz.en}var s=$('#wizsum');if(s){s.innerHTML='<div class="eyebrow" style="margin-bottom:4px">Ergebnis</div>'+wizSummary();I18N.trDom(s)}}
 if(e.target.id==='wizreps'){S.wiz.repsTxt=e.target.value;var s2=$('#wizsum');if(s2){s2.innerHTML='<div class="eyebrow" style="margin-bottom:4px">Ergebnis</div>'+wizSummary();I18N.trDom(s2)}}
 if(e.target.id==='warmval'&&S.tr)S.tr.pv=e.target.value;
 if(e.target.id==='wizsteps')S.wiz.steps=e.target.value;
 if(e.target.id==='wizcues')S.wiz.cues=e.target.value;
 if(e.target.id==='wizlink')S.wiz.linkUrl=e.target.value;
 if(e.target.id==='exq'&&S.sheet){S.sheet.q=e.target.value;var xl=$('#exlist');if(xl){xl.innerHTML=exListHtml(S.sheet);I18N.trDom(xl)}}
});

/* Zurück-Taste des Geräts: Basiseintrag plus Schutzeintrag im Verlauf, damit „Zurück“ in der App bleibt */
try{if(!(history.state&&history.state.kt!=null))history.replaceState({kt:0},'')}catch(e){}
document.addEventListener('click',function(){if(!userActive){userActive=true;ensureGuard()}},true);
window.addEventListener('popstate',function(){
 if(appBack())return;
 exitArmed=true;toast('Nochmal „Zurück“ zum Beenden');render();
 setTimeout(function(){exitArmed=false;ensureGuard()},2500);
});
/* Sprungleiste */
if($('#jump'))$('#jump').innerHTML=JUMPS.map(function(j){return '<button data-j="'+j[0]+'">'+j[1]+'</button>'}).join('');
function renderVbar(){var vb=$('#vbar');if(!vb)return;vb.innerHTML='<span>Version '+esc(self.KT_VERSION||'?')+'</span><button class="langbtn" data-act="lang" aria-label="Sprache wechseln / Switch language" data-nt="1"><b>'+(isEn()?'':'')+'DE</b><i></i><b>EN</b></button>';var bs=vb.querySelectorAll('.langbtn b');bs[0].className=isEn()?'':'on';bs[1].className=isEn()?'on':''}
if(isLive())ensureTick();
relabel();render();
})();
