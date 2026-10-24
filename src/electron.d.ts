export type CatalogGame={file:string;title:string;platform:string;sizeBytes:number;installed:boolean;sourceAvailable:boolean;gameId:string|null};
export type Game={id:string;title:string;path:string;platform:string};
export type ImportResult={games:Game[];added:number;duplicates:number;rejected:{path:string;reason:string}[];canceled:boolean};
export type SaveFile={name:string;path:string;size:number};
declare global{interface Window{gameCenter?:{list:()=>Promise<Game[]>;catalog:()=>Promise<CatalogGame[]>;installStarter:(file:string)=>Promise<{games:Game[];catalog:CatalogGame[]}>;importGames:()=>Promise<ImportResult>;importFolder:()=>Promise<ImportResult>;launch:(id:string)=>Promise<boolean>;saves:(id:string)=>Promise<SaveFile[]>;backup:(id:string)=>Promise<{count:number;location:string}>}}}
export {};
