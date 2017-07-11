type WindowConfiguration = {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        type?: string,
        listenTo?:any,
        fires?:any,
        parent?: WindowConfiguration,
        modal?: boolean
}

type PathConfiguration = {
    path: string, window?: WindowEntry,
    menu?: any, component: any
}

export type PathEntry = PathConfiguration[];

export interface WindowEntry {
    [entry:string]: WindowConfiguration;
}

type AppConfiguration  = {
    events: any,
    windows: WindowEntry,
    paths: PathEntry,
    menus: any,
    global: any
}

export class ElectronAngularApp {
    constructor(config:AppConfiguration){}
    run():void{}
}