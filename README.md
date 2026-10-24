# Pokémon Game Center

Application macOS Intel (Electron + React + TypeScript) pour importer et lancer des ROMs Game Boy / Color / Advance obtenues légalement.

## Prérequis
- Node.js 20+
- mGBA.app installé dans `/Applications` (https://mgba.io/downloads.html)
- ROMs personnelles légalement obtenues ; aucune ROM commerciale n'est fournie.

## Installation
```bash
git clone https://github.com/zakiCharik/pokemon-game-center.git
cd pokemon-game-center
npm install
npm run dev
```

Clique sur **Importer des jeux**, sélectionne des fichiers .gb/.gbc/.gba puis **Jouer**. La bibliothèque est sauvegardée dans le dossier utilisateur Electron, et mGBA est lancé comme application séparée.

## État
V0.2 : interface, import multi-ROM, bibliothèque persistante JSON, lancement mGBA externe. Non testé sur un Mac réel. À venir : intégration native du moteur, gestion des sauvegardes, catalogue homebrew légal, tests, packaging et signature.

## Licences
Le moteur mGBA est un logiciel distinct soumis à sa propre licence. Aucun jeu Pokémon commercial n'est distribué.
