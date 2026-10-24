# Pokémon Game Center

Application macOS Intel pour gérer et lancer des jeux Game Boy, Game Boy Color et Game Boy Advance obtenus légalement.

## Stack
Electron, React, TypeScript, Vite et mGBA (application externe pour la V1).

## Démarrage

```bash
npm install
npm run dev
```

Installer mGBA séparément depuis https://mgba.io/downloads.html. Le projet ne contient aucune ROM commerciale.

## Fonctionnalités V1
- Bibliothèque locale des fichiers `.gb`, `.gbc` et `.gba`
- Importation depuis le disque
- Lancement via mGBA installé sur macOS
- Catalogue légal à développer

## Licence
Le code de ce projet est distinct du moteur mGBA (MPL-2.0). Les ROMs Pokémon ne sont pas distribuées.
