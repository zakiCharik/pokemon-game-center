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

## Jeux homebrew de départ

Le dossier `starter-roms/` à la racine est détecté automatiquement au démarrage de l'application. Les fichiers .gb/.gbc/.gba sont ajoutés à la bibliothèque, sans copie ni téléchargement. Le dossier est facultatif.

Les quatre ROMs fournies par le propriétaire du projet sont listées dans `catalog/starter-roms.json`. Pour les ajouter au dépôt, extraire l'archive `pokemon-starter-roms.zip` à la racine, puis utiliser `git add -f starter-roms/*.gba starter-roms/*.gbc` (le .gitignore exclut normalement les ROMs) et créer un commit. Ne committer que les ROMs dont la redistribution est autorisée.

Le chargement automatique fonctionne en développement depuis le dossier du projet. La distribution d'une application empaquetée devra explicitement inclure ce dossier dans les ressources du paquet.

## Importer des archives ZIP locales

Dans **Ma bibliothèque**, clique sur **Importer des ROMs / ZIP** et sélectionne une ou plusieurs archives `.zip`, ou **Importer un dossier** pour traiter les archives d'un dossier (sans récursion). Les fichiers `.gb`, `.gbc` et `.gba` sont extraits dans le stockage privé Electron, puis enregistrés dans la bibliothèque. Les doublons sont détectés à partir du SHA-256 du contenu. Les fichiers `.nds` (Nintendo DS) et `.ips` (patchs) sont signalés comme non pris en charge ; un patch IPS doit être appliqué séparément à une ROM de base autorisée. Les ZIP peuvent contenir des fichiers annexes ignorés. Les ROMs commerciales ne sont jamais commitées dans ce dépôt.

Après mise à jour : `npm install` puis `npm run dev`. L'importation ZIP n'a pas encore été validée par un test d'intégration sur macOS.
