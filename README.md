# Krafttraining-App (PWA)

## Dateien
- `index.html`, `styles.css`, `app.js` – die App
- `kt-voice.js` (Sprachbefehle), `kt-classify.js` (Einordnung neuer Übungen), `kt-stats.js` (Auswertung), `kt-media.js` (Fotos, Videos, Links)
- `manifest.webmanifest`, `sw.js`, `icons/` – Installation und Offline-Betrieb

## Starten
Eine PWA lässt sich nur über **https** (oder `localhost`) installieren. Ein Doppelklick auf `index.html` öffnet die App zwar, aber ohne Installation und Offline-Modus.

**Am PC testen:** `Start-lokal.bat` doppelklicken (braucht Python), dann http://localhost:8080 im Browser öffnen.

**Aufs Handy bringen:** den Ordnerinhalt auf einen https-Webspace laden, z. B. GitHub Pages, Netlify (Ordner per Drag & Drop auf app.netlify.com/drop) oder den Webserver des OSP. Dann die Adresse am Handy öffnen:
- iPhone (Safari): Teilen → „Zum Home-Bildschirm“
- Android (Chrome): Menü → „App installieren“

## Daten
Orte, Equipment, Plan und alle geloggten Sätze werden nur auf dem jeweiligen Gerät im Browser gespeichert. Unter **Mehr → Daten** als JSON (Sicherung, wieder importierbar) oder CSV (Excel) exportieren.
Die Auswertung zeigt deine echten Sätze. Solange noch nichts geloggt ist, lassen sich Beispieldaten ansehen (klar gekennzeichnet).
Fotos und Videos aus der Bibliothek liegen nur auf dem jeweiligen Gerät (IndexedDB) und sind nicht im Export; Links, Abläufe und alle Sätze sind enthalten.

## Updates
Nach Änderungen in `sw.js` die Zeile `var VERSION = 'krafttraining-v1'` hochzählen (v2, v3 …), damit installierte Apps die neue Fassung laden.


## Startbildschirm und Trainingsarten
Die App öffnet auf dem Startbildschirm: Zusammenfassung der letzten Einheit, Wahl des Trainingsorts, Wahl der Trainingsart (Krafttraining oder Aufrichtung) und ein Button zur Statistik ohne neues Training. Aufrichtung hat eigene Einheiten (Aufrichtung A/B) mit Haltung, Hüfte und Mobilisation.

Bei den Orten stehen die drei zuletzt genutzten vorn, weitere liegen unter „Weitere Orte“. Unter **Mehr → Trainingsarten** (auch über „Trainingsarten verwalten“ am Start erreichbar) lassen sich eigene Trainingsarten anlegen: ein Name und die Bewegungsmuster, aus denen die Einheit besteht.

## Maschinen
Bei **Mehr → Orte und Equipment** hat „Maschine“ Unterkategorien (Beinpresse, Beinbeuger, Beinstrecker, Brustpresse, Wadenmaschine). Je Ort lässt sich einstellen, welche Maschinen vorhanden sind; eigene Maschinen lassen sich beliebig anlegen. Eine Übung an einer Maschine erscheint nur dort, wo genau diese Maschine eingeschaltet ist. Beim Anlegen einer eigenen Übung (Equipment „Maschine“) wählst du die zugehörige Maschine.

## Satzfortschritt im Training
In der Übungsliste steht bei begonnenen Übungen, wie viele Sätze schon erledigt und wie viele offen sind (z. B. „1 von 3 Sätzen · 2 offen“). Übungen mit allen Sätzen sind erledigt und stehen gesammelt unter „Abgeschlossen“; in der Liste bleiben nur die offenen. Gezählt werden die heute geloggten Sätze.

