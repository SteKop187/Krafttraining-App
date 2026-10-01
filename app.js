(function(){
"use strict";
/* ---------- Helfer ---------- */
var $=function(s){return document.querySelector(s)};
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
function fmt(n,d){return Number(n).toLocaleString('de-DE',{maximumFractionDigits:d==null?1:d})}
function fmtRest(s){return s<60?s+' s':fmt(s/60)+' min'}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var MON=['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
var TODAY=(function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate())})();
function dateOf(w){var d=new Date(TODAY.getTime()-(40-w)*7*864e5);return d.getDate()+'. '+MON[d.getMonth()]}
function kwOf(w){var d=new Date(TODAY.getTime()-(40-w)*7*864e5);var t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);var y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-y)/864e5+1)/7)}

/* ---------- Domänendaten ---------- */
var SLOT={
 schnell:{l:'Schnell',c:'--c-schnell'}, squat:{l:'Squat',c:'--c-squat'}, push:{l:'Drücken',c:'--c-push'},
 hinge:{l:'Hinge',c:'--c-hinge'}, pull:{l:'Ziehen',c:'--c-pull'}, rumpf:{l:'Rumpf',c:'--c-rumpf'}, assist:{l:'Assistenz',c:'--c-rumpf'},
 haltung:{l:'Haltung',c:'--c-aufricht'}, huefte:{l:'Hüfte',c:'--c-aufricht'}, mobil:{l:'Mobilisation',c:'--c-aufricht'}, aufricht:{l:'Aufrichtung',c:'--c-aufricht'}
};
var ORDER=['schnell','squat','push','hinge','pull','rumpf','assist','haltung','huefte','mobil'];
var KRAFT_CATS=['schnell','squat','push','hinge','pull','rumpf','assist'],AUFR_CATS=['haltung','huefte','mobil'];
/* Kategorien der Statistik: die drei Aufrichtungs-Muster werden zusammengefasst */
var STATCATS=['schnell','squat','push','hinge','pull','rumpf','aufricht'];
var TYPES={kraft:{name:'Krafttraining',sub:'Ganzkörper-, Unter- und Oberkörpereinheiten',icon:'dumbbell'},aufricht:{name:'Aufrichtung',sub:'Haltung, Hüfte und Mobilisation',icon:'spine'}};
function P(name,eq,sets,reps,rest,sub,mode){return {name:name,eq:eq,sets:sets,reps:reps,rest:rest,sub:sub||'',mode:mode||'reps'}}
var POOL={
 schnell:[P('MedBall-Rotationswurf','Medizinball',3,'5/Seite',30,'Wurf'),P('Box Sprung','Box',3,'5',90,'Sprung'),P('Hexbar Züge','Langhantel',4,'3',180,'Gewichtheben'),P('Sprung mit Kurzhantel','Kurzhantel',3,'3',180,'Sprung'),P('MedBall-Brustwurf','Medizinball',3,'5',90,'Wurf')],
 squat:[P('Kniebeuge vorn','Langhantel',4,'6',150,'bilateral · komplex'),P('Kniebeuge hinten','Langhantel',4,'6',150,'bilateral · komplex'),P('Ausfallschritt','Kurzhantel',3,'8/Seite',120,'unilateral'),P('Split Squat','Kurzhantel',3,'8/Seite',120,'unilateral'),P('Beinpresse','Maschine',3,'10',120,'bilateral')],
 push:[P('Bankdrücken','Langhantel',4,'8',120,'horizontal'),P('Schrägbankdrücken','Kurzhantel',3,'8',120,'horizontal'),P('Überkopfdrücken','Langhantel',3,'8',120,'vertikal'),P('Kurzhantel-Schulterdrücken','Kurzhantel',3,'10',90,'vertikal'),P('Bankdrücken mit Bändern','Band',3,'5',90,'horizontal')],
 hinge:[P('Hexbar Kreuzheben','Langhantel',3,'6',150,'bilateral · komplex'),P('Rumänisches Kreuzheben','Langhantel',3,'8',120,'bilateral'),P('Hip Thrust','Langhantel',3,'8',120,'bilateral'),P('Beinbeuger','Maschine',3,'10',90,'isoliert'),P('Kettlebell Swing','Kettlebell',4,'10',90,'bilateral · ballistisch'),P('Einbeiniges Kreuzheben','Kurzhantel',3,'8/Seite',90,'unilateral')],
 pull:[P('Latzug','Seilzug',3,'8',90,'vertikal'),P('Klimmzug','Körpergewicht',3,'6',120,'vertikal'),P('Kurzhantel Rudern','Kurzhantel',3,'8/Seite',90,'horizontal'),P('Ruderzug eng','Seilzug',3,'10',90,'horizontal'),P('Ruderzug breit','Seilzug',3,'10',90,'horizontal'),P('Band Rudern','Band',3,'12',60,'horizontal')],
 rumpf:[P('Pallof Press','Seilzug',3,'8/Seite',30,'Rotation · stabilisieren'),P('Kabelrotation','Seilzug',3,'8/Seite',30,'Rotation · bewegen'),P('Seitstütz statisch','Körpergewicht',3,'45 s',30,'Seitneige · stabilisieren','time'),P('Roll-Out','Körpergewicht',3,'8',60,'Beugung · stabilisieren')],
 assist:[P('Face Pull','Seilzug',3,'12',90,'Schulterblatt'),P('Wadenheben','Maschine',3,'12',60,'Waden'),P('Hammer Curl','Kurzhantel',3,'10',60,'Arme')],
 haltung:[P('Wall Angels','Körpergewicht',3,'10',45,'Schulterblatt'),P('Band Pull-Apart','Band',3,'15',45,'Schulterblatt'),P('Y-T-W-Heben','Körpergewicht',3,'8',45,'Schulterblatt · Rückenstrecker'),P('Schulterblatt-Liegestütz','Körpergewicht',3,'10',45,'Schulterblatt')],
 huefte:[P('Dead Bug','Körpergewicht',3,'8/Seite',45,'Rumpf · Hüfte'),P('Bird Dog','Körpergewicht',3,'8/Seite',45,'Rumpf · Hüfte'),P('Glute Bridge','Körpergewicht',3,'12',45,'Gesäß'),P('Clamshell mit Band','Band',3,'12/Seite',45,'Gesäß · seitlich'),P('Hüftbeuger-Dehnung','Körpergewicht',2,'45 s',20,'Dehnung','time')],
 mobil:[P('Katze-Kuh','Körpergewicht',2,'10',20,'Wirbelsäule'),P('Thorakale Rotation (Seitenlage)','Körpergewicht',2,'8/Seite',20,'Brustwirbelsäule'),P('Türrahmen-Dehnung Brust','Körpergewicht',2,'40 s',20,'Dehnung','time'),P('Brustwirbelsäule über Rolle','Körpergewicht',2,'60 s',20,'Mobilisation','time')]
};
var EQGROUP={'Hexbar':'Langhantel'};
var EQ_ALL=['Körpergewicht','Langhantel','Kurzhantel','Kettlebell','Maschine','Seilzug','Band','Medizinball','Box'];
/* Belastete Gelenke je Muster (für „Heute meiden“) und Start-/Schrittgewichte je Equipment */
var JOINTS={push:['Schulter','Ellbogen','Handgelenk'],pull:['Schulter','Ellbogen'],squat:['Knie'],hinge:['Rücken'],schnell:['Knie','Rücken'],rumpf:['Rücken'],assist:[],haltung:['Schulter'],huefte:[],mobil:[]};
var JOINT_X={'Beinpresse':['Knie'],'Beinbeuger':[],'Beinstrecker':['Knie'],'Hip Thrust':[],'Face Pull':['Schulter'],'Hammer Curl':['Ellbogen'],'Wadenheben':[],'Seitstütz statisch':['Schulter'],'Roll-Out':['Schulter','Rücken'],'Pallof Press':[],'Kabelrotation':[],'MedBall-Rotationswurf':['Schulter'],'Box Sprung':['Knie'],'Kettlebell Swing':['Rücken']};
function jointsOf(cat,name){return JOINT_X[name]||JOINTS[cat]||[]}
var EQDEF={'Langhantel':{kg:40,step:2.5},'Kurzhantel':{kg:12,step:2},'Maschine':{kg:30,step:2.5},'Seilzug':{kg:20,step:2.5},'Kettlebell':{kg:16,step:4},'Medizinball':{kg:4,step:1},'Körpergewicht':{kg:0,step:2.5},'Band':{kg:0,step:2.5},'Box':{kg:0,step:5}};
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
function getRef(n){
 var r=getRefOld(n),le=LIB.filter(function(x){return x.name===n})[0],d=EQDEF[le?le.eq:'']||null;
 if(!r.hist){r=Object.assign({},r,{why:'Noch keine Einträge, daher ein Startwert als Vorschlag. Danach passt sich die App an deine Bewertungen an.',start:true});
  if(d)r=Object.assign({},r,{kg:d.kg,sug:d.kg,step:d.step})}
 else if(d&&!REF[n]){var dir=r.sug>r.kg?1:(r.sug<r.kg?-1:0);r=Object.assign({},r,{step:d.step,sug:Math.max(0,r.kg+dir*d.step)})}
 return r;
}
function getRefOld(n){
 var td=new Date(),tds=td.getFullYear()+'-'+String(td.getMonth()+1).padStart(2,'0')+'-'+String(td.getDate()).padStart(2,'0'),h=(S.hist||[]).filter(function(x){return x.name===n&&x.date!==tds});
 if(h.length){var l=h[h.length-1],b=REF[n]||{},step=b.step||2.5;
  if(l.sec){var ds5=l.r==='m'?5:(l.r==='w'?-5:0);return {kg:0,sec:l.sec,sug:Math.max(5,l.sec+ds5),step:5,hist:true,why:l.r==='m'?'Letzte Bewertung „Mehr“, daher +5 s.':(l.r==='w'?'Letzte Bewertung „Weniger“, daher −5 s.':'Letzte Bewertung „Passt“, Zeit bleibt.')}}
  var sug=Math.max(0,l.kg+(l.r==='m'?step:(l.r==='w'?-step:0)));
  return {kg:l.kg,reps:l.reps,sug:sug,step:step,hist:true,why:l.r==='m'?'Letzte Bewertung „Mehr“, daher +'+fmt(step)+' kg.':(l.r==='w'?'Letzte Bewertung „Weniger“, daher −'+fmt(step)+' kg.':'Letzte Bewertung „Passt“, Gewicht bleibt.')}}
 return REF[n]||{kg:40,reps:8,sug:40,step:2.5,why:'Noch keine Vorgeschichte, starte mit einem leichten Satz.'}}
