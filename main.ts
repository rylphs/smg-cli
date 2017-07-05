import { app, BrowserWindow, screen, Tray, Menu, dialog, ipcMain } from 'electron';
import * as path from 'path';
import {Events} from './src/app/config/events';


let appConfig = {
  appPath:  app.getAppPath(),
  concurrency: process.env.UV_THREADPOOL_SIZE || 4
}


let win, serve;

function selectFolder(){
  dialog.showOpenDialog({
    properties: [ 'openDirectory']
  }, (folders:string[]) =>{
    if(!folders || folders.length == 0) return;
    win.webContents.send(Events.FOLDER_SELECTED, folders[0]);
  });
}

const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {
  global['AppConfig'] = appConfig;

  const menuTemplate = [
    {label:"File", submenu: [
      {label:"Select Folder", click: selectFolder, accelerator: 'CommandOrControl+o'}, 
      {label:"Preferences"}]
    },
    {label:"Help", submenu: [{label: "About", role: "about"}]}
  ];

  



  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  const appIcon = new Tray(app.getAppPath() + '/assets/smg-cli.png')

  let electronScreen = screen;
  let size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    icon: app.getAppPath() + '/assets/smg-cli.png'
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  //throw e;
}
