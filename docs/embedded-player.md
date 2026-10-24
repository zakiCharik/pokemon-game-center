# Lecteur intégré : conception technique

## État réel
La V0.3 lance mGBA comme application externe. Le composant Player fournit une interface et un point d'extension, **pas** un émulateur intégré fonctionnel.

## Architecture cible
- Adapter mGBA via libmgba (native addon Node-API, processus isolé) ou une compilation WebAssembly locale et auditable.
- Frames vidéo transférées par tampon binaire/SharedArrayBuffer avec isolation adaptée ; rendu Canvas/WebGL.
- Audio via AudioWorklet avec gestion des latences.
- Entrées clavier et Gamepad API converties en événements du core.
- Pause, reprise, reset, vitesse, états de sauvegarde, gestion du cycle de vie et fermeture propre.
- Tests de compatibilité GB/GBC/GBA et contrôles de licences avant redistribution de binaires.

## Critères d'acceptation
1. Une ROM homebrew GBA s'exécute dans la fenêtre Electron, sans application externe.
2. Image 240×160 et audio fonctionnels.
3. Clavier/manette utilisables ; 60 images/s cible sur Mac Intel.
4. Sauvegardes isolées par jeu, export et restauration.
5. Aucune ROM commerciale, BIOS propriétaire ou contenu non autorisé dans le dépôt.

Ne pas déclarer le lecteur « fonctionnel » avant l'intégration d'un core testé sur macOS Intel.