var LIB=[];
(function(){var r=rng(11);ORDER.forEach(function(c){POOL[c].forEach(function(e){LIB.push({name:e.name,cat:c,eq:e.eq,sub:e.sub,mode:e.mode,uses:0,img:0,vid:0,link:0})})});LIB.push({name:'Beinstrecker',cat:'squat',eq:'Maschine',sub:'isoliert',mode:'reps',uses:0,img:0,vid:0,link:0},{name:'Farmer Carry',cat:'rumpf',eq:'Kurzhantel',sub:'Seitneige · stabilisieren',mode:'time',uses:0,img:0,vid:0,link:0})})();
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
 wiz:{name:'',eq:'Langhantel',cat:'push',dir:'horizontal',side:'bilateral',cx:'komplex',meas:'reps',focus:'mechanisch'},wizHint:'Gib einen Namen ein, dann schlage ich die Einordnung vor.',
 stats:{range:12,sub:'ueber',ex:'Bankdrücken',table:false},
 locs:[
  {id:'potsdam',name:'Potsdam Ruderzentrum',eq:{'Körpergewicht':1,'Langhantel':1,'Kurzhantel':1,'Kettlebell':0,'Maschine':1,'Seilzug':1,'Band':0,'Medizinball':1,'Box':1}},
  {id:'lagoazul',name:'Trainingslager Lago Azul',eq:{'Körpergewicht':1,'Langhantel':0,'Kurzhantel':1,'Kettlebell':1,'Maschine':0,'Seilzug':0,'Band':1,'Medizinball':1,'Box':1}}
 ],loc:'potsdam',editLoc:null,
 set:{avoid:{Schulter:0,Knie:0,Rücken:0,Ellbogen:0,Handgelenk:0},perWeek:3,voice:true}
};
(function(){var init={'A1':'MedBall-Rotationswurf','A2':'Box Sprung','B':'Kniebeuge vorn','C':'Bankdrücken','D':'Hexbar Kreuzheben','E':'Latzug','F':'Pallof Press'};
 S.plan=S.plan.map(function(p){var e=POOL[p.cat].filter(function(x){return x.name===init[p.grp]})[0];return {cat:p.cat,grp:p.grp,rest:p.rest,name:e.name,eq:e.eq,sets:e.sets,reps:e.reps,mode:e.mode,sub:e.sub,locked:false}})})();
