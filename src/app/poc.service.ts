import {ipcMain, ipcRenderer} from 'electron';

function Service(constr){}

@Service
export class PocService2 {
    public random: number;

    constructor(){
        this.random = Math.round(Math.random() * 1000);
    }

    teste() {
        console.log(this.random);
        console.log('main', ipcMain);
        console.log('renderer', ipcRenderer);
    }
}

@Service
export class PocService {
    public random: number;
    public t:any = ()=>{console.log('naoda')};

    constructor(public dep: PocService2) {
        this.t = 456;
        this.random = dep.random / 100;
    }

    teste() {
        console.log(this.random);
        console.log('main', ipcMain);
        console.log('renderer', ipcRenderer);
    }
}

/*Reflect.defineMetadata('design:paramtypesss', [PocService2], PocService);
console.log('ipcMain?', (ipcMain !== undefined));
console.log(Reflect.metadata('design:paramtypes', [PocService2]));
console.log((<any>Reflect).raphaelMetadata);

//console.log(PocService, (<any>PocService).__meta);*/