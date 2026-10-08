/* Wörterbuch Deutsch -> Englisch für die Oberfläche (siehe kt-i18n.js).
   Übersetzt wird nur, wo es im Englischen einen üblichen Begriff gibt. Fachbegriffe wie Hinge oder Split Squat bleiben. */
(function () {
  "use strict";
  var KT = window.KT = window.KT || {};
  if (!KT.i18n) return;

  var X = {
    /* Einrichtung */
    'Heutiges Training': "Today's workout", 'Wähle Ort, Trainingsart und die Bestandteile. Alles lässt sich danach im Plan noch ändern.': 'Choose location, training type and the components. You can still change everything in the plan afterwards.',
    'Welche Einheit?': 'Which session?', 'Bestandteile': 'Components', 'Cardio-Gerät zur Erwärmung': 'Cardio machine for the warm-up', 'Kein Cardio-Gerät am Ort eingeschaltet': 'No cardio machine switched on at this location',
    'immer dabei': 'always included', 'Immer': 'Always', 'Achillessehnen-Prävention': 'Achilles tendon prevention', 'Wadenheben exzentrisch, einbeinig': 'Eccentric calf raise, single-leg',
    'Schulter, Handgelenke, Körperspannung': 'Shoulders, wrists, body tension', 'Eine Übung für Haltung, Hüfte oder Mobilisation': 'One exercise for posture, hip or mobility',
    'Heute sind schon Sätze geloggt. Der Plan wird neu zusammengestellt, die geloggten Sätze bleiben im Verlauf.': 'Sets have already been logged today. The plan will be rebuilt, the logged sets stay in your history.',
    'Plan erstellen': 'Create plan', 'Plan ansehen': 'View plan',
    /* Navigation und Meldungen */
    /* Navigation */
    'Start': 'Start', 'Heute': 'Today', 'Bibliothek': 'Library', 'Auswertung': 'Stats', 'Mehr': 'More', 'Hauptnavigation': 'Main navigation',
    'Version der App': 'App version', 'Sprache wechseln / Switch language': 'Switch language',
    /* Startbildschirm */
    'Was steht heute an?': "What's on today?", 'Letzte Einheit': 'Last session', 'Noch keine Einheit': 'No session yet',
    'Starte dein erstes Training. Danach siehst du hier eine kurze Zusammenfassung.': 'Start your first workout. A short summary will show up here afterwards.',
    'Übungen': 'Exercises', 'Sätze': 'Sets', 'Volumen': 'Volume', 'Wo trainierst du heute?': 'Where are you training today?', 'Welche Trainingsart?': 'Which type of training?',
    'Orte und Equipment verwalten': 'Manage locations and equipment', 'Trainingsarten verwalten': 'Manage training types', 'Ohne Training': 'Without training', 'Übersicht und Statistik': 'Overview and stats',
    'Öffnet die Auswertung. Es wird keine Einheit gestartet.': 'Opens the stats. No session is started.', 'Krafttraining': 'Strength training', 'Aufrichtung': 'Posture',
    'Ganzkörper-, Unter- und Oberkörpereinheiten': 'Full body, lower body and upper body sessions', 'Haltung, Hüfte und Mobilisation': 'Posture, hip and mobility',
    'Tippen zum Anzeigen': 'Tap to show', 'Tippen zum Auswählen': 'Tap to choose', 'Tippen zum Einklappen': 'Tap to collapse',
    'Heutiges Training einrichten': "Set up today's workout", 'heute': 'today', 'gestern': 'yesterday',
    /* Übersicht (Heute) */
    'Behalten': 'Keep', 'Würfeln': 'Reroll', 'Ersetzen': 'Replace', 'Nach oben': 'Move up', 'Nach unten': 'Move down', 'Streichen': 'Remove', 'Bearbeiten': 'Edit',
    'Übung hinzufügen': 'Add exercise', 'Alles neu würfeln': 'Reroll everything', 'Einheit wechseln': 'Change session', 'Training abschließen': 'Finish workout', 'Training fortsetzen': 'Continue workout', 'Training starten': 'Start workout',
    'Training abgeschlossen': 'Workout finished', 'Gut gemacht': 'Well done', 'Training läuft': 'Workout running', 'Jederzeit möglich, auch wenn noch Übungen oder Sätze offen sind.': 'Possible any time, even if exercises or sets are still open.',
    'Erledigt': 'Done', 'Seit dem letzten Satz': 'Since last set', 'wechseln': 'change', 'Plan per Sprache ändern': 'Change plan by voice', 'Trainingsort wechseln': 'Change training location',
    'Supersatz': 'Superset', 'abwechselnd': 'alternating', 'Plan neu gewürfelt': 'Plan rerolled', 'Rückgängig': 'Undo',
    'Gut gemacht. Unten findest du sie unter „Abgeschlossen“.': 'Well done. You can find them below under "Completed".',
    'Timer läuft hoch': 'Timer counts up', 'Sie bleiben im heutigen Plan. Ein weiteres Training am selben Tag setzt dort fort.': "They stay in today's plan. Another workout on the same day continues there.",
    'Zum Start': 'To start', 'Zurück zum Plan': 'Back to plan', 'Übersprungen oder offen': 'Skipped or open',
    /* Muster, Gruppen, Vorlagen */
    'Drücken': 'Push', 'Ziehen': 'Pull', 'Rumpf': 'Core', 'Assistenz': 'Assistance', 'Zusatz': 'Extra', 'Schnell': 'Power', 'Haltung': 'Posture', 'Hüfte': 'Hip', 'Mobilisation': 'Mobility', 'Erwärmung': 'Warm-up',
    'seitlich': 'lateral', 'gerade': 'straight', 'allgemein': 'general', 'AS-Prävention': 'Achilles prevention', 'Handstand-Vorbereitung': 'Handstand prep', 'Schulterstabilität': 'Shoulder stability',
    'Erwärmung Cardio': 'Warm-up cardio', 'Erwärmung allgemein': 'Warm-up general', 'Rumpf seitlich': 'Core lateral', 'Rumpf gerade': 'Core straight', 'Rumpf Rotation': 'Core rotation',
    'Zusatz AS-Prävention': 'Extra Achilles prevention', 'Zusatz Handstand-Vorbereitung': 'Extra handstand prep', 'Zusatz Schulterstabilität': 'Extra shoulder stability',
    'Ganzkörper A': 'Full body A', 'Ganzkörper B': 'Full body B', 'Unterkörper': 'Lower body', 'Oberkörper': 'Upper body', 'Aufrichtung A': 'Posture A', 'Aufrichtung B': 'Posture B',
    'Gelöschte Trainingsart': 'Deleted training type', 'wächst mit dir': 'grows with you', 'Eigene Trainingsart': 'Custom training type',
    /* Gelenke, Equipment, Messgrößen */
    'Schulter': 'Shoulder', 'Knie': 'Knee', 'Rücken': 'Back', 'Ellbogen': 'Elbow', 'Handgelenk': 'Wrist',
    'Körpergewicht': 'Bodyweight', 'Langhantel': 'Barbell', 'Kurzhantel': 'Dumbbell', 'Maschine': 'Machine', 'Seilzug': 'Cable', 'Medizinball': 'Medicine ball', 'Wadenmaschine': 'Calf machine',
    'Meter': 'Meters', 'Kilometer': 'Kilometers', 'Kalorien': 'Calories', 'Watt': 'Watts', 'Herzfrequenz': 'Heart rate',
    /* Beschreibungen der Übungen (Bausteine) */
    'Wurf': 'Throw', 'Sprung': 'Jump', 'Gewichtheben': 'Weightlifting', 'komplex': 'compound', 'isoliert': 'isolation', 'ballistisch': 'ballistic', 'vertikal': 'vertical',
    'stabilisieren': 'stabilizing', 'bewegen': 'moving', 'Seitneige': 'Lateral flexion', 'Beugung': 'Flexion', 'Waden': 'Calves', 'Arme': 'Arms', 'Rumpf gerade': 'Straight core',
    'Gesäß': 'Glutes', 'Dehnung': 'Stretch', 'Wirbelsäule': 'Spine', 'Brustwirbelsäule': 'Thoracic spine', 'Rückenstrecker': 'Back extensors', 'Gehen, Mobilisieren': 'Walking, mobilizing',
    'Außenrotation': 'External rotation', 'Rotatorenmanschette': 'Rotator cuff', 'Schulterblattkontrolle': 'Scapular control', 'Körperspannung': 'Body tension', 'Handgelenke': 'Wrists',
    'Schulterblatt hochschieben': 'Scapular elevation', 'Arm-Rumpf-Winkel öffnen': 'Opening the arm-torso angle', 'exzentrisch': 'eccentric', 'einbeinig': 'single-leg', 'isometrisch': 'isometric',
    'Schulterblatt': 'Scapula', 'neu': 'new', 'Cardio · Airbike': 'Cardio · Airbike',
    /* Training */
    'Zur Übersicht': 'Back to overview', 'Vorige Übung': 'Previous exercise', 'Nächste Übung': 'Next exercise', 'Weitere Aktionen': 'More actions', 'alles erledigt': 'all done',
    'Wie war der Satz?': 'How was the set?', 'nächstes Mal': 'next time', 'so lassen': 'keep as is', 'Weniger': 'Less', 'Passt': 'Just right',
    'Wie viel mehr beim nächsten Satz?': 'How much more for the next set?', 'Wie viel weniger beim nächsten Satz?': 'How much less for the next set?', 'Zurück zur Bewertung': 'Back to rating',
    'Satz abschließen': 'Complete set', 'Ablauf und Medien ansehen': 'View instructions and media', 'Gewicht': 'Weight', 'Gewicht erhöhen': 'Increase weight', 'Gewicht verringern': 'Decrease weight',
    'Wiederholungen': 'Reps', 'Eine Wiederholung mehr': 'One more rep', 'Eine Wiederholung weniger': 'One rep fewer', 'Wiederholungen in Reserve (optional)': 'Reps in reserve (optional)',
    'Gerät': 'Equipment', 'Ziel': 'Goal', 'Reserve': 'Reserve', 'Pause (Empfehlung)': 'Rest (suggested)', 'Pause': 'Rest', 'Startwert.': 'Starting value.',
    'Noch keine Einträge, daher ein Startwert als Vorschlag. Danach passt sich die App an deine Bewertungen an.': 'No entries yet, so this is a starting value. After that the app adapts to your ratings.',
    'Noch keine Vorgeschichte, starte mit einem leichten Satz.': 'No history yet, start with a light set.',
    'Letzte Bewertung „Passt“, Gewicht bleibt.': 'Last rating "Just right", weight stays.', 'Letzte Bewertung „Passt“, Zeit bleibt.': 'Last rating "Just right", time stays.',
    'Maximale Absicht, weit weg vom Muskelversagen.': 'Maximum intent, far from muscle failure.', 'Sprunghöhe steigern, solange die Landung sauber bleibt.': 'Increase jump height as long as the landing stays clean.',
    'Letztes Mal alle Sätze am oberen Ende, 1–2 RIR.': 'Last time all sets at the top end, 1–2 RIR.', 'Gewicht halten, Technik vor Last.': 'Keep the weight, technique before load.',
    'Rumpf stabil halten, nicht rotieren.': 'Keep the core stable, do not rotate.',
    'Übung abgeschlossen': 'Exercise complete', 'Nächstes Mal:': 'Next time:', '(abgeleitet aus deiner letzten Bewertung).': '(based on your last rating).', 'Einheit abschließen': 'Finish session',
    'Stopp': 'Stop', 'Start': 'Start', 'Zielzeit': 'Target time', 'läuft': 'running', 'Zeit': 'Time', 'Weiter': 'Resume',
    'Der Timer läuft hoch, stoppe ihn, wenn du fertig bist.': 'The timer counts up, stop it when you are done.', 'Noch keine Einträge.': 'No entries yet.',
    'Dein Training läuft weiter, der Timer auch.': 'Your workout keeps going, and so does the timer.', 'Übung streichen': 'Remove exercise',
    /* Zusammenfassung */
    /* Orte, Auswahl, Sheets */
    'Wo trainierst du?': 'Where are you training?', 'Die Übungen richten sich nach dem Equipment vor Ort. Deine Wahl bleibt als Standard gespeichert.': 'Exercises follow the equipment at the location. Your choice is saved as the default.',
    'Zuletzt': 'Last used', 'Der Plan wird neu zusammengestellt.': 'The plan will be rebuilt.',
    'Sie wird passend zur Reihenfolge einsortiert. Nur Übungen, die zum Equipment am Ort passen.': 'It is placed to fit the order. Only exercises that match the equipment at the location.',
    'Übung suchen': 'Search exercise', 'Neu': 'New', 'Neue Übung anlegen': 'Create new exercise', 'Keine passende Übung am Ort gefunden.': 'No suitable exercise found at this location.',
    /* Sprache */
    'Sprachbefehl': 'Voice command', 'Ich höre zu': 'Listening', 'Sag zum Beispiel': 'For example, say', 'Sprachbefehle verstehen nur Deutsch.': 'Voice commands only understand German.',
    'Verstanden': 'Understood', 'Neu sprechen': 'Speak again', 'Bestätigen': 'Confirm', 'Nicht verstanden': 'Not understood', 'Nochmal versuchen': 'Try again', 'Sprechen': 'Speak', 'Abbrechen': 'Cancel',
    'Befehl ausführen': 'Run command', 'Sprachbefehl als Text': 'Voice command as text', 'Oder Befehl tippen': 'Or type a command',
    'Hinzufügen': 'Add', 'Neu würfeln': 'Reroll', 'Gesperrte Übungen bleiben erhalten.': 'Locked exercises are kept.', 'Anderes Bewegungsmuster als bisher': 'Different movement pattern than before', 'ohne Namen': 'without name',
    'Die Spracherkennung ist in den Einstellungen ausgeschaltet. Du kannst den Befehl tippen.': 'Speech recognition is switched off in the settings. You can type the command.',
    'Dein Browser bietet keine Spracherkennung. Tippe den Befehl oder nutze das Mikrofon deiner Tastatur.': 'Your browser has no speech recognition. Type the command or use your keyboard microphone.',
    'Mikrofon nicht erlaubt. Erlaube den Zugriff in den Browser-Einstellungen oder tippe den Befehl.': 'Microphone not allowed. Allow access in the browser settings or type the command.',
    'Ich habe nichts gehört. Tippe auf „Sprechen“ und versuche es noch einmal.': 'I did not hear anything. Tap "Speak" and try again.',
    'Ich habe nichts gehört. Tippe auf das Mikrofon und sprich, oder tippe den Befehl.': 'I did not hear anything. Tap the microphone and speak, or type the command.',
    'Spracherkennung konnte nicht gestartet werden. Tippe den Befehl.': 'Speech recognition could not be started. Type the command.',
    /* Bibliothek, Detail, Medien */
    'Alle': 'All', 'Keine Treffer': 'No matches', 'Lege die Übung neu an, sie ist danach sofort im Generator.': 'Create the exercise, it is in the generator right away.', 'Neue Übung': 'New exercise',
    'Übung': 'Exercise', 'Medien': 'Media', 'Noch keine Medien. Füge Fotos, Videos oder Links hinzu, zum Beispiel eine Aufnahme deiner Technik.': 'No media yet. Add photos, videos or links, for example a recording of your technique.',
    'Foto / Video': 'Photo / Video', 'Link': 'Link', 'Fotos und Videos bleiben auf diesem Gerät. Lange Videos lieber als Link ablegen.': 'Photos and videos stay on this device. Store long videos as a link instead.',
    'Ablauf': 'Steps', 'Technikhinweis': 'Technique cue', 'Noch kein Ablauf hinterlegt. Schreibe die Schritte auf oder diktiere sie mit der Tastatur.': 'No steps saved yet. Write the steps down or dictate them with your keyboard.',
    'Ablauf hinzufügen': 'Add steps', 'Ablauf bearbeiten': 'Edit steps', 'Aus Katalog löschen': 'Delete from catalog', 'Link hinzufügen': 'Add link',
    'YouTube, Instagram, Vimeo oder jede andere Adresse. Der Link öffnet im Browser.': 'YouTube, Instagram, Vimeo or any other address. The link opens in the browser.',
    'Adresse': 'Address', 'Titel (optional)': 'Title (optional)', 'z. B. Technik von der Seite': 'e.g. technique from the side', 'Schließen': 'Close', 'Löschen': 'Delete', 'Wirklich löschen?': 'Really delete?', 'Öffnen': 'Open',
    'Medium': 'Medium', 'Nicht gefunden.': 'Not found.', 'Speichern': 'Save', 'Zurück': 'Back', 'Technik': 'Technique',
    /* Auswertung */
    'Alle Werte stammen aus deinen geloggten Sätzen.': 'All values come from your logged sets.', 'Beispieldaten für 40 Wochen. Sobald du Sätze loggst, siehst du hier deine echten Werte.': 'Sample data for 40 weeks. As soon as you log sets, your real values show up here.',
    'Noch keine Einträge': 'No entries yet', 'Starte ein Training und logge deine Sätze. Danach erscheinen hier Verlauf, Trend, Bestleistungen und die Nutzung deiner Übungen.': 'Start a workout and log your sets. Progress, trend, personal bests and the use of your exercises will appear here.',
    'Zum Training': 'To workout', 'Beispieldaten ansehen': 'View sample data', 'Das sind Beispieldaten.': 'This is sample data.', 'Ausblenden': 'Hide', 'Überblick': 'Overview', 'Alles': 'All',
    'Sätze pro Woche': 'Sets per week', 'Sätze pro Woche nach Bewegungsmuster': 'Sets per week by movement pattern', 'Konsistenz': 'Consistency', 'Tendenzen': 'Trends', 'Hinweise aus deinen letzten Einheiten': 'Notes from your recent sessions',
    'Noch keine Auffälligkeiten. Ab etwa vier Einheiten pro Übung erscheinen hier Hinweise zu Stagnation und Fortschritt.': 'Nothing notable yet. From about four sessions per exercise, notes on plateaus and progress appear here.',
    'Nicht genutzt': 'Unused', 'Alles in Benutzung.': 'Everything in use.', 'keine Einträge im Zeitraum': 'no entries in this period', 'Im gewählten Zeitraum keine Einträge. Wähle einen längeren Zeitraum.': 'No entries in the selected period. Choose a longer period.',
    'Bestes Satzgewicht': 'Best set weight', 'Längste Haltezeit': 'Longest hold', 'Meiste Wiederholungen': 'Most reps', 'pro Einheit': 'per session',
    'Aktuell': 'Current', 'Trend': 'Trend', 'noch offen': 'not yet available', 'Verlauf': 'Progress', 'Bestleistung': 'Personal best', 'Tabelle': 'Table', 'Diagramm': 'Chart', 'Datum': 'Date', 'Wert': 'Value', 'Bewertung': 'Rating',
    'Mehr/Passt/Weniger': 'More/Just right/Less',
    'Trainingsort': 'Training location',
    'Bestes Satzgewicht pro Einheit': 'Best set weight per session', 'Längste Haltezeit pro Einheit': 'Longest hold per session', 'Meiste Wiederholungen pro Einheit': 'Most reps per session', 'Name der Übung': 'Exercise name',
    'wurde dreimal in Folge mit „Weniger“ bewertet. Vorschlag: Last senken oder Pause verlängern.': 'was rated "Less" three times in a row. Suggestion: lower the load or extend the rest.',
    /* Zusammenfassung des Einstellungsdialogs und Assistent */
    'Einordnen': 'Classify', 'Name': 'Name', 'Englischer Name': 'English name', 'Gib einen Namen ein, dann schlage ich die Einordnung vor.': 'Enter a name and I will suggest the classification.',
    'Die App schlägt die Position im Trainingsprinzip vor. Du bestätigst oder änderst. Ablauf, Fotos, Videos und Links kannst du gleich mit anlegen.': 'The app suggests the position in the training principle. You confirm or change it. You can add steps, photos, videos and links right away.',
    'Ändere Titel, Seiten und alle übrigen Eigenschaften. Der Verlauf bleibt erhalten.': 'Change the title, sides and all other properties. Your history is kept.',
    'Übung bearbeiten': 'Edit exercise', 'Übung ersetzen': 'Replace exercise', 'Bewegungsmuster': 'Movement pattern', 'Gruppe': 'Group', 'Keine Angabe': 'Not specified', 'Richtung': 'Direction', 'Horizontal': 'Horizontal', 'Schräg': 'Diagonal', 'Vertikal': 'Vertical',
    'Seiten': 'Sides', 'Beidseitig': 'Both sides', 'Einseitig': 'One side', 'Komplexität': 'Complexity', 'Mehrgelenkig': 'Multi-joint', 'Isoliert': 'Isolation',
    'Equipment (mehrere möglich)': 'Equipment (multiple possible)', 'Im Training wählst du, mit welchem Gerät du die Übung gerade machst.': 'During the workout you choose which equipment you are using.',
    'Welche Maschine?': 'Which machine?', 'Welches Cardio-Gerät?': 'Which cardio machine?',
    'Die Übung erscheint nur an Orten, an denen das eingeschaltet ist. Neue Geräte legst du unter Mehr bei „Orte und Equipment“ an.': 'The exercise only appears at locations where this is switched on. Add new machines under More in "Locations and equipment".',
    'Messung': 'Measurement', 'Haltezeit': 'Hold time', 'Messgröße nach der Erwärmung': 'Measurement after warm-up', 'Keine': 'None', 'Durchführung': 'Execution', 'Eine Seite': 'One side', 'Beide Seiten, je ein Durchgang': 'Both sides, one round each',
    'Zielzeit in Sekunden': 'Target time in seconds', 'Vorgabe': 'Target', 'keine': 'none', 'Schwerpunkt': 'Focus', 'Muskelaufbau': 'Muscle growth', 'Schwer': 'Heavy',
    'Ablauf (ein Schritt pro Zeile)': 'Steps (one per line)', 'Fotos, Videos und Links': 'Photos, videos and links', 'Foto / Video vom Gerät wählen': 'Choose photo / video from device', 'Entfernen': 'Remove', 'Ergebnis': 'Result',
    'wird einsortiert als': 'will be classified as', 'Erscheint in:': 'Appears in:', 'Vorgabe:': 'Target:', 'Vorschlag:': 'Suggestion:', 'Ähnlich zu': 'Similar to', 'wie unten eingestellt': 'as set below',
    'In heutigen Plan': "Into today's plan", 'Zum Training hinzufügen': 'Add to workout', 'Änderungen speichern': 'Save changes',
    'vor isolierten Übungen': 'before isolation exercises', 'nach den komplexen Übungen': 'after the compound exercises', 'nach bilateralen.': 'after bilateral ones.', 'vor unilateralen.': 'before unilateral ones.',
    'allen Einheiten, jeweils am Anfang': 'all sessions, always at the start', 'allen Einheiten, jeweils am Ende (seitlich und gerade)': 'all sessions, always at the end (lateral and straight)', 'am Ende der Einheit (optional)': 'at the end of the session (optional)',
    'den Aufrichtungs-Einheiten A und B': 'the posture sessions A and B', 'am Anfang jedes Krafttrainings (Cardio-Gerät nach Verfügbarkeit)': 'the start of every strength workout (cardio machine if available)',
    'am Ende jedes Krafttrainings (Waden, Handstand-Vorbereitung)': 'the end of every strength workout (calves, handstand prep)',
    'kontrolliert, ohne Muskelversagen': 'controlled, without going to failure', 'weit weg vom Versagen': 'far from failure',
    /* Einstellungen */
    'Einstellungen': 'Settings', 'Gilt für den Generator und den Plan.': 'Applies to the generator and the plan.', 'Neuer Ort': 'New location', 'Name des Orts': 'Location name', 'Hier trainieren': 'Train here',
    'Aktueller Ort. Wird beim nächsten Öffnen wieder vorausgewählt.': 'Current location. It will be preselected next time you open the app.', 'Orte und Equipment': 'Locations and equipment',
    'Neue Maschine, z. B. Rudermaschine': 'New machine, e.g. rowing machine', 'Neues Cardio-Gerät, z. B. Laufband': 'New cardio machine, e.g. treadmill', 'Name': 'Name',
    'Trainingsarten': 'Training types', 'Neue Trainingsart': 'New training type', 'Name der Trainingsart': 'Training type name', 'Bewegungsmuster in der Einheit': 'Movement patterns in the session',
    'Jedes gewählte Muster ergibt eine Übung im Tagesplan, aus deiner Bibliothek ausgewählt nach Ort und Equipment. Änderungen gelten ab dem nächsten Plan, über „Einheit wechseln“ stellst du den heutigen neu zusammen.': 'Each chosen pattern adds one exercise to the day\'s plan, picked from your library by location and equipment. Changes apply from the next plan; use "Change session" to rebuild today\'s.',
    'Diese verwenden': 'Use this one', 'Aktuelle Trainingsart.': 'Current training type.', 'Heute meiden': 'Avoid today', 'Der Generator schließt belastende Übungen aus, bis du die Markierung löschst.': 'The generator excludes exercises that stress these joints until you clear the mark.',
    'Training': 'Training', 'Einheiten pro Woche': 'Sessions per week', 'Spracheingabe': 'Voice input', 'Befehle für den Tagesplan, nutzt die Spracherkennung des Browsers': "Commands for the day's plan, uses the browser's speech recognition",
    'Gelöschte Übungen': 'Deleted exercises', 'Wiederherstellen': 'Restore', 'Daten': 'Data',
    'Fotos und Videos aus der Bibliothek bleiben auf diesem Gerät und sind nicht im Export enthalten. Links und Abläufe sind enthalten.': 'Photos and videos from the library stay on this device and are not included in the export. Links and steps are included.',
    /* Meldungen */
    'Bitte einen Namen eingeben': 'Please enter a name', 'Bitte einen Namen für die Maschine eingeben': 'Please enter a name for the machine', 'Bitte eine gültige Adresse eingeben, zum Beispiel https://youtu.be/…': 'Please enter a valid address, for example https://youtu.be/…',
    'Übung nicht gefunden': 'Exercise not found', 'Alle Übungen sind schon erledigt': 'All exercises are already done', 'Mindestens ein Bewegungsmuster bleibt gewählt': 'At least one movement pattern stays selected',
    'Keine weitere Übung mit dem Equipment am Ort verfügbar': 'No other exercise available with the equipment at this location', 'Import abgeschlossen': 'Import complete', 'Datei konnte nicht gelesen werden': 'File could not be read',
    'Nochmal „Zurück“ zum Beenden': 'Press Back again to exit', 'Nächstes Training': 'Next workout', 'Rückschau': 'Review', 'Seit letztem Satz': 'Since last set', 'Belastung (RPE)': 'Effort (RPE)', 'Trainingsplanung abschließen': 'Finish planning', 'Daten und Sicherung': 'Data and backup', 'Orte und Equipment': 'Locations and equipment', 'Trainingsarten': 'Training types', 'Eigene Trainingsart': 'Custom training type', 'Einheit A und B im Wechsel': 'Session A and B alternating', 'Beine und Hüfte': 'Legs and hips', 'Drücken und Ziehen': 'Push and pull', 'Haltung, Hüfte, Mobilisation': 'Posture, hips, mobility', 'Schulter und Körperspannung': 'Shoulders and body tension', 'Mikrotraining': 'Micro training', 'Krafttrainingseinheit': 'Strength session', 'Mikrotrainingseinheit': 'Micro session', 'Neu': 'New', 'Oberkategorie': 'Category', 'Gelöschte Trainingsarten': 'Deleted training types', 'Ganzkörper': 'Full body', 'Unterkörper': 'Lower body', 'Oberkörper': 'Upper body', 'Handstand-Vorbereitung': 'Handstand preparation', 'Keine Trainingsart vorhanden.': 'No training type available.', 'Nach deinem ersten Training siehst du hier alle Sätze.': 'After your first workout you will see all sets here.', 'Vorbereitung': 'Preparation', 'Hauptteil': 'Main part', 'Ergänzung': 'Supplementary', 'Spezial': 'Special', 'Prehab': 'Prehab', 'Satz hinzufügen': 'Add set', 'Übung abschließen': 'Finish exercise', 'Gesamt': 'Total', 'Nächstes Training einrichten': 'Set up next workout', 'Medium gelöscht': 'Medium deleted', 'Link gespeichert': 'Link saved', 'Ablauf gespeichert': 'Steps saved', 'Nur Fotos und Videos werden unterstützt.': 'Only photos and videos are supported.', 'Datei konnte nicht gespeichert werden': 'File could not be saved',
    'Einheit abgeschlossen. Gut gemacht.': 'Session finished. Well done.', 'Plan passt': 'plan fits', 'Bitte einen Namen eingeben.': 'Please enter a name.',
    'Bitte einen Namen eingeben, dann …': 'Please enter a name, then …', 'Bankdrücken gespeichert': 'Bench press saved'
  };

  var R = [
    /* Zähler und Meta */
    ['{#1} von {#2} Sätzen erledigt', '{#1} of {#2} sets done'], ['{#1} von {#2} Sätzen', '{#1} of {#2} sets'], ['{#1} von {#2}', '{#1} of {#2}'], ['{#1} offen', '{#1} open'], ['Übung {#1} von {#2}', 'Exercise {#1} of {#2}'],
    ['Einheit {#1} dieser Woche', 'Session {#1} this week'], ['{#1} Übungen', '{#1} exercises'], ['{#1} Übung', '{#1} exercise'], ['{#1} erledigt', '{#1} done'], ['ca. {#1} min', 'approx. {#1} min'], ['seit {#1}', 'since {#1}'],
    ['Abgeschlossen · {#1} Übungen', 'Completed · {#1} exercises'], ['Abgeschlossen · {#1} Übung', 'Completed · {#1} exercise'], ['Abgeschlossen', 'Completed'], ['Alle {#1} Übungen sind erledigt.', 'All {#1} exercises are done.'],
    ['Trainingsort · {#1} Geräte', 'Training location · {#1} items'], ['{#1} Geräte', '{#1} items'], ['Weitere Orte ({#1})', 'More locations ({#1})'],
    ['{#1} Pause', '{#1} rest'], ['über {#1} Pause', 'over {#1} rest'], ['{1} (beide Seiten)', '{1} (both sides)'], ['{#1}/Seite', '{#1}/side'], ['{#1}/Bein', '{#1}/leg'], ['{#1} × unter {#2}', '{#1} × under {#2}'], ['{#1} oder {#2}', '{#1} or {#2}'],
    ['{#1} Satz', '{#1} set'], ['{#1} Sätze', '{#1} sets'], ['{#1} Wdh.', '{#1} reps'], ['{#1} Einheit', '{#1} session'], ['{#1} Einheiten', '{#1} sessions'], ['{#1} Wo.', '{#1} wk'], ['{#1} Mon.', '{#1} mo'], ['KW {#1}', 'CW {#1}'],
    ['{#1}/Monat', '{#1}/month'], ['{#1} pro Woche', '{#1} per week'], ['{#1} Sekunden mehr', '{#1} seconds more'], ['{#1} Sekunden weniger', '{#1} seconds less'], ['Satz {#1}', 'Set {#1}'], ['Satz {#1} ansehen', 'View set {#1}'], ['Satz {#1} gespeichert', 'Set {#1} saved'],
    ['Seite {#1} von {#2}', 'Side {#1} of {#2}'], ['Seite {#1}: {2}', 'Side {#1}: {2}'], ['Start · Seite {#1} von {#2}', 'Start · side {#1} of {#2}'],
    ['{1} starten', 'Start {1}'], ['Plan erstellt: {1}', 'Plan created: {1}'], ['{1} fortsetzen', 'Continue {1}'], ['Weiter: {1}', 'Next: {1}'], ['Letztes Mal {1}', 'Last time {1}'], ['Letztes Mal {1}.', 'Last time {1}.'],
    ['Ø aller Erwärmungen: {1} ({2}×).', 'Avg. of all warm-ups: {1} ({2}×).'], ['Ø {1} Sätze und {2} Einheiten pro Woche, nach Bewegungsmuster', 'Avg. {1} sets and {2} sessions per week, by movement pattern'],
    ['Einheiten pro Woche, letzte {1} Wochen', 'Sessions per week, last {1} weeks'], ['Seit mehr als {1} Wochen nicht trainiert oder noch nie', 'Not trained for more than {1} weeks or never'],
    ['{1} ({2}, optional)', '{1} ({2}, optional)'], ['Verlauf {1}', 'Progress {1}'], ['vor {1} Tagen', '{1} days ago'], ['Stand {1}', 'as of {1}'], ['Mehr {#1}', 'More {#1}'], ['Passt {#1}', 'Just right {#1}'], ['Weniger {#1}', 'Less {#1}'],
    ['Mehr ({1})', 'More ({1})'], ['Weniger ({1})', 'Less ({1})'], ['+ {1} weitere Übungen', '+ {1} more exercises'], ['{#1} von {#2} Maschinen vorhanden', '{#1} of {#2} machines available'], ['{#1} von {#2} Geräte vorhanden', '{#1} of {#2} devices available'],
    ['Letzte Bewertung „Mehr“, daher +{1} kg.', 'Last rating "More", so +{1} kg.'], ['Letzte Bewertung „Weniger“, daher −{1} kg.', 'Last rating "Less", so −{1} kg.'],
    ['Letzte Bewertung „Mehr“, daher +{1} s.', 'Last rating "More", so +{1} s.'], ['Letzte Bewertung „Weniger“, daher −{1} s.', 'Last rating "Less", so −{1} s.'],
    ['Letzte Bewertung „Mehr“, daher +{1}.', 'Last rating "More", so +{1}.'], ['Zuletzt dreimal „Weniger“, daher −{1} kg.', 'Last three ratings "Less", so −{1} kg.'],
    ['Letztes Mal 3 × 42 s, Bewertung „Mehr“.', 'Last time 3 × 42 s, rated "More".'],
    ['stagniert seit {1} Einheiten bei {2}. Deload (−30 % Volumen) oder Variation prüfen.', 'has plateaued for {1} sessions at {2}. Consider a deload (−30 % volume) or a variation.'],
    ['steigt seit mehreren Wochen, aktuell {1} pro Monat.', 'has been rising for several weeks, currently {1} per month.'],
    /* Toasts */
    ['{1} gestrichen', '{1} removed'], ['{1} durch {2} ersetzt', '{1} replaced with {2}'], ['{1} zum Plan hinzugefügt', '{1} added to the plan'], ['{1} zum heutigen Plan hinzugefügt', "{1} added to today's plan"],
    ['{1} ersetzt die Übung', '{1} replaces the exercise'], ['{1} abgeschlossen', '{1} finished'], ['{1} gespeichert. Taucht ab jetzt im Generator auf.', '{1} saved. It now appears in the generator.'],
    ['{1} hinzugefügt. Eine passende Übung legst du in der Bibliothek an (Equipment Maschine).', '{1} added. Create a matching exercise in the library (equipment: machine).'],
    ['{1} hinzugefügt und als Erwärmungs-Übung angelegt.', '{1} added and created as a warm-up exercise.'], ['{1} gibt es schon im Katalog', '{1} already exists in the catalog'], ['{1} gibt es schon', '{1} already exists'],
    ['Nochmal tippen: {1} wird aus dem Katalog gelöscht (wiederherstellbar unter Mehr).', 'Tap again: {1} will be deleted from the catalog (restorable under More).'], ['{1} aus dem Katalog gelöscht', '{1} deleted from the catalog'],
    ['{1} wiederhergestellt', '{1} restored'], ['{1} gelöscht. Bisherige Einträge bleiben in der Auswertung.', '{1} deleted. Existing entries stay in the stats.'], ['{1} gelöscht', '{1} deleted'], ['{1} gespeichert', '{1} saved'],
    ['{#1} Datei gespeichert', '{#1} file saved'], ['{#1} Dateien gespeichert', '{#1} files saved'], ['{1} ist größer als 250 MB. Lege lange Videos besser als Link ab.', '{1} is larger than 250 MB. Store long videos as a link instead.'],
    ['{#1} Übung angepasst', '{#1} exercise adjusted'], ['{#1} Übungen angepasst', '{#1} exercises adjusted'], ['{#1} Übung im heutigen Plan angepasst', "{#1} exercise in today's plan adjusted"], ['{#1} Übungen im heutigen Plan angepasst', "{#1} exercises in today's plan adjusted"],
    ['{#1} Übung im Plan angepasst', '{#1} exercise in the plan adjusted'], ['{#1} Übungen im Plan angepasst', '{#1} exercises in the plan adjusted'], ['{1} ohne Ersatz', '{1} without replacement'], ['{1} zusammengestellt', '{1} assembled'],
    ['{1} ({2}) im Plan', '{1} ({2}) in the plan'],
    /* Sprachbefehle */
    ['„{1}“ ist nicht im heutigen Plan.', '"{1}" is not in today\'s plan.'], ['„{1}“ gibt es in der Bibliothek nicht.', '"{1}" is not in the library.'], ['{1} steht schon im Plan.', '{1} is already in the plan.'], ['„{1}“ neu anlegen', 'Create "{1}"'],
    ['Das habe ich nicht verstanden. Sag zum Beispiel {1}', 'I did not understand that. Say, for example, [1]'], ['Spracherkennung nicht möglich ({1}). Tippe den Befehl.', 'Speech recognition not possible ({1}). Type the command.'],
    /* Assistent */
    ['{1} bearbeiten', 'Edit {1}'], ['{1} aus dem Katalog löschen', 'Delete {1} from the catalog'], ['Keine Treffer für „{1}“. Lege die Übung mit „Neu“ selbst an.', 'No matches for "{1}". Create the exercise yourself with "New".'],
    ['{1} durch eine Übung aus der Bibliothek ersetzen. Nur Übungen, die zum Equipment am Ort passen.', 'Replace {1} with an exercise from the library. Only exercises that match the equipment at the location.'],
    ['{#1} Sätze gespeichert, nur auf diesem Gerät. Exportiere regelmäßig als Sicherung.', '{#1} sets saved, on this device only. Export regularly as a backup.'], ['{1} löschen', 'Delete {1}'], ['{1}. Ein Schritt pro Zeile.', '{1}. One step per line.'], ['Wiederholungen (z. B. {1} oder {2}/Seite)', 'Reps (e.g. {1} or {2}/side)'],
    ['Reihenfolge: {1}, {2}', 'Order: {1}, {2}'], ['{1} Ändere die Antworten unten, falls es nicht passt.', '{1} Change the answers below if it does not fit.'], [', {1}. Ändere die Antworten unten, falls es nicht passt.', ', {1}. Change the answers below if it does not fit.'],
    ['. Ändere die Antworten unten, falls es nicht passt.', '. Change the answers below if it does not fit.'],
    ['Ganzkörper A und B, Oberkörper ({1}×)', 'Full body A and B, upper body ({1}×)'], ['Ganzkörper A und B, Unterkörper ({1}×)', 'Full body A and B, lower body ({1}×)'],
    ['{1}. Eingebaute Art, Einheiten: {2}.', '{1}. Built-in type, sessions: {2}.'],
    /* Spannen mit Bindestrichen oder Bereichen stehen unverändert da */
  ];

  /* Beschreibungen der Einordnung (kt-classify.js) */
  var WHY = {
    'Beweglichkeit und Dehnung, daher Aufrichtung (Mobilisation)': 'Mobility and stretching, so posture (mobility)',
    'Haltung und Schulterblatt, daher Aufrichtung (Haltung)': 'Posture and shoulder blade, so posture (posture control)',
    'Hüfte und Rumpfkontrolle, daher Aufrichtung (Hüfte)': 'Hip and trunk control, so posture (hip)',
    'Zusatzmuskulatur, daher Assistenz': 'Supporting muscles, so assistance',
    'kniedominant, daher Squat': 'Knee-dominant, so squat', 'hüftdominant, daher Hinge': 'Hip-dominant, so hinge',
    'Zug von oben, daher Ziehen vertikal': 'Pull from above, so pull vertical', 'Rudern, daher Ziehen horizontal': 'Rowing, so pull horizontal',
    'Druck über Kopf, daher Drücken vertikal': 'Overhead press, so push vertical', 'Druck nach vorn, daher Drücken horizontal': 'Press forward, so push horizontal',
    'explosive Übung, daher Schnellkraft': 'Explosive exercise, so power', 'Rumpfübung': 'Core exercise', 'Pressbewegung, daher Drücken': 'Pressing movement, so push',
    'Erwärmung mit Cardio, daher Erwärmung': 'Cardio warm-up, so warm-up', 'Handstand-Vorbereitung, daher Zusatz (Handstand)': 'Handstand preparation, so extra (handstand)',
    'Wadenvariante für die Achillessehne, daher Zusatz (AS-Prävention)': 'Calf variation for the Achilles tendon, so extra (Achilles prevention)',
    'Schulterblattkontrolle, daher Zusatz (Schulterstabilität)': 'Scapular control, so extra (shoulder stability)',
    'Name nicht eindeutig. Wähle das Bewegungsmuster selbst.': 'Name is not clear. Choose the movement pattern yourself.'
  };
  Object.keys(WHY).forEach(function (k) { X[k] = WHY[k]; });

  /* Eingebaute Abläufe (3 Übungen) */
  var ST = {
    'Handgelenke gerade, Ellbogen etwa {1}–{2}° zum Rumpf, Stange nicht auf der Brust prellen.': 'Wrists straight, elbows about {1}–{2}° from the torso, do not bounce the bar off the chest.',
    'Auf der Bank liegen, Schulterblätter zusammen und nach unten, Füße fest am Boden.': 'Lie on the bench, shoulder blades together and down, feet firmly on the floor.',
    'Griff etwas breiter als Schulterbreite, Stange über den Schultern ausheben.': 'Grip slightly wider than shoulder width, lift the bar out over the shoulders.',
    'Kontrolliert zur unteren Brust senken, Unterarme bleiben senkrecht.': 'Lower under control to the lower chest, forearms stay vertical.',
    'Explosiv drücken, oben Ellbogen nicht überstrecken, ausatmen im letzten Drittel.': 'Press explosively, do not lock out the elbows at the top, exhale in the last third.',
    'Ellbogen hoch, Rumpf aufrecht, Knie folgen den Zehen.': 'Elbows up, torso upright, knees follow the toes.',
    'Stange auf den vorderen Schultern ablegen, Ellbogen zeigen nach vorn.': 'Rest the bar on the front shoulders, elbows point forward.',
    'Fußstellung etwa schulterbreit, Zehen leicht nach außen.': 'Feet about shoulder width apart, toes slightly out.',
    'Hüfte und Knie gleichzeitig beugen, Rumpf aufrecht halten.': 'Bend hips and knees at the same time, keep the torso upright.',
    'Aus der Mitte des Fußes aufstehen, oben Hüfte komplett strecken.': 'Stand up from the middle of the foot, fully extend the hips at the top.',
    'Brust zur Stange, nicht mit dem Rücken schwingen.': 'Chest to the bar, do not swing with the back.',
    'Oberschenkel unter den Polstern fixieren, Griff etwas breiter als Schulterbreite.': 'Lock the thighs under the pads, grip slightly wider than shoulder width.',
    'Schulterblätter zuerst nach unten ziehen, dann Ellbogen zur Hüfte.': 'Pull the shoulder blades down first, then the elbows to the hips.',
    'Stange zur oberen Brust führen, kurz halten.': 'Bring the bar to the upper chest, hold briefly.',
    'Kontrolliert zurück bis zur vollen Streckung.': 'Return under control to full extension.'
  };
  var STX = {}, STR = [];
  Object.keys(ST).forEach(function (k) { if (/\{1\}/.test(k)) STR.push([k, ST[k]]); else STX[k] = ST[k]; });
  Object.keys(STX).forEach(function (k) { X[k] = STX[k]; });
  R = R.concat(STR);

  KT.i18n.add(X, R);
})();
