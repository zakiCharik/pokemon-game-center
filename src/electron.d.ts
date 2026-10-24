export type Game={id:string;title:string;path:string;platform:string};
export type SaveFile={name:string;path:string;size:number};
declare global{interface Window{gameCenter?:{list:()=>Promise<Game[]>;importGames:()=>Promise<Game[]>;launch:(id:string)=>Promise<boolean>;saves:(id:string)=>Promise<SaveFile[]>;backup:(id:string)=>Promise<{count:number;location:string}>}}}
export {};
