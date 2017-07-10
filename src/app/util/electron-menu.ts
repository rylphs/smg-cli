import { remote as Electron} from 'electron';
import {Subject} from 'rxjs/Subject';

export class ElectronMenu {

    generateMenu(template:any){
        var menu = new Electron.Menu();
        var menus = this.generateMenuItem(template);
        for(let i in menus){
            menu.append(new Electron.MenuItem(menus[i]));
        }
        return menu;
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
}