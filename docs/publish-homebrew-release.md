# Publier les quatre ROMs homebrew

Le bouton **Télécharger et installer** cherche les fichiers sur la release GitHub portant exactement le tag `homebrew-starter-v1`.

1. Ouvrir https://github.com/zakiCharik/pokemon-game-center/releases/new
2. Créer le tag `homebrew-starter-v1` sur `main`.
3. Extraire localement `homebrew-starter-v1-release-assets.zip`.
4. Glisser les **quatre fichiers individuels** `.gba` / `.gbc` comme assets de la release (ne pas ajouter uniquement le ZIP).
5. Publier la release. Comme le dépôt est privé, l'accès aux assets exige une authentification GitHub. Les téléchargements directs depuis une application Electron sans authentification ne fonctionneront pas forcément : une release publique dans un dépôt dédié aux homebrews autorisés, ou un serveur de téléchargement public, sera nécessaire pour une distribution grand public.
6. Vérifier les SHA-256 des fichiers avec `shasum -a 256 *.gba *.gbc` et comparer à `catalog/starter-roms.json`.

L'application accepte aussi les ROMs du dossier local `starter-roms/` sans téléchargement Internet. La vérification SHA-256 est obligatoire avant l'installation.
