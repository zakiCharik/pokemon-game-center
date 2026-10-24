import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import type{Game}from'./electron';
import './style.css';
function App(){const[games,setGames]=useState<Game[]>([]);const[error,setError]=useState('');const[busy,setBusy]=useState(false);
useEffect(()=>{window.gameCenter?.list().then(setGames).catch(e=>setError(String(e)))},[]);
async function importGames(){if(!window.gameCenter)return;setBusy(true);setError('');try{setGames(await window.gameCenter.importGames())}catch(e){setError(String(e))}finally{setBusy(false)}}
async function launch(id:string){setError('');try{await window.gameCenter?.launch(id)}catch(e){setError(String(e))}}
return <main><header><div><h1>Pokémon Game Center</h1><p>Bibliothèque Game Boy · Game Boy Color · Game Boy Advance</p></div><button disabled={busy||!window.gameCenter} onClick={importGames}>+ Importer des jeux</button></header>{error&&<p role="alert" className="error">{error}</p>}<section><h2>Mes jeux ({games.length})</h2>{games.length===0?<p>Aucun jeu importé. Ajoute des fichiers .gb, .gbc ou .gba obtenus légalement.</p>:<div className="grid">{games.map(g=><article key={g.id}><span className="chip">{g.platform}</span><h3>{g.title}</h3><button onClick={()=>launch(g.id)}>Jouer ▶</button></article>)}</div>}</section><section><h2>Catalogue légal</h2><p>Prochaine étape : catalogue de jeux homebrew dont la redistribution est autorisée.</p></section>{!window.gameCenter&&<p>Ouvre l'application avec <code>npm run dev</code> pour activer l'import et l'émulation.</p>}</main>}
createRoot(document.getElementById('root')!).render(<App/>);
