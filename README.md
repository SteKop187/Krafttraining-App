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
