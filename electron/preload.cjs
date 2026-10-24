const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('gameCenter',{list:()=>ipcRenderer.invoke('library:list'),importGames:()=>ipcRenderer.invoke('library:import'),launch:(id)=>ipcRenderer.invoke('library:launch',id)});
