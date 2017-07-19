import { app, BrowserWindow, screen, Tray, Menu, dialog, ipcMain } from 'electron';
import * as path from 'path';
import {MolecularApp} from 'molecular/build/main';
import 'molecular/shared-chunk';

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

// const objects = [];

// ipcMain.on('rand', (...args) => {
//   objects.push({id: objects.length, value: Math.random()});
// });

// class Abcd {
//   a = 1;
//   b = 2;

//   teste() {
//     return objects;
//   }
// }

// exports.teste = new Abcd();

const m = new MolecularApp({
  windows: {
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
});

ipcMain.on('criar', (event, id)=>{
  const baseURL = 'file://' + app.getAppPath() + '/index.html';
  var w = BrowserWindow.fromId(id);
  var nw = new BrowserWindow({
    parent: w
  });
  nw.webContents.openDevTools();
  nw.loadURL(baseURL + '#pocwindow');
})
