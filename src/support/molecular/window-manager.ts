import {remote} from 'electron';

const baseURL = 'file://' + __dirname + '/index.html';

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

    createMainWindow() {
        let win = new Electron.BrowserWindow(this.config.main);
    }
}