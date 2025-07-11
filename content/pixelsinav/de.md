# Pixel Sınav: Mein umfangreichstes Lernprojekt

Hallo, ich bin Poyraz Avsever. Um meine Fähigkeiten in der Softwareentwicklung weiterzuentwickeln und ein bedeutungsvolles Produkt zu schaffen, habe ich das Projekt **Pixel Sınav** ins Leben gerufen.

Pixel Sınav ist eine umfassende Lernplattform, die mit modernen Webtechnologien entwickelt wurde. Lehrkräfte können Unterrichtsinhalte erstellen, während Lernende ihren Fortschritt verfolgen können.

In diesem Beitrag erzähle ich im Detail von der Entwicklung des Projekts, den eingesetzten Technologien, Herausforderungen, Erkenntnissen und zukünftigen Plänen.

---

## Ziel und Hintergrund des Projekts

Das Projekt basiert auf zwei Hauptmotiven:

1. Ich wollte qualitativ hochwertigere, umfangreichere und technisch anspruchsvollere Projekte umsetzen.
2. Ich wollte backend-orientierte Technologien wie **NestJS** und **Docker** erlernen.

Mein Interesse an Bildungstechnologien und mein Wunsch, in diesem Bereich eigene Beiträge zu leisten, beeinflussten das Konzept von Pixel Sınav ebenfalls maßgeblich. In einer Zeit zunehmender Digitalisierung im Bildungswesen wollte ich eine Plattform schaffen, die nützliche Lerninhalte bereitstellt.

---

## Warum eine Lernplattform?

Der Bereich Educational Technology (EdTech) entspricht meinen persönlichen Zielen und bietet gleichzeitig gesellschaftlichen Mehrwert. Die Idee eines Systems, in dem Lehrkräfte einfach Inhalte bereitstellen und Schüler:innen selbstbestimmt lernen können, war für mich sowohl motivierend als auch technisch herausfordernd.

Durch dieses Projekt konnte ich zahlreiche Konzepte aus Frontend und Backend praktisch anwenden und vertiefen.

---

## Technologiestack

Ich entschied mich bewusst dafür, im JavaScript-Ökosystem zu bleiben. Dadurch konnte ich Frontend und Backend mit derselben Sprache – TypeScript – umsetzen, unter Verwendung von Next.js und NestJS.

### Zentrale Technologien

