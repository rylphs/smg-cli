import { MolecularApp } from 'molecular/build/main';
import {PocService2} from './src/app/poc.service';
import { app, BrowserWindow, screen, Tray, Menu, dialog, ipcMain } from 'electron';
import * as path from 'path';
import { PocService } from './src/app/poc.service';
import 'reflect-metadata';


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



const m: MolecularApp = new MolecularApp({
  windows: {
    main: {
      webPreferences: {
        webSecurity: false
      },
      icon: 'assets/smg-cli.png'
    },
  },
  global: {
    appPath: app.getAppPath(),
    concurrency: 2
  }
});

 m.register('PocService', PocService);
 m.register('PocService2', PocService2);

 console.log('poc', Reflect.getOwnMetadataKeys(PocService));
 console.log('poc2', Reflect.getMetadata('design:paramtypes', PocService));
 console.log('poc3', Reflect.getOwnMetadata('design:paramtypes', PocService));
 console.log(Object.getOwnPropertyNames(PocService));
 console.log(Object.getOwnPropertyNames(PocService.prototype));
console.log((<any>Reflect).raphaelMetadata);
 //console.log('poc', Reflect.getMetadataKeys(PocService.constructor));

ipcMain.on('criar', (event, id) => {
  const baseURL = 'file://' + app.getAppPath() + '/index.html';
  const w = BrowserWindow.fromId(id);
  const nw = new BrowserWindow({
    parent: w
  });
  nw.webContents.openDevTools();
  nw.loadURL(baseURL + '#pocwindow');
})
