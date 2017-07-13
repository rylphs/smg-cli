import {remote, screen, BrowserWindow, app} from 'electron';
import { Utils } from "./utils";


const baseURL = 'file://' + app.getAppPath() + '/index.html';

export type WindowEntry = Electron.BrowserWindowConstructorOptions | {
    parent?: WindowEntry; //TODO: Check wheather parent should be string instead.
    listenTo?: any,
    fires?: any,
}

export interface WindowConfig {
    [entry:string]: WindowEntry;
}

export class WindowManager {
    private windows = {};
    private config:any;

    constructor(config:WindowConfig){
        this.config = config; //TODO: parse window configuration;
    }

    private createWindow(config){
        let electronScreen = screen;
        let size = electronScreen.getPrimaryDisplay().workAreaSize;
        config.width = config.width || size.width;
        config.height = config.height || size.height;
        config.x = config.x || 0;
        config.y = config.y || 0;

        return new BrowserWindow(config);
        
    }

    createMainWindow() {
        let win = this.createWindow(this.config.main);
        console.log(baseURL);
        win.loadURL(baseURL);
        if (Utils.isServing()) {
            win.webContents.openDevTools();
         }
        return win;
    }

}