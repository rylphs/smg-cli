import { WindowConfig, WindowEntry, WindowManager } from "support/molecular/window-manager";

type PathConfiguration = {
    path: string, window?: WindowEntry,
    menu?: any, component: any
}

export type PathEntry = PathConfiguration[];

type AppConfiguration  = {
    events: any,
    windows: WindowConfig,
    paths: PathEntry,
    menus: any,
    global: any
}

export class ElectronAngularApp {
    private winManager: WindowManager;

    constructor(config:AppConfiguration){
        this.winManager = new WindowManager(config.windows);
    }

    run():void {
        this.winManager.createMainWindow();
    }
}