| Technologie | Icon | Beschreibung |
|------------|------|--------------|
| **Next.js** | ![Next.js](https://skillicons.dev/icons?i=next) | Ein modernes React-Framework mit Server-side Rendering |
| **React** | ![React](https://skillicons.dev/icons?i=react) | Bibliothek zur Entwicklung von Benutzeroberflächen |
| **TailwindCSS** | ![Tailwind](https://skillicons.dev/icons?i=tailwind) | Utility-First-CSS-Framework |
| **NestJS** | ![NestJS](https://skillicons.dev/icons?i=nestjs) | Progressives Node.js-Framework auf TypeScript-Basis |
| **MongoDB** | ![MongoDB](https://skillicons.dev/icons?i=mongodb) | Dokumentenbasierte NoSQL-Datenbank |
| **TypeScript** | ![TS](https://skillicons.dev/icons?i=ts) | Typsichere Erweiterung von JavaScript |
| **Docker** | ![Docker](https://skillicons.dev/icons?i=docker) | Container-Technologie zur isolierten Anwendungsbereitstellung |
| **Jest** | ![Jest](https://skillicons.dev/icons?i=jest) | Test-Framework für JavaScript-Anwendungen |

### Weitere Bibliotheken

- **Framer Motion** – Reaktionsschnelle Animationen
- **React Markdown** – Markdown-Unterstützung
- **Chart.js + react-chartjs-2** – Darstellung von Lernfortschritt als Diagramme
- **React Hot Toast** – Benachrichtigungssystem

---

## Designprozess

Als gestalterische Referenz diente mir die Plattform [Codedex](https://www.codedex.io/). Ihre inspirierenden Farbpaletten, klare Typografie und benutzerfreundliche Struktur haben meine Entscheidungen maßgeblich beeinflusst.

Das Design stammt vollständig von mir, mit Fokus auf:

- Farblicher Kontrast
- Lesbarkeit der Schrift
- Konsistentes Layout und Abstände
- Responsives Grid-System für Mobilgeräte

**Frontend-Code**: [GitHub - PixelSinav-Frontend](https://github.com/poyrazavsever/PixelSinav-Frontend)  
**Backend-Code**: [GitHub - PixelSinav-Backend](https://github.com/poyrazavsever/PixelSinav-Backend)

---

## Benutzerrollen und Struktur

Pixel Sınav unterscheidet zwei Hauptnutzergruppen:

1. **Lehrkraft:** Kann Kurse erstellen, Inhalte verwalten und Lernfortschritte einsehen.
2. **Schüler:in:** Kann sich für Kurse anmelden, Inhalte lesen und Fortschritte verfolgen.

Das System wurde auf Grundlage dieser Rollen mit Authentifizierung, Autorisierung und rollenbasierten Endpunkten aufgebaut.

---

## Entwicklungsprozess

### Einstieg

Ich begann mit dem Frontend. Als Erstes entwickelte ich das Authentifizierungssystem mit JWT, inklusive Login und Registrierung. Danach erstellte ich das Lehrkraft-Panel und implementierte die Kursverwaltung.

### Backend-Integration

NestJS habe ich von Grund auf neu erlernt. Die größten Herausforderungen lagen in der Modularisierung und dem Erstellen der API-Dokumentation mit Swagger.

Diese Features konnte ich erfolgreich umsetzen:

- Registrierung und Anmeldung
- Authentifizierung über JWT
- E-Mail-Verifizierung
- Kurse erstellen, anzeigen und löschen
- Kursfilterung nach Lehrkraft

---

## Authentifizierung und Autorisierung

Im NestJS-Backend wurde ein JWT-basiertes Authentifizierungssystem eingerichtet. Die Endpunkte wurden rollenbasiert geschützt, und die API-Dokumentation mit Swagger/OpenAPI erstellt.

### Beispiel-Endpunkte

- `POST /auth/register` – Benutzerregistrierung
- `POST /auth/login` – Anmeldung mit Token-Generierung
- `POST /lessons` – Kurs erstellen (nur Lehrkräfte)
- `GET /lessons/teacher/:id` – Kurse einer bestimmten Lehrkraft abrufen

---

## Tests, Validierung und Sicherheit

- **Validation Pipe**: Alle Anfragen werden mit `class-validator` überprüft
- **Jest**: Unit- und Integrationstests mit Jest
- **Rate Limiting**: Beschränkung der Anfragen für anonyme Nutzer pro Stunde

---

## Was ich gelernt habe

Dieses Projekt hat mir geholfen, praktische Erfahrungen in folgenden Bereichen zu sammeln:

- Aufbau robuster API-Architekturen mit NestJS
- Nutzung des MongoDB-Aggregationsframeworks
- Anwendung von Clean Architecture im Backend
- Verbesserung meiner responsiven UI-Design-Fähigkeiten

---

## Zukünftige Pläne

Ich plane, Pixel Sınav weiter auszubauen. Auf meiner Roadmap stehen:

- Mobile App mit React Native
- Erweiterte Analyse der Prüfungsergebnisse
- Echtzeit-Benachrichtigungen
- Admin-Panel mit Auswertungsfunktionen

---

## Fazit

Pixel Sınav ist für mich mehr als nur ein Projekt – es ist ein Meilenstein, der meinen Fortschritt und meine Entwicklung als Entwickler widerspiegelt.

Wenn du selbst auf einem ähnlichen Weg bist, lade ich dich ein, das Projekt zu klonen, daran mitzuwirken oder es auf GitHub zu markieren.

---

## Nützliche Links

- [Frontend-Repository](https://github.com/poyrazavsever/PixelSinav-Frontend)
- [Backend-Repository](https://github.com/poyrazavsever/PixelSinav-Backend)
- [Figma-Design](https://www.figma.com/design/9lpzqI7EmUKKfEh0S7vfWO/Pixel-S%C4%B1nav?node-id=0-1&p=f&t=CHImoBwT1CzSSeqd-0)
- [LinkedIn](https://www.linkedin.com/in/poyrazavsever)
- [E-Mail](mailto:poyrazavsever@gmail.com)

---

Vielen Dank fürs Lesen.
