const {app,BrowserWindow,ipcMain,dialog}=require('electron');
const {join,extname,basename}=require('node:path');
const {mkdir,readFile,writeFile}=require('node:fs/promises');
const {spawn}=require('node:child_process');
const {existsSync}=require('node:fs');
const {pathToFileURL}=require('node:url');
const DEV_URL='http://127.0.0.1:5173';
const extensions=new Set(['.gb','.gbc','.gba']);
const store=()=>join(app.getPath('userData'),'library.json');
async function load(){try{return JSON.parse(await readFile(store(),'utf8'))}catch(e){if(e.code==='ENOENT')return [];throw e}}
async function save(games){await mkdir(app.getPath('userData'),{recursive:true});await writeFile(store(),JSON.stringify(games,null,2))}
function emulator(){const candidates=['/Applications/mGBA.app/Contents/MacOS/mGBA',join(app.getPath('home'),'Applications/mGBA.app/Contents/MacOS/mGBA')];return candidates.find(existsSync)}
function createWindow(){const win=new BrowserWindow({width:1100,height:760,webPreferences:{preload:join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:false}});if(!app.isPackaged){win.loadURL(DEV_URL)}else{win.loadFile(join(__dirname,'../dist/index.html'))}}
app.whenReady().then(()=>{ipcMain.handle('library:list',load);
ipcMain.handle('library:import',async()=>{const result=await dialog.showOpenDialog({properties:['openFile','multiSelections'],filters:[{name:'Game Boy ROMs',extensions:['gb','gbc','gba']}]});if(result.canceled)return load();const games=await load();for(const path of result.filePaths){if(!extensions.has(extname(path).toLowerCase()))continue;if(!games.some(g=>g.path===path)){games.push({id:Buffer.from(path).toString('base64'),title:basename(path,extname(path)),path,platform:extname(path).slice(1).toUpperCase()})}}await save(games);return games});
ipcMain.handle('library:launch',async(_event,id)=>{const games=await load();const game=games.find(g=>g.id===id);if(!game||!extensions.has(extname(game.path).toLowerCase()))throw new Error('Jeu introuvable');if(!existsSync(game.path))throw new Error('Fichier ROM introuvable');const executable=emulator();if(!executable)throw new Error('Installe mGBA.app dans /Applications');const child=spawn(executable,[game.path],{detached:true,stdio:'ignore'});child.on('error',err=>console.error('mGBA:',err));child.unref();return true});
createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})});app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});