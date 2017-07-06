import {Injectable} from '@angular/core';
import { remote as Electron} from 'electron';
import {Subject} from 'rxjs/Subject';

export interface ActionMenuItem{
    (callback:()=>void):void;
    __config?:any;
}

export var Menu = {
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
    private menu:Electron.Menu;

    constructor(){
        this.menu = new Electron.Menu();
        var menus = this.generateMenuItem(Menu);
        for(let i in menus){
            this.menu.append(new Electron.MenuItem(menus[i]));
        }
    }

    private fromCamelCase(camelCased:string){
        return camelCased.replace(/([a-z])([A-Z])/, '$1 $2');
    }

    private generateMenuItem(items:any){
        if(!items) return null;

        var menus = [];
        for(let i in items){
            if(i == "__config") continue;
            var sub = new Subject();
            var item = items[i];
            var menuItem:any = {};
            menuItem.label = this.fromCamelCase(i);

            if(item.__config){
                var aditional = item.__config;
                for(let prop in aditional){
                    menuItem[prop] = aditional[prop];
                }
                delete item.__config;
            }
            if(Object.keys(item).length == 0){
                items[i] = sub.subscribe.bind(sub);
                menuItem.click = sub.next.bind(sub);
            }
            else{
                menuItem.submenu = this.generateMenuItem(item);
            }
            
            menus.push(menuItem);
        }
        return menus; 
    }

    showMenu(){
        Electron.Menu.setApplicationMenu(this.menu);
    }

}