function locById(id){return S.locs.filter(function(l){return l.id===id})[0]}
function curLoc(){return locById(S.loc)||S.locs[0]}
function eqOn(e){return !!curLoc().eq[EQGROUP[e]||e]}
function eqList(l){return EQ_ALL.filter(function(e){return l.eq[e]})}
function eqCount(){return eqList(curLoc()).length}
/* Übung passt: Equipment am Ort vorhanden und kein gesperrtes Gelenk belastet */
function okEx(e,cat){return eqOn(e.eq)&&!jointsOf(cat||e.cat,e.name).some(function(j){return S.set.avoid[j]})}
function usesOf(name){var d={};S.hist.forEach(function(h){if(h.name===name)d[h.date]=1});return Object.keys(d).length}
function mediaCount(name,t){return (S.media[name]||[]).filter(function(m){return m.type===t}).length}
/* Orte merken: letzter gewählter Ort ist beim nächsten Öffnen Standard (nur in diesem Browser) */
var LSKEY='krafttraining-app-v1';
function saveLocs(){try{localStorage.setItem(LSKEY,JSON.stringify({v:2,locs:S.locs,loc:S.loc,plan:S.plan,set:S.set,hist:S.hist,custom:S.custom,media:S.media,stepsX:S.stepsX,planDate:S.planDate,tpl:S.tpl,type:S.type,stash:S.stash}))}catch(e){}}
function applyData(d){
 if(!d)return;
 if(d.locs&&d.locs.length){S.locs=d.locs;S.loc=locById(d.loc)?d.loc:d.locs[0].id}
 if(d.custom&&d.custom.length){S.custom=d.custom;d.custom.forEach(addCustom)}
 if(d.plan&&d.plan.length)S.plan=d.plan;
 if(d.set){if(d.set.avoid)S.set.avoid=d.set.avoid;if(d.set.perWeek)S.set.perWeek=d.set.perWeek;if('voice' in d.set)S.set.voice=d.set.voice}
 if(d.hist)S.hist=d.hist;
 if(d.media)S.media=d.media;
 if(d.stepsX)S.stepsX=d.stepsX;
 if(d.planDate)S.planDate=d.planDate;
 if(d.tpl&&TPL[d.tpl])S.tpl=d.tpl;
 if(d.type&&TYPES[d.type])S.type=d.type;
 if(d.stash&&typeof d.stash==='object')S.stash=d.stash;
}
function loadLocs(){try{applyData(JSON.parse(localStorage.getItem(LSKEY)||'null'))}catch(e){}}
/* Eigene Übungen aus dem Assistenten */
function addCustom(c){
 if(!POOL[c.cat]||fromPool(c.cat,c.name))return;
 POOL[c.cat].push(P(c.name,c.eq,c.sets||3,c.reps||'8',c.rest||90,c.sub||'',c.mode||'reps'));
 if(!LIB.some(function(e){return e.name===c.name}))LIB.push({name:c.name,cat:c.cat,eq:c.eq,sub:c.sub||'',mode:c.mode||'reps',uses:0,img:0,vid:0,link:0});
}
/* Plan an das Equipment am Ort anpassen: fehlt Equipment, wird eine Übung desselben Musters eingesetzt */
function adaptPlan(){
 var changed=0,missing=0;
 S.plan.forEach(function(p,i){
  if(p.was&&!p.locked){var o=fromPool(p.cat,p.was);if(o&&okEx(o,p.cat)&&S.plan.every(function(x){return x.name!==o.name})){S.plan[i]=Object.assign({},p,o,{rest:o.rest,na:false,was:null});changed++;return}}
  if(okEx(p,p.cat)){p.na=false;return}
  var names=S.plan.map(function(x){return x.name}),c=POOL[p.cat].filter(function(x){return okEx(x,p.cat)&&names.indexOf(x.name)<0});
  if(p.locked||!c.length){p.na=true;missing++;return}
  var n=c[0];S.plan[i]=Object.assign({},p,n,{locked:false,grp:p.grp,rest:n.rest,na:false,was:p.was||p.name});changed++;
 });
 return {changed:changed,missing:missing};
}
function setLoc(id){
 if(id===S.loc)return;snap();S.loc=id;saveLocs();var r=adaptPlan();
 toast(curLoc().name+(r.changed?' · '+r.changed+' Übung'+(r.changed>1?'en':'')+' angepasst':' · Plan passt')+(r.missing?' · '+r.missing+' ohne Ersatz':''),true);
}
function fromPool(cat,name){return POOL[cat].filter(function(x){return x.name===name})[0]}
function metaLine(p){return p.sets+' × '+p.reps+' · '+fmtRest(p.rest)+' Pause · '+p.eq}
/* ---------- Einheiten und Tagesplan ---------- */
var TPL={
 gka:{name:'Ganzkörper A',slots:['schnell','schnell','squat','push','hinge','pull','rumpf']},
 gkb:{name:'Ganzkörper B',slots:['schnell','schnell','hinge','pull','squat','push','rumpf']},
 uk:{name:'Unterkörper',slots:['schnell','schnell','hinge','squat','hinge','squat','rumpf']},
 ok:{name:'Oberkörper',slots:['schnell','schnell','push','pull','push','pull','rumpf']},
 aufa:{name:'Aufrichtung A',slots:['mobil','haltung','huefte','haltung','huefte','mobil']},
 aufb:{name:'Aufrichtung B',slots:['huefte','mobil','haltung','huefte','haltung','mobil']}
};
Object.keys(TPL).forEach(function(k){TPL[k].type=/^auf/.test(k)?'aufricht':'kraft'});
function rotation(){return S.type==='aufricht'?['aufa','aufb']:(S.set.perWeek===2?['gka','gkb']:['uk','ok','gka'])}
function typOf(h){return h.typ||'kraft'}
function todayStr(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function pastDates(){var o={};S.hist.forEach(function(h){if(h.date!==todayStr()&&typOf(h)===S.type)o[h.date]=h.tpl||''});return Object.keys(o).sort().map(function(d){return {date:d,tpl:o[d]}})}
function nextTpl(){var rot=rotation(),p=pastDates(),last=p.length?p[p.length-1].tpl:'',i=rot.indexOf(last);return rot[(i+1)%rot.length]}
function recentNames(n){var ds=pastDates().slice(-n).map(function(x){return x.date});return S.hist.filter(function(h){return ds.indexOf(h.date)>-1&&typOf(h)===S.type}).map(function(h){return h.name})}
function cxRank(p){var s=p.sub||'';return /komplex/.test(s)?0:(/unilateral/.test(s)?2:(/isoliert/.test(s)?3:1))}
function generatePlan(id){
 var t=TPL[id],used=[],recent=recentNames(2),items=[];
 t.slots.forEach(function(cat){
  var c=POOL[cat].filter(function(x){return okEx(x,cat)&&used.indexOf(x.name)<0}),fresh=c.filter(function(x){return recent.indexOf(x.name)<0});
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
function planMinutes(){var s=0;S.plan.forEach(function(p){s+=p.sets*40+(p.sets-1)*p.rest});return Math.max(5,Math.round(s/60/5)*5)}
/* Trainingsart wechseln: der Plan der bisherigen Art wird für heute zwischengespeichert */
function setType(t){
 if(!TYPES[t]||t===S.type)return;
 S.stash[S.type]={plan:S.plan,tpl:S.tpl,date:S.planDate};
 var s=S.stash[t];S.type=t;
 if(s&&s.date===todayStr()&&s.plan&&s.plan.length&&TPL[s.tpl]&&TPL[s.tpl].type===t){S.plan=s.plan;S.tpl=s.tpl;S.planDate=s.date}
 else newDayPlan();
 adaptPlan();saveLocs();
}
loadLocs();if(S.planDate!==todayStr()||!TPL[S.tpl]||TPL[S.tpl].type!==S.type)newDayPlan();adaptPlan();

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
 for(var w=0;w<40;w++){var row={w:w},tot=0;ORDER.slice(0,6).forEach(function(c){var v=Math.max(2,Math.round(base[c]*(0.75+0.15*Math.min(1,w/12))+(r()-.5)*3));if(w%9===8)v=Math.max(2,Math.round(v*.6));row[c]=v;tot+=v});row.t=tot;row.n=(w%9===8)?2:(r()<.5?2:3);STACK.push(row)}})();

/* ---------- Screens ---------- */
var JUMPS=[['heute','Heute'],['ort','Ort wählen'],['voice','Sprache'],['train','Training'],['time','Zeit-Übung'],['stats','Auswertung'],['lib','Bibliothek'],['detail','Übungsdetail'],['wizard','Neue Übung'],['more','Einstellungen']];
function slotTag(cat){var s=SLOT[cat];return '<span class="tag"><i class="dot" style="--c:var('+s.c+')"></i>'+s.l+'</span>'}

function sHeute(){
 var out='<div class="pad"><div class="eyebrow">'+new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})+'</div><h1 class="h1">'+esc(TPL[S.tpl].name)+'</h1>'+
 '<p class="sub">Einheit '+weekCount()+' dieser Woche · '+S.plan.length+' Übungen · ca. '+planMinutes()+' min</p>'+
 '<button class="locrow" data-act="sheet" data-s="loc" aria-label="Trainingsort wechseln"><span class="pin">'+ic('pin',20)+'</span><span class="txt"><small>Trainingsort · '+eqCount()+' Geräte</small><b>'+esc(curLoc().name)+'</b></span><span class="mut" style="font-size:13px;font-weight:600;display:flex;align-items:center;gap:2px">wechseln'+ic('next',14)+'</span></button>'+
 '<div class="group">';
 S.plan.forEach(function(p,i){
  if(p.grp==='A2'){out+='<div class="ss">'+ic('swap',13)+'Supersatz · abwechselnd</div>'}
  var open=S.exp===i;
  out+='<div class="item"><button class="item-main" data-act="exp" data-i="'+i+'" aria-expanded="'+open+'"><span class="grp">'+p.grp+'</span><span class="txt">'+slotTag(p.cat)+'<b>'+esc(p.name)+(p.locked?' &nbsp;'+ic('lock',13):'')+'</b><small>'+esc(metaLine(p))+'</small>'+(p.na?'<span class="warn">'+ic('alert',13)+(eqOn(p.eq)?'Wegen „Heute meiden“ gesperrt':esc(p.eq)+' gibt es hier nicht')+'</span>':(p.was&&p.was!==p.name?'<span class="was">statt '+esc(p.was)+'</span>':''))+'</span><span class="mut">'+ic(open?'chevd':'next',16)+'</span></button>';
  if(open){out+='<div class="actions">'+
   '<button class="act" data-act="dice" data-i="'+i+'">'+ic('dice',20)+'Würfeln</button>'+
   '<button class="act" data-act="pick" data-i="'+i+'">'+ic('swap',20)+'Ersetzen</button>'+
   '<button class="act" data-act="lock" data-i="'+i+'" aria-pressed="'+!!p.locked+'">'+ic('lock',20)+'Behalten</button>'+
   '<button class="act" data-act="del" data-i="'+i+'">'+ic('trash',20)+'Streichen</button></div>'}
  out+='</div>';
 });
 out+='</div><button class="btn ghost" data-act="sheet" data-s="add">'+ic('plus',18)+'Übung hinzufügen</button>'+
 '<div class="row2" style="margin-top:10px"><button class="btn" style="flex:1" data-act="rerollall">'+ic('dice',18)+'Alles neu würfeln</button><button class="btn" style="flex:1" data-act="sheet" data-s="tpl">'+ic('swap',18)+'Einheit wechseln</button></div></div>'+
 '<div class="cta"><button class="btn primary big" data-act="start">'+ic('play',18)+'Training starten</button><button class="fab" data-act="voice" aria-label="Plan per Sprache ändern">'+ic('mic',24)+'</button></div>';
 return out;
}

