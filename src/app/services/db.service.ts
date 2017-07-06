import {Injectable} from '@angular/core';
import {remote as Electron} from 'electron';
import {AppConfig} from '../config/config';
import {FileSystemService} from './file-system.service';

@Injectable()
export class DBService {
    private db:any;
    private md5: any;

    constructor(private fs:FileSystemService){
        this.md5 = Electron.require('md5');
        var low = Electron.require('low');
        this.fs.mkdirtree(AppConfig.dbLocation);
        this.db = low(AppConfig.dbLocation);
        this.db.defaults({ photos: [] }).write();
    }

    getResourceEntry(path:string, location:string){
        var id = 
        this.db.get(location)
            .find({ id: 1 })
            .value()
    } 
}