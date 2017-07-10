import {Injectable} from '@angular/core';
import { remote as Electron} from 'electron';
import {Subject} from 'rxjs/Subject';
import {ElectronMenu} from '../util/electron-menu';

export interface ActionMenuItem{
    (callback:()=>void):void;
    __config?:any;
}

export var MainMenu = {
    File : {
        SelectFolder: <ActionMenuItem> {
            __config:{ accelerator: "CommandOrControl+o"}
        },
        Preferences: <ActionMenuItem> {
            __config:{ accelerator: "CommandOrControl+p"}
        }
    },
    Help: {About: <ActionMenuItem> {} }
};


@Injectable()
export class MenuService{
    private mainMenu:Electron.Menu;

    constructor(){
        var e = new ElectronMenu();
        this.mainMenu = e.generateMenu(MainMenu);
    }

    showMainMenu(){
        Electron.Menu.setApplicationMenu(this.mainMenu);
    }

}