function curEx(){return S.tr.over||S.plan[S.tr.i]}
function resetInputs(){var ex=curEx(),rf=getRef(ex.name);S.tr.kg=rf.sug;S.tr.reps=parseInt(ex.reps,10)||8;S.tr.rir=1;S.tr.sec=ex.mode==='time'?(rf.hist?rf.sug:(parseInt(ex.reps,10)||30)):0;S.tr.running=false;S.tr.phase='input'}
function sTrain(){
 var t=S.tr,ex=curEx(),rf=getRef(ex.name),time=ex.mode==='time',total=ex.sets,out='';
 var idx=t.over?S.plan.length:t.i+1;
 out+='<div class="top-bar"><button class="iconbtn" data-act="go" data-s="heute" aria-label="Training beenden">'+ic('close',22)+'</button><span class="cnt">Übung '+idx+' von '+S.plan.length+'</span>'+
  '<span class="row2"><button class="iconbtn" data-act="exnav" data-d="-1" aria-label="Vorige Übung">'+ic('back',22)+'</button><button class="iconbtn" data-act="exnav" data-d="1" aria-label="Nächste Übung">'+ic('next',22)+'</button></span></div><div class="pad">';
 out+=slotTag(ex.cat)+'<h1 class="h1" style="font-size:36px">'+esc(ex.name)+'</h1>';
 out+='<div class="dots">';for(var s=1;s<=total;s++){out+='<i class="'+(s<t.set?'done':(s===t.set&&t.phase!=='done'?'cur':(t.phase==='done'?'done':'')))+'"></i>'}out+='</div>';
 if(t.phase==='done'){
  var last=t.log[t.log.length-1],nx=nextSuggest(last,rf,time);
  out+='<div class="eyebrow" style="margin-bottom:8px">Übung abgeschlossen</div><div class="group" style="margin-bottom:12px">';
  t.log.forEach(function(l,k){out+='<div class="logrow"><span><b>Satz '+(k+1)+'</b> &nbsp;'+(time?l.sec+' s':fmt(l.kg)+' kg × '+l.reps)+'</span><span class="ic">'+ic(l.r==='m'?'up':(l.r==='w'?'down':'eq'),18)+'</span></div>'});
  out+='</div><div class="hint">'+ic('info',18)+'<span>Nächstes Mal: <b>'+nx+'</b> (abgeleitet aus deiner letzten Bewertung).</span></div>';
  var nxt=t.over?null:S.plan[t.i+1];
  out+='</div><div class="cta"><button class="btn primary big" data-act="nextex">'+(nxt?'Weiter: '+esc(nxt.name):'Einheit abschließen')+ic('next',18)+'</button></div>';
  return out;
 }
 if(t.phase==='rest'){
  out+='<div class="ring"><svg viewBox="0 0 176 176" width="176" height="176"><circle cx="88" cy="88" r="80" fill="none" stroke="var(--line)" stroke-width="10"/><circle id="ringc" cx="88" cy="88" r="80" fill="none" stroke="var(--ink)" stroke-width="10" stroke-linecap="round" stroke-dasharray="502.65" stroke-dashoffset="'+(502.65*(1-t.rest/t.restTot)).toFixed(1)+'"/></svg><div><div class="n" id="restn">'+mmss(t.rest)+'</div><div class="l">Pause</div></div></div>'+
  '<div class="hint">'+ic('info',18)+'<span>'+hintAfter(t,rf,time)+'</span></div>'+
  '<div class="goal"><div><small>Als Nächstes</small><b>Satz '+t.set+' von '+total+'</b></div><div><small>Vorschlag</small><b>'+(time?t.sec+' s':fmt(t.kg)+' kg × '+t.reps)+'</b></div></div></div>'+
  '<div class="cta"><button class="btn big" data-act="skiprest">Pause überspringen</button></div>';
  return out;
 }
 if(t.phase==='rate'){
  out+='<div class="field"><small>Satz '+t.set+' gespeichert</small><div class="num" style="font-size:44px;line-height:1.1;padding:2px 6px">'+(time?t.sec+' s':fmt(t.kg)+' kg × '+t.reps)+(!time?' <span class="mut" style="font-size:20px">· '+t.rir+' RIR</span>':'')+'</div></div>'+
  '<div class="eyebrow" style="margin:14px 0 0">Wie war der Satz?</div><div class="rate">'+
  '<button data-act="rate" data-r="w">'+ic('down',26)+'Weniger<small>nächstes Mal</small></button>'+
  '<button data-act="rate" data-r="p">'+ic('eq',26)+'Passt<small>so lassen</small></button>'+
  '<button data-act="rate" data-r="m">'+ic('up',26)+'Mehr<small>nächstes Mal</small></button></div></div>';
  return out;
 }
 out+='<div class="goal"><div><small>Ziel</small><b>'+total+' × '+esc(ex.reps)+'</b></div><div><small>Pause · Reserve</small><b>'+fmtRest(ex.rest)+(time?'':' · 1 RIR')+'</b></div></div>'+
 '<div class="hint">'+ic('info',18)+'<span><b>'+(rf.hist?(time?'Letztes Mal '+rf.sec+' s':'Letztes Mal '+fmt(rf.kg)+' kg × '+rf.reps):'Startwert')+'.</b> '+esc(rf.why)+'</span></div>';
 if(time){
  out+='<div class="field"><small>Haltezeit</small><div class="stepper"><button class="sb" data-act="adj" data-f="sec" data-d="-5" aria-label="5 Sekunden weniger">'+ic('minus',22)+'</button><div class="val" id="secv">'+mmss(t.sec)+'</div><button class="sb" data-act="adj" data-f="sec" data-d="5" aria-label="5 Sekunden mehr">'+ic('plus',22)+'</button></div></div>'+
  '<button class="btn wide" data-act="sw" style="height:56px;margin-bottom:10px">'+ic(t.running?'stop':'timer',20)+(t.running?'Stoppen':'Mit Stoppuhr messen')+'</button>';
 }else{
  out+='<div class="field"><small>Gewicht</small><div class="stepper"><button class="sb" data-act="adj" data-f="kg" data-d="-'+rf.step+'" aria-label="Gewicht verringern">'+ic('minus',22)+'</button><div class="val">'+fmt(t.kg)+'<em>kg</em></div><button class="sb" data-act="adj" data-f="kg" data-d="'+rf.step+'" aria-label="Gewicht erhöhen">'+ic('plus',22)+'</button></div></div>'+
  '<div class="field"><small>Wiederholungen</small><div class="stepper"><button class="sb" data-act="adj" data-f="reps" data-d="-1" aria-label="Eine Wiederholung weniger">'+ic('minus',22)+'</button><div class="val">'+t.reps+'</div><button class="sb" data-act="adj" data-f="reps" data-d="1" aria-label="Eine Wiederholung mehr">'+ic('plus',22)+'</button></div></div>'+
  '<div class="field"><small>Wiederholungen in Reserve (optional)</small><div class="seg">'+[0,1,2,3].map(function(v){return '<button data-act="rir" data-v="'+v+'" aria-pressed="'+(t.rir===v)+'">'+v+(v===3?'+':'')+' RIR</button>'}).join('')+'</div></div>';
 }
 out+='<button class="btn" data-act="go" data-s="detail" data-n="'+esc(ex.name)+'" style="width:100%;margin-bottom:4px">'+ic('video',18)+'Ablauf und Medien ansehen</button></div>'+
 '<div class="cta"><button class="btn primary big" data-act="done">'+ic('check',20)+'Satz abschließen</button></div>';
 return out;
}
function mmss(s){var m=Math.floor(s/60),r=s%60;return m+':'+(r<10?'0':'')+r}
function nextSuggest(last,rf,time){
 if(time){var d=last.r==='m'?5:(last.r==='w'?-5:0);return (last.sec+d)+' s'}
 var d2=last.r==='m'?rf.step:(last.r==='w'?-rf.step:0);return fmt(last.kg+d2)+' kg × '+last.reps
}
function hintAfter(t,rf,time){
 var l=t.log[t.log.length-1];if(!l)return '';
 var txt=l.r==='m'?'„Mehr“ bewertet: nächster Satz '+(time?'+5 s':'+'+fmt(rf.step)+' kg')+'.':(l.r==='w'?'„Weniger“ bewertet: nächster Satz '+(time?'−5 s':'−'+fmt(rf.step)+' kg')+'.':'„Passt“ bewertet: Vorgabe bleibt gleich.');
 return txt;
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
 var q=S.lib.q.toLowerCase(),items=LIB.filter(function(e){return (S.lib.cat==='alle'||e.cat===S.lib.cat)&&e.name.toLowerCase().indexOf(q)>-1});
 if(!items.length)return '<div class="group"><div class="lrow"><span class="txt"><b>Keine Treffer</b><small>Lege die Übung neu an, sie ist danach sofort im Generator.</small></span></div></div>';
 return '<div class="group">'+items.map(function(e){
  return '<button class="lrow" data-act="open" data-n="'+esc(e.name)+'"><span class="txt">'+slotTag(e.cat)+'<b>'+esc(e.name)+'</b><small>'+esc(e.sub?e.sub+' · '+e.eq:e.eq)+'</small></span><span class="m">'+[['image','image'],['video','video'],['link','link']].map(function(t){var c=mediaCount(e.name,t[0]);return c?'<span>'+ic(t[1],14)+c+'</span>':''}).join('')+'</span><span class="num mut" style="font-size:18px;min-width:26px;text-align:right">'+usesOf(e.name)+'×</span></button>'}).join('')+'</div>';
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
 out='<div class="top-bar"><button class="iconbtn" data-act="back" aria-label="Zurück">'+ic('back',22)+'</button><span class="cnt">Übung</span><span style="width:44px"></span></div><div class="pad">'+slotTag(e.cat)+'<h1 class="h1" style="font-size:36px">'+esc(e.name)+'</h1><p class="sub">'+esc(e.sub?e.sub+' · '+e.eq:e.eq)+' · '+usesOf(n)+' Einheit'+(usesOf(n)===1?'':'en')+'</p>'+
 '<div class="sec" style="margin-top:4px">Medien</div>';
 if(med.length)out+='<div class="media">'+med.map(mediaTile).join('')+'</div>';
 else out+='<p class="mut" style="margin:0 0 10px">Noch keine Medien. Füge Fotos, Videos oder Links hinzu, zum Beispiel eine Aufnahme deiner Technik.</p>';
 out+='<div class="row2" style="margin-bottom:6px"><button class="btn" style="flex:1" data-act="pickfile">'+ic('plus',18)+'Foto / Video</button><button class="btn" style="flex:1" data-act="sheet" data-s="link">'+ic('link',18)+'Link</button></div><input type="file" id="mediafile" accept="image/*,video/*" multiple hidden>'+
 '<p class="mut" style="margin:6px 0 0;font-size:12px">Fotos und Videos bleiben auf diesem Gerät. Lange Videos lieber als Link ablegen.</p>';
 if(sx&&sx.st&&sx.st.length)out+='<div class="sec">Ablauf</div><ol class="steps">'+sx.st.map(function(s){return '<li><span>'+esc(s)+'</span></li>'}).join('')+'</ol>'+(sx.cues?'<div class="sec">Technikhinweis</div><p style="margin:0;color:var(--ink-2)">'+esc(sx.cues)+'</p>':'');
 else out+='<div class="sec">Ablauf</div><p style="margin:0 0 10px;color:var(--ink-2)">Noch kein Ablauf hinterlegt. Schreibe die Schritte auf oder diktiere sie mit der Tastatur.</p>';
 out+='<button class="btn wide" style="margin-top:12px" data-act="sheet" data-s="steps">'+ic('plus',18)+(sx&&sx.st&&sx.st.length?'Ablauf bearbeiten':'Ablauf hinzufügen')+'</button></div>';
 return out;
}
function wizSummary(){
 var w=S.wiz,c=w.cat,defs={mechanisch:'3–4 × 6–12 · 1–2 RIR · 1,5–3 min Pause','neuronal-schwer':'3–6 × unter 6 · 1–3 RIR · über 3 min Pause','neuronal-schnell':'3–6 × unter 6 · weit weg vom Versagen · über 3 min Pause'};
 var where={push:'Ganzkörper A und B, Oberkörper (2×)',pull:'Ganzkörper A und B, Oberkörper (2×)',squat:'Ganzkörper A und B, Unterkörper (2×)',hinge:'Ganzkörper A und B, Unterkörper (2×)',schnell:'allen Einheiten, jeweils am Anfang',rumpf:'allen Einheiten, jeweils am Ende',assist:'am Ende der Einheit (optional)',haltung:'den Aufrichtungs-Einheiten A und B',huefte:'den Aufrichtungs-Einheiten A und B',mobil:'den Aufrichtungs-Einheiten A und B'}[c];
 var pat=SLOT[c].l+((c==='push'||c==='pull')?' · '+(w.dir==='horizontal'?'horizontal':'vertikal'):'');
 var aufr=AUFR_CATS.indexOf(c)>-1,rule=aufr?'2–3 × 8–15 oder 20–60 s · kontrolliert, ohne Muskelversagen · 20–45 s Pause':((c==='rumpf'||c==='assist')?'3 × 8–12 · 0–1 RIR · 30 s–1,5 min Pause':defs[w.focus]);
 return '<p><b>'+esc(w.name)+'</b> wird einsortiert als <b>'+pat+' · '+w.side+' · '+w.cx+'</b>.</p><p>Erscheint in: <b>'+where+'</b>.</p><p>Standardvorgabe: <b>'+(w.meas==='time'?'3 × 30–60 s Haltezeit':rule)+'</b>.</p><p>Reihenfolge: '+(w.cx==='komplex'?'vor isolierten Übungen':'nach den komplexen Übungen')+', '+(w.side==='unilateral'?'nach bilateralen.':'vor unilateralen.')+'</p>';
}
function chipsFor(f,vals,labels){return '<div class="chips">'+vals.map(function(v,i){return '<button class="chip" data-act="wz" data-f="'+f+'" data-v="'+v+'" aria-pressed="'+(S.wiz[f]===v)+'">'+(labels?labels[i]:v)+'</button>'}).join('')+'</div>'}
function sWizard(){
 var w=S.wiz;
 return '<div class="top-bar"><button class="iconbtn" data-act="back" aria-label="Abbrechen">'+ic('close',22)+'</button><span class="cnt">Neue Übung</span><span style="width:44px"></span></div><div class="pad">'+
 '<h1 class="h1" style="font-size:36px">Einordnen</h1><p class="sub">Die App schlägt die Position im Trainingsprinzip vor. Du bestätigst oder änderst.</p>'+
 '<div class="q"><small>Name</small><input class="inp" id="wizname" value="'+esc(w.name)+'" aria-label="Name der Übung"></div>'+
 '<div class="hint">'+ic('info',18)+'<span>'+S.wizHint+' Ändere die Antworten unten, falls es nicht passt.</span></div>'+
 '<div class="q"><small>Bewegungsmuster</small><div class="chips">'+ORDER.map(function(c){return '<button class="chip" data-act="wz" data-f="cat" data-v="'+c+'" aria-pressed="'+(w.cat===c)+'"><i class="dot" style="--c:var('+SLOT[c].c+')"></i>'+SLOT[c].l+'</button>'}).join('')+'</div></div>'+
 ((w.cat==='push'||w.cat==='pull')?'<div class="q"><small>Richtung</small>'+chipsFor('dir',['horizontal','schräg-vertikal','vertikal'],['Horizontal','Schräg','Vertikal'])+'</div>':'')+
 '<div class="q"><small>Seiten</small>'+chipsFor('side',['bilateral','unilateral'],['Beidseitig','Einseitig'])+'</div>'+
 '<div class="q"><small>Komplexität</small>'+chipsFor('cx',['komplex','isoliert'],['Mehrgelenkig','Isoliert'])+'</div>'+
 '<div class="q"><small>Equipment</small>'+chipsFor('eq',EQ_ALL)+'</div>'+
 '<div class="q"><small>Messung</small>'+chipsFor('meas',['reps','time'],['Wiederholungen','Haltezeit'])+'</div>'+
 '<div class="q"><small>Schwerpunkt</small>'+chipsFor('focus',['mechanisch','neuronal-schwer','neuronal-schnell'],['Muskelaufbau','Schwer','Schnell'])+'</div>'+
 '<div class="summary" id="wizsum"><div class="eyebrow" style="margin-bottom:4px">Ergebnis</div>'+wizSummary()+'</div>'+
 '<div class="row2"><button class="btn" style="flex:1" data-act="wizsave">Speichern</button><button class="btn primary" style="flex:1.4" data-act="wizadd">In heutigen Plan</button></div></div>';
}
function sLocs(){
 var ed=locById(S.editLoc)||curLoc(),isCur=ed.id===S.loc;
 return '<div class="sec" style="margin-top:0">Orte und Equipment</div>'+
 '<div class="fchips" style="margin-bottom:10px">'+S.locs.map(function(l){return '<button class="chip" data-act="editloc" data-v="'+l.id+'" aria-pressed="'+(l.id===ed.id)+'">'+(l.id===S.loc?ic('pin',14):'')+esc(l.name)+'</button>'}).join('')+'<button class="chip ex" data-act="newloc">'+ic('plus',14)+'Neuer Ort</button></div>'+
 '<div class="q" style="margin-bottom:10px"><small>Name des Orts</small><input class="inp" id="locname" value="'+esc(ed.name)+'" aria-label="Name des Orts"></div>'+
 '<div class="group">'+EQ_ALL.map(function(e){return '<button class="tg" data-act="tg" data-k="eq" data-v="'+e+'" aria-pressed="'+!!ed.eq[e]+'"><span>'+e+'</span><i class="sw"></i></button>'}).join('')+'</div>'+
 '<div class="row2" style="margin-top:10px">'+(isCur?'<span class="hint" style="flex:1;margin:0">'+ic('pin',18)+'<span>Aktueller Ort. Wird beim nächsten Öffnen wieder vorausgewählt.</span></span>':'<button class="btn" style="flex:1.4" data-act="useloc" data-v="'+ed.id+'">'+ic('pin',18)+'Hier trainieren</button>')+(S.locs.length>1?'<button class="btn" style="flex:1" data-act="delloc" data-v="'+ed.id+'">'+ic('trash',18)+'Löschen</button>':'')+'</div>';
}
function sMore(){
 return '<div class="pad"><h1 class="h1">Einstellungen</h1><p class="sub">Gilt für den Generator und den Plan.</p>'+
 sLocs()+
 '<div class="sec">Heute meiden</div><div class="chips" style="margin-bottom:6px">'+Object.keys(S.set.avoid).map(function(k){return '<button class="chip" data-act="tg" data-k="avoid" data-v="'+k+'" aria-pressed="'+!!S.set.avoid[k]+'">'+k+'</button>'}).join('')+'</div><p class="mut" style="margin:6px 0 0;font-size:13px">Der Generator schließt belastende Übungen aus, bis du die Markierung löschst.</p>'+
 '<div class="sec">Training</div><div class="field" style="margin-bottom:0"><small>Einheiten pro Woche</small><div class="seg">'+[2,3].map(function(n){return '<button data-act="perweek" data-v="'+n+'" aria-pressed="'+(S.set.perWeek===n)+'">'+n+' pro Woche</button>'}).join('')+'</div></div>'+
 '<div class="group" style="margin-top:10px"><button class="tg" data-act="tg" data-k="voice" data-v="x" aria-pressed="'+!!S.set.voice+'"><span>Spracheingabe<small>Befehle für den Tagesplan, nutzt die Spracherkennung des Browsers</small></span><i class="sw"></i></button></div>'+
 '<div class="sec">Daten</div><p class="mut" style="margin:0 0 8px;font-size:13px">'+S.hist.length+' Sätze gespeichert, nur auf diesem Gerät. Exportiere regelmäßig als Sicherung.</p><div class="row2"><button class="btn" style="flex:1" data-act="export" data-f="json">JSON</button><button class="btn" style="flex:1" data-act="export" data-f="csv">CSV</button><button class="btn" style="flex:1" data-act="import">Import</button></div><input type="file" id="importfile" accept=".json,application/json" hidden>'+
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
function sStart(){
 var ls=lastSession(),out='<div class="pad"><div class="eyebrow">'+new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})+'</div><h1 class="h1">Start</h1><p class="sub">Was steht heute an?</p>';
 if(ls){
  var nm=(TPL[ls.tpl]&&TPL[ls.tpl].name)||TYPES[ls.typ].name,dt=parseDay(ls.date).toLocaleDateString('de-DE',{weekday:'short',day:'numeric',month:'short'});
  out+='<div class="card"><div class="eyebrow">Letzte Einheit</div><h3 style="margin-top:4px">'+esc(nm)+'</h3><p class="cap">'+relDay(ls.date)+' · '+esc(dt)+(ls.loc?' · '+esc(ls.loc):'')+'</p>'+
  '<div class="kpis"><div><small>Übungen</small><b>'+ls.list.length+'</b></div><div><small>Sätze</small><b>'+ls.sets+'</b></div>'+(ls.ton>0?'<div><small>Volumen</small><b>'+fmt(ls.ton,0)+' kg</b></div>':'')+'</div>'+
  '<div class="chips" style="margin-bottom:10px"><span class="chip">'+ic('up',14)+'Mehr '+ls.cnt.m+'</span><span class="chip">'+ic('eq',14)+'Passt '+ls.cnt.p+'</span><span class="chip">'+ic('down',14)+'Weniger '+ls.cnt.w+'</span></div>'+
  '<div class="group">'+ls.list.slice(0,5).map(function(e){return '<div class="logrow"><span><b>'+esc(e.name)+'</b></span><span class="mut">'+exBest(e)+' · '+e.n+(e.n===1?' Satz':' Sätze')+'</span></div>'}).join('')+(ls.list.length>5?'<div class="logrow"><span class="mut">+ '+(ls.list.length-5)+' weitere Übungen</span></div>':'')+'</div></div>';
 }else{
  out+='<div class="card"><div class="eyebrow">Letzte Einheit</div><h3 style="margin-top:4px">Noch keine Einheit</h3><p class="cap" style="margin:0">Starte dein erstes Training. Danach siehst du hier eine kurze Zusammenfassung.</p></div>';
 }
 out+='<div class="sec" style="margin-top:6px">Wo trainierst du heute?</div><div class="group">'+S.locs.map(function(l){var on=l.id===S.loc;
  return '<button class="lrow" data-act="startloc" data-v="'+l.id+'" aria-pressed="'+on+'"><span class="radio">'+(on?ic('check',14):'')+'</span><span class="txt"><b>'+esc(l.name)+'</b><small>'+eqList(l).length+' Geräte</small></span></button>'}).join('')+'</div>'+
 '<button class="btn ghost" style="margin-top:8px;height:40px" data-act="manageloc">'+ic('more',16)+'Orte und Equipment verwalten</button>'+
 '<div class="sec">Welche Trainingsart?</div><div class="tsel">'+Object.keys(TYPES).map(function(t){var on=S.type===t;
  return '<button class="tcard" data-act="settype" data-v="'+t+'" aria-pressed="'+on+'"><span class="ti">'+ic(TYPES[t].icon,22)+'</span><b>'+TYPES[t].name+'</b><small>'+TYPES[t].sub+'</small></button>'}).join('')+'</div>'+
 '<div class="sec">Ohne Training</div><button class="btn wide" data-act="tab" data-t="stats">'+ic('chart',18)+'Übersicht und Statistik</button><p class="mut" style="margin:8px 0 0;font-size:12px">Öffnet die Auswertung. Es wird keine Einheit gestartet.</p></div>'+
 '<div class="cta"><button class="btn primary big" data-act="startplan">'+ic('play',18)+'Plan ansehen · '+esc(TPL[S.tpl].name)+'</button></div>';
 return out;
}
var SCREENS={start:sStart,heute:sHeute,train:sTrain,stats:sStats,lib:sLib,detail:sDetail,wizard:sWizard,more:sMore};

