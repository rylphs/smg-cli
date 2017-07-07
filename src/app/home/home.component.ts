import { Component, OnInit, ChangeDetectorRef, 
  EventEmitter, ViewChildren, QueryList} from '@angular/core';
import {FileSystemService} from '../services/file-system.service'
import {WindowService} from '../services/window.service'
import {MenuService, MainMenu as Menu} from '../services/menu.service';
import {remote} from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  imagesDisplayed:string[] = [];
  currentFolder:string = "/home/07125220690/Documentos";
  selectedFolder:string;
  notifyme:EventEmitter<string> = new EventEmitter();
  
  constructor(private fs: FileSystemService, 
    private dRef:ChangeDetectorRef, 
    private menuService:MenuService, 
    private win:WindowService) {

    Menu.File.SelectFolder(this.showFolderSelectDialog.bind(this));
  }

  private onFolderSelected(folder){
    this.currentFolder = folder;
    setTimeout(()=> this.dRef.detectChanges(),0);
  }

  private showFolderSelectDialog(){
    this.win.openFolderSelectionWindow().subscribe(this.onFolderSelected.bind(this));
    /*remote.dialog.showOpenDialog({ properties: [ 'openDirectory']},
      (folders:string[]) =>{
        if(!folders || folders.length == 0) return;
        this.onFolderSelected.call(this, folders[0]);
    });*/
  }

  showPhotos(folder:string){
    var thisContext = this;
    this.selectedFolder = folder;
    this.imagesDisplayed = this.fs.getThumbnails(folder);
    this.fs.createThumbnails(folder, (folder, imgpath)=>{
      if(thisContext.selectedFolder != folder) return;
      this.imagesDisplayed.push(imgpath);
      this.dRef.detectChanges();
    });
  }

  ngOnInit() {
    this.menuService.showMainMenu();
  }

}
