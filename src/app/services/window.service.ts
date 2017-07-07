import { remote as Electron } from 'electron';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

const baseURL = 'file://' + __dirname + '/index.html';
const BrowserWindow = Electron.BrowserWindow;

@Injectable()
export class WindowService {
  private mainWindow;

  constructor() {
    this.mainWindow = Electron.getCurrentWindow();
  }

  private generatePath(path: string, ...parameters) {
    if (!path) return baseURL;
    if (parameters && parameters.length > 0) path += "/" + parameters.join("/");
    return baseURL + "#/" + path;
  }

  private generateWindow(config, path?, ...parameters) {
    var win = new BrowserWindow(config);
    win.loadURL(this.generatePath(path, parameters));
    return win;
  }

  openModalWindow(route, ...parameters){
    this.generateWindow(
      {parent: this.mainWindow, modal: true, show: true},
      route, parameters);
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
