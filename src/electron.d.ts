export type Game={id:string;title:string;path:string;platform:string};
declare global{interface Window{gameCenter?:{list:()=>Promise<Game[]>;importGames:()=>Promise<Game[]>;launch:(id:string)=>Promise<boolean>}}}
export {};
