import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {remote, ipcRenderer} from 'electron';
import {Injectable} from '@angular/core';

const baseURL = 'file://' + __dirname + '/index.html';
const BrowserWindow = remote.BrowserWindow;

@Injectable()
export class WindowGuard implements CanActivate {

    
    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        let windows = remote.getGlobal("windows").win || {};
        let id = remote.getCurrentWindow().id;
        
        if(windows[id] && windows[id] === state.url){
            return true;
        }

        id = this.openModalWindow(state.url, remote.getCurrentWindow()).id;

        ipcRenderer.send("register-window", [id, state.url]);
        ipcRenderer.on("window-registered", (event, id)=>{
            let window = BrowserWindow.fromId(id);
            window.loadURL(this.getRoute(state.url));
            window.webContents.openDevTools();
            window = null;
        });
        
        
        return false;
    }


   private getRoute( path){
        path = path ? baseURL + "#" + path : baseURL;
        return path;
        
    }

  private openModalWindow(route, parent){
    return new BrowserWindow({parent: parent, modal: true, show: true});
  }

}