function tabbar(){
 var cur={start:'start',heute:'heute',train:'heute',stats:'stats',lib:'lib',detail:'lib',wizard:'lib',more:'more'}[S.screen];
 return [['start','home','Start'],['heute','today','Heute'],['lib','book','Bibliothek'],['stats','chart','Auswertung'],['more','more','Mehr']].map(function(t){return '<button class="tab" data-act="tab" data-t="'+t[0]+'" aria-current="'+(cur===t[0])+'"><i>'+ic(t[1],22)+'</i>'+t[2]+'</button>'}).join('');
}

/* ---------- Overlay ---------- */
var vtimer=null,REC=null;
/* ----- Plan-Aktionen (Tippen und Sprache nutzen dieselben Funktionen) ----- */
function exFromLib(name){var le=LIB.filter(function(x){return x.name===name})[0];if(!le)return null;return fromPool(le.cat,le.name)||P(le.name,le.eq,3,le.mode==='time'?'45 s':'8',90,le.sub,le.mode)}
function replaceAt(i,name,cat){var old=S.plan[i],pe=exFromLib(name);S.plan[i]=Object.assign({},old,pe,{cat:cat||old.cat,locked:false,grp:old.grp,rest:pe.rest,was:null,na:false});relabel()}
function diceAt(i){var p=S.plan[i],names=S.plan.map(function(x){return x.name}),c=POOL[p.cat].filter(function(x){return okEx(x,p.cat)&&names.indexOf(x.name)<0});
 if(!c.length){toast('Keine weitere Übung mit dem Equipment am Ort verfügbar');return false}
 var n=c[Math.floor(Math.random()*c.length)];S.plan[i]=Object.assign({},p,n,{locked:false,grp:p.grp,rest:n.rest,was:null,na:false});toast(p.name+' durch '+n.name+' ersetzt',true);return true}