## Training läuft (ab 3.3.0)
- Die Übungsübersicht bleibt die Basis des Trainings. Jede Übung hat einen Start-Knopf; nach „Satz abschließen“ und der Bewertung geht es zurück in die Übersicht, die Pause läuft dort als Anzeige weiter.
- Übungen lassen sich jederzeit hinzufügen, ersetzen, würfeln, verschieben (Nach oben/unten) und streichen, auch aus der laufenden Übung heraus (Menü „…“ oben rechts). „Training abschließen“ geht jederzeit und zeigt eine Zusammenfassung.
- Hinzufügen und Ersetzen: Suchfeld, „Neu“ direkt daneben, Bibliothek nach Oberkategorien einklappbar. Neue Übungen lassen sich frei anlegen, mit Ablauf, Technikhinweis, Fotos, Videos und Links.
- Übungen können mehrere Geräte haben (z. B. Kurzhantel oder Kettlebell); im Training wählst du das Gerät. Kurzhantel und Kettlebell stellen das Gewicht in 0,5-kg-Schritten ein.
- Zeit-Übungen zählen von der Zielzeit herunter. Bei beidseitigen Übungen (z. B. Seitstütz) gibt es je Seite einen Durchgang („Seite 1 von 2“), erst danach ist „Satz abschließen“ frei.

## Plan im Krafttraining
Erwärmung (Cardio-Gerät nach Verfügbarkeit am Ort, beliebig erweiterbar, sonst „Allgemeines Aufwärmen“), Schnellkraft, Hauptübungen, Rumpf seitlich und gerade (je 2 Sätze), Zusatz: AS-Prävention (exzentrisches Wadenheben, 3 × 8–12) und Handstand-Vorbereitung. Zusatz hat außerdem die Gruppe Schulterstabilität (wählbar). Cardio-Geräte stellst du je Ort bei Mehr → Orte und Equipment ein.

## Neu in 3.7.0
- **Neue Bereichsfarben nach den Workshop-Folien:** Schnell dunkelgrau, Squat kräftiges Dunkelblau, Drücken Orange-Rot, Hinge Cyan, Ziehen Amber, Rumpf und Assistenz hellgrau, Erwärmung Pink. Jede Übung hat links einen breiten Farbstreifen und ein getöntes Etikett mit dem Bereichsnamen. Alle Schriften erreichen mindestens 4,5:1 Kontrast, im hellen und im dunklen Modus.
- **Prävention · Reha (rot) und Spezial (grün):** „Zusatz“ heißt jetzt „Spezial“ (z. B. Handstand, grün). Achillessehnen-Prävention und Schulterstabilität laufen als „Prävention · Reha“ in kräftigem Rot. Aufrichtung ist jetzt violett.
- **Gliederung des Plans im Krafttraining:** 1 Vorbereitung (Erwärmung, Schnell), 2 Hauptteil (Squat, Hinge, Drücken, Ziehen) auf einer getönten Fläche mit dicker Linie oben und unten, 3 Ergänzung (Rumpf, Assistenz, Spezial, Prävention · Reha). Übungen lassen sich nur innerhalb ihres Teils nach oben oder unten schieben.
- **Training:** Der Kopf der Übung ist ein farbiges Band mit Bereichsname, Übungsname und Satz-Streifen; „Satz abschließen“ trägt dieselbe Farbe.

## Neu in 3.6.0
- **Sätze hinzufügen:** In der Übung gibt es „Satz hinzufügen“ (jederzeit, auch nach dem letzten Satz). Auch bei einer abgeschlossenen Übung, die du unter „Abgeschlossen“ wieder öffnest, kannst du einen weiteren Satz anhängen.
- **Übung vorzeitig abschließen:** „Übung abschließen“ beendet eine Übung, auch wenn nicht alle geplanten Sätze gemacht sind (ab dem ersten geloggten Satz). Sie steht dann unter „Abgeschlossen“ mit dem Hinweis „vorzeitig beendet“ und zählt in der Zusammenfassung als erledigt.
- **Startseite:** Der Knopf „Plan ansehen“ ist weg. Stattdessen öffnet ein Tipp auf die Karte „Letzte Einheit“ (mit dem Hinweis „Plan-Vorschau“) den Plan mit allen Funktionen (Würfeln, Ersetzen, Behalten, Verschieben, Bearbeiten, Streichen).

