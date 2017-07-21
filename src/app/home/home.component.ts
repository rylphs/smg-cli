import {
  Component, OnInit, ChangeDetectorRef,
  EventEmitter, ViewChildren, QueryList, ReflectiveKey
} from '@angular/core';
import { FileSystemService } from '../services/file-system.service'
import { WindowService } from '../services/window.service'
import { MenuService, MainMenu as Menu } from '../services/menu.service';
import { remote, app, ipcRenderer } from 'electron';

import { Fires, ListenTo } from 'molecular/build/renderer';
import { PocService, PocService2 } from "app/poc.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rand: string;
  imagesDisplayed: string[] = [];
  currentFolder = '/home/07125220690/Documentos';
  selectedFolder: string;
  notifyme: EventEmitter<string> = new EventEmitter();

  constructor(private fs: FileSystemService, private poc: PocService,
    private dRef: ChangeDetectorRef,
    private menuService: MenuService,
    private win: WindowService) {
      this.rand = poc.random.toString();
      console.log(poc);
      poc.teste();
      poc.random = 936543;
    Menu.File.SelectFolder(this.showFolderSelectDialog.bind(this));
  }

  private onFolderSelected(folder) {
    this.currentFolder = folder;
    setTimeout(() => this.dRef.detectChanges(), 0);
  }

  private showFolderSelectDialog() {
    this.win.openFolderSelectionWindow().subscribe(this.onFolderSelected.bind(this));
  }

  showPhotos(folder: string) {
    const thisContext = this;
    this.selectedFolder = folder;
    this.imagesDisplayed = this.fs.getThumbnails(folder);
    this.fs.createThumbnails(folder, (folderCreated, imgpath) => {
      if (thisContext.selectedFolder !== folderCreated) return;
      this.imagesDisplayed.push(imgpath);
      this.dRef.detectChanges();
    });
  }

  abrirJanela() {
    ipcRenderer.send('criar', remote.getCurrentWindow().id);
  }

  @Fires('EventoA')
  enviarA() {
    console.log('remote:', remote.getCurrentWindow().id);
    return 'eventoB';
  }

  @Fires('EventoB')
  enviarB() {
    return 'evento B nao deveria ser capturado por ninguem';
  }

  ngOnInit() {
    console.log(ReflectiveKey.get(PocService).displayName);
    this.menuService.showMainMenu();
  }

}
