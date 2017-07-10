import { remote as Electron } from 'electron';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

const baseURL = 'file://' + __dirname + '/index.html';
const BrowserWindow = Electron.BrowserWindow;

@Injectable()
export class WindowService {
  private mainWindow;
  private md5;

  constructor() {
    this.md5 = Electron.require('md5');
    this.mainWindow = Electron.getCurrentWindow();
  }

  private generateWindow(config, path?) {
    path = path ? baseURL + "#/" + path : baseURL;
    var win = new BrowserWindow(config);
    win.loadURL(path);
    win.webContents.openDevTools();
    return win;
  }

  openModalWindow(route, title?){
    var options:any = {parent: this.mainWindow, modal: true, show: true};
    if(title) options.title = title;
    return this.generateWindow(options,route);
  }

   openFolderSelectionWindow(){
     var onFolderChosen = new Subject<string>();
      Electron.dialog.showOpenDialog({ properties: [ 'openDirectory']},
        (folders:string[]) =>{
          if(!folders || folders.length == 0) return;
          onFolderChosen.next(folders[0]);
      });
      return onFolderChosen;
  }

}