## Neu in 3.5.0
- **Gesamttimer:** Sobald du die erste Übung öffnest, läuft oben die Gesamtdauer des Trainings mit, bis du „Training beenden“ wählst. Daneben läuft weiter die Zeit seit dem letzten Satz.
- **Signaltöne bei Zeit-Übungen:** kurzer Piep bei 10 Sekunden Rest, je ein Piep bei 3, 2 und 1, langer Ton, wenn die Zeit abgelaufen ist (nur bei geöffneter App und eingeschaltetem Medienton).
- **Startseite:** läuft schon ein Training, zeigt sie die Karte „Training läuft“ mit „Training fortsetzen“.
- **Zurück-Taste:** der Schutzeintrag im Verlauf entsteht erst nach dem ersten Tippen, weil Chrome ihn sonst überspringt (vermutete Ursache des schwarzen Bildschirms).

## Neu in 3.4.2
- **Aufgeräumte Startseite:** oben Datum, darunter die Karte „Letzte Einheit“ mit Name, Tag, Ort, Übungen, Sätzen und Volumen (ohne Einzelübungen), darunter die Karte „Nächstes Training“ mit den Knöpfen „Nächstes Training einrichten“ und „Plan ansehen“. Ort und Trainingsart wählst du jetzt beim Einrichten.

## Neu in 3.4.1
- **Android-Zurück-Taste:** „Zurück“ geht in der App eine Seite zurück (erst offene Fenster schließen, dann Übung, Training, Tabs bis zum Start). Auf dem Start beendet ein zweiter Druck die App.

## Neu in 3.4.0
- **Heutiges Training einrichten** (Startseite): eine Seite mit Ort, Trainingsart, Einheit und Ein/Aus-Schaltern für die Bestandteile (Cardio-Gerät, Achillessehnen-Prävention, Handstand-Vorbereitung, Schulterstabilität, Aufrichtung). Die Allgemeine Erwärmung ist immer dabei. Die Wahl bleibt als Standard gespeichert.
- **Erwärmung:** zwei feste Plätze, Cardio-Gerät und Allgemeine Erwärmung. Der Timer läuft hoch, am Ende trägst du die Messgröße des Geräts ein (Meter, km, Kalorien, Watt oder Herzfrequenz, je Übung wählbar). Beim nächsten Mal siehst du die Zeit und den Wert vom letzten Mal und den Durchschnitt aller Erwärmungszeiten.
- **Timer:** oben läuft die Zeit seit dem letzten Satz hoch, ohne Countdown.
- **Bewertung:** „Passt“ geht sofort weiter. Bei „Mehr“ oder „Weniger“ wählst du, um wie viel es beim nächsten Satz geht (Kurzhantel und Kettlebell in 0,5-kg-Schritten, sonst 1 bis 10 kg, bei Zeit 5 bis 30 s).
- **Erledigte Sätze ansehen:** die Satz-Streifen oben sind antippbar und zeigen Gewicht, Wiederholungen und Bewertung.
- **Bearbeiten und Katalog:** jede Übung lässt sich bearbeiten (Titel, Seiten, alle Eigenschaften, der Verlauf zieht mit) und aus dem Katalog löschen; gelöschte Übungen stehen unter Mehr zum Wiederherstellen.
- **Deutsch/Englisch:** Schalter oben rechts. Die ganze Oberfläche und die Übungsnamen sind übersetzt, Fachbegriffe wie Hinge bleiben. Für eigene Übungen gibt es ein Feld „Englischer Name“ mit Vorschlag aus einem Fachwörterbuch. Sprachbefehle verstehen weiterhin nur Deutsch.