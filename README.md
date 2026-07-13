# Passwort-Tresor 🔐

Eine Progressive Web App (PWA) zum Generieren sicherer Passwörter mit einem lokalen Tresor, der per Face ID (WebAuthn) gesperrt wird. Auf Geräten/Browsern ohne Face ID/Touch ID greift ein Passcode-Fallback.

## Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Installation auf dem iPhone

1. Die App unter ihrer URL im Safari-Browser öffnen.
2. Auf das Teilen-Symbol tippen.
3. "Zum Home-Bildschirm" auswählen.

Beim ersten Start richtest du Face ID für den Tresor ein. Alle Daten bleiben lokal auf dem Gerät (localStorage) – es gibt kein Backend und keinen Account.

**Hinweis:** Die Face-ID-Sperre ist ein Zugriffsschutz auf App-Ebene (WebAuthn-Bestätigung), keine Festplattenverschlüsselung der gespeicherten Passwörter.
