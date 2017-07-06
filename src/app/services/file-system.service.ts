import { Injectable, EventEmitter } from '@angular/core';
import { StatusService } from '../status/status.service';
import { remote as Electron, ipcRenderer} from 'electron';
import {AppConfig} from '../config/config';
import {Messages} from '../config/messages';
import {Events} from '../config/events';

@Injectable()
export class FileSystemService {
    _thumbs: any;
    fs: any;
    path: any;
    sharp: any;
    async: any;
    currentFolder:string;
    md5: any;
    onFolderChanged : EventEmitter<string> = new EventEmitter();

    mkdirtree(base){
        if(!base || base === '') return;
        var path = this.path.parse(base);
         
        try { this.fs.accessSync(path.dir); } catch (e) {
            this.mkdirtree(path.dir);
        }
        try { this.fs.accessSync(base); } catch (e) {
            this.fs.mkdirSync(base, 0o744);
        }
    }

    get thumbs() {
        if (!this._thumbs) {
            this._thumbs = AppConfig.thumbs
        }
        return this._thumbs;
    }

    constructor(private statusService:StatusService) {
        this.md5 = Electron.require('md5');
        this.fs = Electron.require('fs');
        this.path = Electron.require('path');
        this.sharp = Electron.require('sharp');
        this.async = Electron.require('async');

        ipcRenderer.on(Events.FOLDER_SELECTED, (event:any, folder:string)=>{
            this.onFolderChanged.emit(folder);
        });
    }

    private isImage(file: string): boolean {
        return file.match(/\.[jJ][pP][gG]$/) != null;
    }

    private getOrCreateThumbsDir(folder: string) {
        var thumbs = this.path.join(this.thumbs, this.md5(folder));
        this.mkdirtree(thumbs);
        return thumbs;
    }

    private createThumbnail(folder, fileCreateCallback, file, completeCallback) {
        if(this.currentFolder != folder){
            completeCallback();
            return;
        } 
        var thumbs = this.path.join(this.thumbs, this.md5(folder));
        var dst = this.path.join(thumbs, file);
        var src = this.path.join(folder, file);
        if (this.fs.lstatSync(src).isDirectory()) {
            completeCallback();
            return;
        }
        if (!this.isImage(file)) {
            completeCallback();
            return;
        }
        try {
            this.fs.accessSync(dst);
             completeCallback();
        } catch (e) {
            fileCreateCallback = fileCreateCallback.bind({}, folder, dst);
            this.sharp(src).resize(null, AppConfig.thumbsSize).toFile(dst).then(function () {
                fileCreateCallback()
                completeCallback();
            });
        }
    }

    onSelectFolder(callback:(path:string)=>void){
       this.onFolderChanged.subscribe(callback);
    }

    getFolders(base: string) {
        return this.fs.readdirSync(base)
            .filter(file => this.fs.lstatSync(this.path.join(base, file)).isDirectory());
    }

    getImageFiles(base: string) {
        if (!base) return [];
        try {
            return this.fs.readdirSync(base)
                .filter(file => !this.fs.lstatSync(this.path.join(base, file)).isDirectory())
                .filter(this.isImage)
                .map(file => this.path.join(base, file));
        } catch (e) { return [] };

    }

    getThumbnails(base: string) {
        if (!base) return [];
        base = this.getOrCreateThumbsDir(base);
        try {
            return this.fs.readdirSync(base)
                .filter(file => !this.fs.lstatSync(this.path.join(base, file)).isDirectory())
                .filter(this.isImage)
                .map(file => this.path.join(base, file));
        } catch (e) { return [] };

    }

    createThumbnails(folder: string, fileCreateCallback: (folder: string, file: string) => any) {
        this.currentFolder = folder;
        var statusService = this.statusService;
        statusService.setStatus(Messages.THUMBS_GENERATION);
        if (!folder || folder == '.thumbs') return;

        var createThumbnail = this.createThumbnail.bind(this, folder, fileCreateCallback);

        var callback = (processedFolder, err, files) => {
            var thumbs = this.getOrCreateThumbsDir(folder);

            this.async.eachLimit(files, AppConfig.concurrency, createThumbnail, function (err) {
                if (err) {
                    throw err;
                }
                statusService.finalizeStatus();
            });
        }

        this.fs.readdir(folder, callback.bind(this, folder));
    }
}