function addEx(name){var le=LIB.filter(function(x){return x.name===name})[0],pe=exFromLib(name),at=S.plan.length,q;
 for(q=0;q<S.plan.length;q++){if(ORDER.indexOf(S.plan[q].cat)>ORDER.indexOf(le.cat)){at=q;break}}
 S.plan.splice(at,0,Object.assign({},pe,{cat:le.cat,locked:false,grp:'',rest:pe.rest,na:false,was:null}));relabel()}
function rerollAll(){var items=generatePlan(S.tpl);S.plan.forEach(function(p,i){if(p.locked&&items[i]&&items[i].cat===p.cat)items[i]=p});S.plan=items;relabel();toast('Plan neu gewürfelt',true)}
function wizHintText(c){return (c.known?'Vorschlag: <b>'+c.label+'</b>, '+esc(c.why)+'.':esc(c.why))+(c.similar?' Ähnlich zu <b>'+esc(c.similar.name)+'</b>.':'')}
function applyClass(name){var c=KT.classify(name,LIB);S.wiz={name:name,eq:c.eq,cat:c.cat,dir:c.dir||'horizontal',side:c.side,cx:c.cx,meas:c.meas,focus:c.focus};S.wizHint=wizHintText(c)}
function openWizard(name){applyClass(name||'');go('wizard',{keep:true})}

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
 out+='<h3>'+(sh.rec?'Ich höre zu':'Sprachbefehl')+'</h3><p>Sag zum Beispiel „Tausche Latzug gegen Klimmzug“, „Streiche Face Pull“ oder „Füge Hip Thrust hinzu“.</p>';
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
 if(sh.type==='tpl'){return '<h3>Einheit wechseln</h3><p>Der Plan wird neu zusammengestellt.</p><div class="group">'+Object.keys(TPL).filter(function(k){return TPL[k].type===S.type}).map(function(k){return '<button class="lrow" data-act="settpl" data-v="'+k+'" aria-pressed="'+(k===S.tpl)+'"><span class="radio">'+(k===S.tpl?ic('check',14):'')+'</span><span class="txt"><b>'+TPL[k].name+'</b><small>'+TPL[k].slots.map(function(c){return SLOT[c].l}).join(' · ')+'</small></span></button>'}).join('')+'</div>'}
 if(sh.type==='link'){return '<h3>Link hinzufügen</h3><p>YouTube, Instagram, Vimeo oder jede andere Adresse. Der Link öffnet im Browser.</p><div class="q"><small>Adresse</small><input class="inp" id="linkurl" type="url" inputmode="url" placeholder="https://…" autocomplete="off"></div><div class="q"><small>Titel (optional)</small><input class="inp" id="linktitle" placeholder="z. B. Technik von der Seite" autocomplete="off"></div><div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Abbrechen</button><button class="btn primary" style="flex:1.4" data-act="addlink">'+ic('plus',18)+'Hinzufügen</button></div>'}
 if(sh.type==='steps'){var sx=stepsOf(n)||{st:[],cues:''},ta='height:auto;padding:12px 14px;line-height:1.4;font-weight:500;font-size:15px';
  return '<h3>Ablauf bearbeiten</h3><p>'+esc(n)+'. Ein Schritt pro Zeile.</p><div class="q"><small>Ablauf</small><textarea class="inp" id="stepstext" rows="6" style="'+ta+'">'+esc(sx.st.join('\n'))+'</textarea></div><div class="q"><small>Technikhinweis</small><textarea class="inp" id="cuestext" rows="3" style="'+ta+'">'+esc(sx.cues||'')+'</textarea></div><div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Abbrechen</button><button class="btn primary" style="flex:1.4" data-act="savesteps">Speichern</button></div>'}
 var m=(S.media[n]||[])[sh.i];if(!m)return '<h3>Medium</h3><p>Nicht gefunden.</p>';
 out='<h3>'+esc(m.title||'Medium')+'</h3>';
 if(m.type==='image')out+='<img id="mview" data-mid="'+m.id+'" alt="'+esc(m.title||'Foto')+'" style="width:100%;border-radius:14px;margin:6px 0 12px;display:block">';
 else if(m.type==='video')out+='<video id="mview" data-mid="'+m.id+'" controls playsinline style="width:100%;border-radius:14px;margin:6px 0 12px;display:block;background:#000"></video>';
 else{var y=KT.media.ytId(m.url);out+='<p style="word-break:break-all">'+esc(m.url)+'</p>'+(y?'<img src="https://i.ytimg.com/vi/'+y+'/hqdefault.jpg" alt="" style="width:100%;border-radius:14px;margin:0 0 12px;display:block">':'')+'<a class="btn primary wide" style="text-decoration:none;margin-bottom:8px" href="'+esc(m.url)+'" target="_blank" rel="noopener noreferrer">'+ic('link',18)+'Öffnen</a>'}
 return out+'<div class="row2"><button class="btn" style="flex:1" data-act="sheetclose">Schließen</button><button class="btn" style="flex:1" data-act="delmedia" data-i="'+sh.i+'">'+ic('trash',18)+(sh.confirm?'Wirklich löschen?':'Löschen')+'</button></div>';
}
function overlay(){
 var out='';
 if(S.sheet){
  var sh=S.sheet;out+='<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>';
  if(sh.type==='voice'){out+=voiceSheet(sh)
  }else if(sh.type==='link'||sh.type==='steps'||sh.type==='media'||sh.type==='tpl'){out+=sheetExtra(sh)
  }else if(sh.type==='loc'){
   out+='<h3>Wo trainierst du?</h3><p>Die Übungen richten sich nach dem Equipment vor Ort. Deine Wahl bleibt als Standard gespeichert.</p><div class="group">'+S.locs.map(function(l){var on=l.id===S.loc,ls=eqList(l);
    return '<button class="lrow" data-act="pickloc" data-v="'+l.id+'" aria-pressed="'+on+'"><span class="radio">'+(on?ic('check',14):'')+'</span><span class="txt"><b>'+esc(l.name)+'</b><small>'+ls.length+' Geräte · '+esc(ls.filter(function(e){return e!=='Körpergewicht'}).join(', '))+'</small></span>'+(on?'<span class="badge">Zuletzt</span>':'')+'</button>'}).join('')+'</div>'+
   '<button class="btn wide" style="margin-top:10px" data-act="manageloc">'+ic('more',18)+'Orte und Equipment verwalten</button>';
  }else if(sh.type==='pick'){
   var p=S.plan[sh.i],names=S.plan.map(function(x){return x.name});
   out+='<h3>Ersetzen</h3><p>'+esc(p.name)+' · passende Übungen für '+SLOT[p.cat].l+' am Ort '+esc(curLoc().name)+'</p><div class="group">'+POOL[p.cat].filter(function(e){return eqOn(e.eq)&&names.indexOf(e.name)<0}).map(function(e){return '<button class="lrow" data-act="pickdo" data-i="'+sh.i+'" data-n="'+esc(e.name)+'"><span class="txt"><b>'+esc(e.name)+'</b><small>'+esc((e.sub?e.sub+' · ':'')+e.eq)+'</small></span>'+ic('plus',18)+'</button>'}).join('')+'</div>';
  }else if(sh.type==='add'){
   var nn=S.plan.map(function(x){return x.name});
   out+='<h3>Übung hinzufügen</h3><p>Sie wird passend zur Reihenfolge einsortiert.</p><div class="group">'+LIB.filter(function(e){return nn.indexOf(e.name)<0&&eqOn(e.eq)}).slice(0,60).map(function(e){return '<button class="lrow" data-act="adddo" data-n="'+esc(e.name)+'"><span class="txt">'+slotTag(e.cat)+'<b>'+esc(e.name)+'</b><small>'+esc((e.sub?e.sub+' · ':'')+e.eq)+'</small></span>'+ic('plus',18)+'</button>'}).join('')+'</div><button class="btn wide" style="margin-top:10px" data-act="go" data-s="wizard">'+ic('plus',18)+'Neue Übung anlegen</button>';
  }
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
 bindCharts();hydrateMedia();
 saveLocs();
 var jk=jumpKey();document.querySelectorAll('#jump button').forEach(function(b){b.setAttribute('aria-current',String(b.getAttribute('data-j')===jk))});
 if(scrollKey!==S.screen){sc.scrollTop=0;scrollKey=S.screen}
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
 if(s==='wizard'&&!o.keep){S.wiz={name:'',eq:'Langhantel',cat:'push',dir:'horizontal',side:'bilateral',cx:'komplex',meas:'reps',focus:'mechanisch'};S.wizHint='Gib einen Namen ein, dann schlage ich die Einordnung vor.'}
 if(s==='train'){
  S.tr={i:o.i||0,set:o.set||1,phase:'input',log:o.log||[],over:o.over||null,rest:0,restTot:0,kg:0,reps:8,rir:1,sec:0,running:false};
  resetInputs();
 }
 render();
}
function startRest(){
 var ex=curEx();S.tr.phase='rest';S.tr.rest=ex.rest;S.tr.restTot=ex.rest;render();
 S.tmr=setInterval(function(){
  S.tr.rest--;var n=$('#restn'),c=$('#ringc');
  if(n)n.textContent=mmss(Math.max(0,S.tr.rest));if(c)c.setAttribute('stroke-dashoffset',(502.65*(1-Math.max(0,S.tr.rest)/S.tr.restTot)).toFixed(1));
  if(S.tr.rest<=0){endRest()}
 },1000);
}
function endRest(){clearInterval(S.tmr);S.tmr=null;S.tr.set++;S.tr.phase='input';render()}
function applyRating(r){
 var t=S.tr,ex=curEx(),rf=getRef(ex.name),time=ex.mode==='time';
 t.log.push({kg:t.kg,reps:t.reps,sec:t.sec,rir:t.rir,r:r});
 var now=new Date(),ds=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
 S.hist.push({typ:S.type,tpl:S.tpl,date:ds,time:now.toTimeString().slice(0,5),loc:curLoc().name,name:ex.name,cat:ex.cat,set:t.set,kg:time?0:t.kg,reps:time?0:t.reps,sec:time?t.sec:0,rir:time?null:t.rir,r:r});saveLocs();
 var d=time?(r==='m'?5:(r==='w'?-5:0)):(r==='m'?rf.step:(r==='w'?-rf.step:0));
 if(time)t.sec=Math.max(0,t.sec+d);else t.kg=Math.max(0,t.kg+d);
 if(t.set>=ex.sets){t.phase='done';render()}else startRest();
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
  case 'go':go(d.s,{n:d.n});break;
  case 'back':if(S.prev==='train'&&S.tr&&S.screen==='detail'){S.screen='train';S.prev='heute';render()}else go(S.prev&&S.prev!=='detail'&&S.prev!=='wizard'?S.prev:'lib');break;
  case 'exp':S.exp=S.exp===+d.i?-1:+d.i;render();break;
  case 'dice':{snap();diceAt(+d.i);render();break}
  case 'pick':S.sheet={type:'pick',i:+d.i};render();break;
  case 'pickdo':{var pp=S.plan[+d.i],ne=fromPool(pp.cat,d.n);snap();S.plan[+d.i]=Object.assign({},pp,ne,{locked:false,grp:pp.grp,rest:ne.rest,was:null,na:false});S.sheet=null;toast(pp.name+' durch '+ne.name+' ersetzt',true);render();break}
  case 'lock':S.plan[+d.i].locked=!S.plan[+d.i].locked;render();break;
  case 'del':{snap();var gone=S.plan.splice(+d.i,1)[0];S.exp=-1;relabel();toast(gone.name+' gestrichen',true);render();break}
  case 'sheet':S.sheet={type:d.s};render();break;
  case 'sheetclose':stopTimers();stopRec();S.sheet=null;render();break;
  case 'adddo':{var le=LIB.filter(function(x){return x.name===d.n})[0],pe=fromPool(le.cat,le.name)||P(le.name,le.eq,3,'8',90,le.sub,le.mode);snap();
   var obj=Object.assign({},pe,{cat:le.cat,locked:false,grp:'',rest:pe.rest}),at=S.plan.length;for(var q=0;q<S.plan.length;q++){if(ORDER.indexOf(S.plan[q].cat)>ORDER.indexOf(le.cat)){at=q;break}}
   S.plan.splice(at,0,obj);relabel();S.sheet=null;toast(le.name+' zum Plan hinzugefügt',true);render();break}
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
  case 'start':go('train',{i:0,set:1});break;
  case 'adj':{var t=S.tr;if(d.f==='kg')t.kg=Math.max(0,Math.round((t.kg+(+d.d))*10)/10);else if(d.f==='reps')t.reps=Math.max(1,t.reps+(+d.d));else if(d.f==='sec')t.sec=Math.max(0,t.sec+(+d.d));render();break}
  case 'rir':S.tr.rir=+d.v;render();break;
  case 'sw':{var tt=S.tr;tt.running=!tt.running;if(tt.running){S.tmr=setInterval(function(){tt.sec++;var el=$('#secv');if(el)el.textContent=mmss(tt.sec)},1000)}else{clearInterval(S.tmr);S.tmr=null}render();break}
  case 'done':stopTimers();S.tr.running=false;S.tr.phase='rate';render();break;
  case 'rate':applyRating(d.r);break;
  case 'skiprest':endRest();break;
  case 'exnav':{var ni=(S.tr.over?S.plan.length-1:S.tr.i)+(+d.d);if(ni<0||ni>=S.plan.length)break;go('train',{i:ni,set:1});break}
  case 'nextex':{if(S.tr.over||S.tr.i+1>=S.plan.length){go('start');toast('Einheit abgeschlossen. Gut gemacht.');render()}else go('train',{i:S.tr.i+1,set:1});break}
  case 'range':S.stats.range=+d.r;render();break;
  case 'sub':S.stats.sub=d.v;render();break;
  case 'selex':S.stats.ex=d.n;render();break;
  case 'tbl':S.stats.table=!S.stats.table;render();break;
  case 'libcat':S.lib.cat=d.c;render();break;
  case 'open':go('detail',{n:d.n});break;
  case 'wz':S.wiz[d.f]=d.v;render();break;
  case 'wizsave':{if(!S.wiz.name.trim()){toast('Bitte einen Namen eingeben');render();break}var wz=S.wiz,cu={name:wz.name,cat:wz.cat,eq:wz.eq,sets:3,reps:wz.meas==='time'?'45 s':'8',rest:90,sub:wz.side+' · '+wz.cx,mode:wz.meas};if(!S.custom.some(function(x){return x.name===cu.name})){S.custom.push(cu);addCustom(cu)}saveLocs()}
   S.sheet=null;go('lib');toast(S.wiz.name+' gespeichert. Taucht ab jetzt im Generator auf.');render();break;
  case 'wizadd':{if(!S.wiz.name.trim()){toast('Bitte einen Namen eingeben');render();break}var w=S.wiz,cu2={name:w.name,cat:w.cat,eq:w.eq,sets:3,reps:w.meas==='time'?'45 s':'8',rest:90,sub:w.side+' · '+w.cx,mode:w.meas};if(!S.custom.some(function(x){return x.name===cu2.name})){S.custom.push(cu2);addCustom(cu2)}var pe2=P(w.name,w.eq,3,w.meas==='time'?'45 s':'8',90,w.side+' · '+w.cx,w.meas);snap();S.plan.splice((function(){for(var q=0;q<S.plan.length;q++){if(ORDER.indexOf(S.plan[q].cat)>ORDER.indexOf(w.cat))return q}return S.plan.length})(),0,Object.assign({},pe2,{cat:w.cat,locked:false,grp:'',rest:90}));relabel();go('heute');toast(w.name+' zum heutigen Plan hinzugefügt',true);render();break}
  case 'export':{var blob,fn,stamp=new Date().toISOString().slice(0,10);
   if(d.f==='json'){blob=new Blob([JSON.stringify({v:2,locs:S.locs,loc:S.loc,plan:S.plan,set:S.set,hist:S.hist,custom:S.custom,media:S.media,stepsX:S.stepsX},null,2)],{type:'application/json'});fn='krafttraining-'+stamp+'.json'}
   else{var q=function(v){v=v==null?'':String(v);return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
    var rows=[['Datum','Uhrzeit','Ort','Übung','Muster','Satz','kg','Wdh','Sekunden','RIR','Bewertung','Art']].concat(S.hist.map(function(h){return [h.date,h.time,h.loc,h.name,SLOT[h.cat]?SLOT[h.cat].l:h.cat,h.set,h.kg?String(h.kg).replace('.',','):'',h.reps||'',h.sec||'',h.rir==null?'':h.rir,h.r==='m'?'Mehr':(h.r==='w'?'Weniger':'Passt'),TYPES[typOf(h)].name]}));
    blob=new Blob(['\ufeff'+rows.map(function(r){return r.map(q).join(';')}).join('\r\n')],{type:'text/csv'});fn='krafttraining-'+stamp+'.csv'}
   var a2=document.createElement('a');a2.href=URL.createObjectURL(blob);a2.download=fn;document.body.appendChild(a2);a2.click();setTimeout(function(){URL.revokeObjectURL(a2.href);a2.remove()},500);toast(fn+' gespeichert');render();break}
  case 'import':{var fi=$('#importfile');if(fi)fi.click();break}
  case 'pickloc':S.sheet=null;if(d.v!==S.loc)setLoc(d.v);render();break;
  case 'startloc':if(d.v!==S.loc)setLoc(d.v);render();break;
  case 'settype':setType(d.v);render();break;
  case 'startplan':go('heute');break;
  case 'manageloc':S.editLoc=S.loc;go('more');break;
  case 'editloc':S.editLoc=d.v;render();break;
  case 'useloc':setLoc(d.v);render();break;
  case 'newloc':{var nid='ort'+Date.now();S.locs.push({id:nid,name:'Neuer Ort',eq:{'Körpergewicht':1}});S.editLoc=nid;saveLocs();render();var ni=$('#locname');if(ni){ni.focus();ni.select()}break}
  case 'delloc':{if(S.locs.length<2)break;var dl=locById(d.v);S.locs=S.locs.filter(function(l){return l.id!==d.v});S.editLoc=null;if(S.loc===d.v){S.loc=S.locs[0].id;adaptPlan()}saveLocs();toast(dl.name+' gelöscht');render();break}
  case 'tg':{if(d.k==='eq'){var el=locById(S.editLoc)||curLoc();el.eq[d.v]=el.eq[d.v]?0:1;saveLocs();if(el.id===S.loc){var ar=adaptPlan();if(ar.changed)toast(ar.changed+' Übung'+(ar.changed>1?'en':'')+' im heutigen Plan angepasst')}}else if(d.k==='avoid'){S.set.avoid[d.v]=S.set.avoid[d.v]?0:1;saveLocs();var ar2=adaptPlan();if(ar2.changed)toast(ar2.changed+' Übung'+(ar2.changed>1?'en':'')+' im Plan angepasst')}else S.set.voice=!S.set.voice;render();break}
  case 'perweek':S.set.perWeek=+d.v;render();break;
 }
});
function relabel(){var n=0,prevCat=null,hasS=S.plan.some(function(x){return x.cat==='schnell'}),LET=hasS?'BCDEFGHIJ':'ABCDEFGHIJ';S.plan.forEach(function(p,i){
 if(p.cat==='schnell'){p.grp=n===0?'A1':'A2';n++}
 else{var L=LET[Math.max(0,i-(S.plan.filter(function(x,k){return k<i&&x.cat==='schnell'}).length)-0)];p.grp=L||'X'}
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
});
document.addEventListener('change',function(e){
 if(e.target.id==='wizname'){var nm=e.target.value.trim();if(nm){applyClass(nm);render()}return}
 if(e.target.id==='mediafile'){addMediaFiles(e.target.files);e.target.value='';return}
 if(e.target.id!=='importfile'||!e.target.files[0])return;
 var rd=new FileReader();rd.onload=function(){try{var dd=JSON.parse(rd.result);if(!dd||!dd.locs)throw 0;applyData(dd);adaptPlan();relabel();saveLocs();toast('Import abgeschlossen')}catch(err){toast('Datei konnte nicht gelesen werden')}render()};rd.readAsText(e.target.files[0]);
});
document.addEventListener('input',function(e){
 if(e.target.id==='locname'){var le2=locById(S.editLoc)||curLoc();le2.name=e.target.value||'Ort';saveLocs();document.querySelectorAll('[data-act="editloc"][aria-pressed="true"]').forEach(function(b){b.innerHTML=(le2.id===S.loc?ic('pin',14):'')+esc(le2.name)})}
 if(e.target.id==='libq'){S.lib.q=e.target.value;$('#liblist').innerHTML=libList()}
 if(e.target.id==='vinput'&&S.sheet)S.sheet.typed=e.target.value;
 if(e.target.id==='wizname'){S.wiz.name=e.target.value||'Neue Übung';var s=$('#wizsum');if(s)s.innerHTML='<div class="eyebrow" style="margin-bottom:4px">Ergebnis</div>'+wizSummary()}
});

/* Sprungleiste */
if($('#jump'))$('#jump').innerHTML=JUMPS.map(function(j){return '<button data-j="'+j[0]+'">'+j[1]+'</button>'}).join('');
relabel();render();
})();
