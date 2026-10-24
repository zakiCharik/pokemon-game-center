const {contextBridge,ipcRenderer}=require('electron');
const invoke=(channel,...args)=>ipcRenderer.invoke(channel,...args);
contextBridge.exposeInMainWorld('gameCenter',Object.freeze({list:()=>invoke('library:list'),importGames:()=>invoke('library:import'),launch:id=>invoke('library:launch',id),saves:id=>invoke('saves:list',id),backup:id=>invoke('saves:backup',id)}));
