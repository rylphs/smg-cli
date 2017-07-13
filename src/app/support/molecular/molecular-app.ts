// import { app, BrowserWindow, screen, Tray, Menu, dialog, ipcMain } from 'electron';
// import { WindowConfig, WindowEntry, WindowManager } from "./window-manager";
// import { Utils } from "./utils";

// if (Utils.isServing()) {
//   require('electron-reload')(__dirname, {});
// }

// type PathConfiguration = {
//     path: string, window?: WindowEntry,
//     menu?: any, component: any
// }

// type PathEntry = PathConfiguration[];

// type AppConfiguration = {
//     events?: any,
//     windows: WindowConfig,
//     paths?: PathEntry,
//     menus?: any,
//     global?: any,
//     icon?: string;
// }

// class MolecularApp {
//     private winManager: WindowManager;
//     private mainWindow: any;
//     private appIcon:string;
//     private tray:any;

//     constructor(config: AppConfiguration) {
//         if(config.icon){
//             this.appIcon = app.getAppPath() + "/" + config.icon;
//             config.windows.main['icon'] = this.appIcon;
//             this.tray = new Tray(this.appIcon)
//         }
//         this.winManager = new WindowManager(config.windows);
//         global['AppConfig'] = config.global
//         try{
//             this.setUpApp();
//         }catch(e){}
        
//     }

//     private setUpApp(){
//         app.on('ready', () => {
//             this.mainWindow = this.winManager.createMainWindow();
//         });
//         app.on('window-all-closed', () => {
//             // On OS X it is common for applications and their menu bar
//             // to stay active until the user quits explicitly with Cmd + Q
//             if (process.platform !== 'darwin') {
//                 app.quit();
//             }
//         });

//         app.on('activate', () => {
//             // On OS X it's common to re-create a window in the app when the
//             // dock icon is clicked and there are no other windows open.
//             if (this.mainWindow === null) {
//                 this.mainWindow = this.winManager.createMainWindow();
//             }
//         });
//     }

//     run(): void {

//     }
// }