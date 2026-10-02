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
