import { app, BrowserWindow, screen, Tray, Menu, dialog, ipcMain } from 'electron';
import * as path from 'path';
import { MolecularApp } from "./src/app/support/molecular/molecular-app";

/*function createWindow() {
  global['windows'] = {};


  ipcMain.on("register-window", (event, data)=>{

    let windows = global['windows'].win || {};
    windows[data[0]] = data[1];
    global['windows'].win = windows;
    event.sender.send('window-registered', data[0]);
  });

   ipcMain.on("release-window", (event, id)=>{
     let windows = global['windows'].win;
     windows[id] = null;
     delete windows[id];
     global['windows'].win = windows;
   });

}*/

new MolecularApp({
  windows:{
    main: {
      webPreferences: {
        webSecurity: false
      },
      icon: 'assets/smg-cli.png'
    },
  },
  global: {
    appPath:  app.getAppPath(),
    concurrency: 2
  }
}).run();
