const {app,BrowserWindow,ipcMain,dialog}=require('electron');
const {join,extname,basename,resolve}=require('node:path');
const {mkdir,readFile,writeFile,copyFile,stat,readdir}=require('node:fs/promises');
const {spawn}=require('node:child_process');
const {existsSync}=require('node:fs');
const {createHash}=require('node:crypto');
const DEV_URL='http://127.0.0.1:5173';
const extensions=new Set(['.gb','.gbc','.gba']);
const store=()=>join(app.getPath('userData'),'library.json');
const backupRoot=()=>join(app.getPath('userData'),'save-backups');
async function load(){try{const games=JSON.parse(await readFile(store(),'utf8'));return Array.isArray(games)?games:[]}catch(e){if(e.code==='ENOENT')return [];throw e}}
async function save(games){await mkdir(app.getPath('userData'),{recursive:true});await writeFile(store(),JSON.stringify(games,null,2))}
function emulator(){return ['/Applications/mGBA.app/Contents/MacOS/mGBA',join(app.getPath('home'),'Applications/mGBA.app/Contents/MacOS/mGBA')].find(existsSync)}
async function findGame(id){const game=(await load()).find(g=>g.id===id);if(!game||!extensions.has(extname(game.path).toLowerCase()))throw new Error('Jeu introuvable');return game}
async function saveFiles(game){const dir=resolve(game.path,'..');const stem=basename(game.path,extname(game.path));const names=[stem+'.sav',stem+'.sa1',stem+'.sa2',stem+'.srm'];const result=[];for(const name of names){const path=join(dir,name);if(existsSync(path)){const info=await stat(path);if(info.isFile())result.push({path,name,size:info.size})}}return result}
function createWindow(){const win=new BrowserWindow({width:1100,height:760,webPreferences:{preload:join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:false}});if(!app.isPackaged)win.loadURL(DEV_URL);else win.loadFile(join(__dirname,'../dist/index.html'))}
app.whenReady().then(()=>{
ipcMain.handle('library:list',load);
async function collectFiles(paths){const found=[];const rejected=[];for(const path of paths){try{const info=await stat(path);if(info.isDirectory()){const entries=await readdir(path,{withFileTypes:true});for(const entry of entries){if(entry.isFile())found.push(join(path,entry.name))}}else if(info.isFile())found.push(path)}catch(e){rejected.push({path,reason:e.message})}}return {found,rejected}}
async function importPaths(paths){const {found,rejected}=await collectFiles(paths);const games=await load();let added=0,duplicates=0;for(const path of found){const ext=extname(path).toLowerCase();if(!extensions.has(ext)){rejected.push({path,reason:'Extension non prise en charge'});continue}try{const info=await stat(path);if(info.size===0||info.size>64*1024*1024){rejected.push({path,reason:'Taille de ROM invalide'});continue}if(games.some(g=>g.path===path)){duplicates++;continue}games.push({id:createHash('sha256').update(path).digest('hex'),title:basename(path,ext),path,platform:ext.slice(1).toUpperCase()});added++}catch(e){rejected.push({path,reason:e.message})}}if(added)await save(games);return {games,added,duplicates,rejected,canceled:false}}
ipcMain.handle('library:import',async()=>{const result=await dialog.showOpenDialog({properties:['openFile','multiSelections'],filters:[{name:'Game Boy ROMs',extensions:['gb','gbc','gba']}]});if(result.canceled)return {games:await load(),added:0,duplicates:0,rejected:[],canceled:true};return importPaths(result.filePaths)});
ipcMain.handle('library:import-folder',async()=>{const result=await dialog.showOpenDialog({properties:['openDirectory']});if(result.canceled)return {games:await load(),added:0,duplicates:0,rejected:[],canceled:true};return importPaths(result.filePaths)});
ipcMain.handle('library:launch',async(_event,id)=>{const game=await findGame(id);if(!existsSync(game.path))throw new Error('Fichier ROM introuvable');const executable=emulator();if(!executable)throw new Error('Installe mGBA.app dans /Applications');return new Promise((ok,fail)=>{const child=spawn(executable,[game.path],{detached:true,stdio:'ignore'});child.once('error',fail);child.once('spawn',()=>{child.unref();ok(true)})})});
ipcMain.handle('saves:list',async(_event,id)=>saveFiles(await findGame(id)));
ipcMain.handle('saves:backup',async(_event,id)=>{const game=await findGame(id);const files=await saveFiles(game);if(!files.length)throw new Error('Aucune sauvegarde trouvée à côté de la ROM');const dir=join(backupRoot(),game.id,new Date().toISOString().replace(/[:.]/g,'-'));await mkdir(dir,{recursive:true});for(const f of files)await copyFile(f.path,join(dir,f.name));return {count:files.length,location:dir}});
createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});