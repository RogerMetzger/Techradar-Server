# Techradar

Diese Webseite wurde für das Modul WEBLAB gebaut. Link zu Projektbeschreibung [Projektbeschrieb WEBLAB](https://github.com/web-programming-lab/web-programming-lab-projekt).

Anforderungen an die Webseite sind unter [Anforderungen Techradar](https://github.com/web-programming-lab/web-programming-lab-projekt/blob/main/Technologie-Radar.md) zu finden.

## Voraussetzungen

* Node.js installiert (Download aktuelle LTS von hier: https://nodejs.org/en/download/)

## Installation

* Navigieren zu [/app](/app) `cd app` und `npm install` ausführen
* Navigieren zu [/server](/server) `cd server` und `npm install` ausführen

## Ausführen

### Umgebungsvariablen setzen

* Variable `SERVER_URL` setzen in [/app/src/environments/enironment.ts](/app/src/environments/environment.ts) und/oder [/app/src/environments/environment.prod.ts](/app/src/environments/environment.prod.ts)
* Variablen im File [/server/config.env](/server/config.env) setzen
  * `TECHRADAR_URI` zu MongoDB Cluster setzen
  * `PORT` für Server setzen (z.B. 8000)
  * `SECRET` setzen für JWT

### Starten

* Navigieren zu [/app](/app) `cd app` und `npm run start` ausführen
  * Mit dem Befehl `ng serve --configuration=production` kann die Applikation mit den Variablen aus `environment.prod.ts` gestartet werden
* Navigieren zu [/server](/server) `cd server` und `npm run start` ausführen