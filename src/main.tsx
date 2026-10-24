import React from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

function App(){return <main><h1>Pokémon Game Center</h1><p>Bibliothèque Game Boy · Game Boy Color · Game Boy Advance</p><section><h2>Mes jeux</h2><p>Importation des ROMs légales à venir.</p></section><section><h2>Catalogue légal</h2><p>Les téléchargements de jeux homebrew autorisés seront proposés ici.</p></section></main>}
createRoot(document.getElementById("root")!).render(<App/>);
