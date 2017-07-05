import { Component, OnInit, ChangeDetectorRef, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import {FileSystemService} from '../services/file-system.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imagesDisplayed:string[] = [];
  currentFolder:string = "/home/07125220690/Documentos";
  notifyme:EventEmitter<string> = new EventEmitter();
  
  constructor(private fs: FileSystemService, private dRef:ChangeDetectorRef) { 
    fs.onSelectFolder((folder)=> {
      this.currentFolder = folder;
      setTimeout(()=> dRef.detectChanges(),0);
    });
  }

  mostrarFotos(folder:string){
    var thisContext = this;
    this.imagesDisplayed = this.fs.getThumbnails(folder);
    this.fs.createThumbnails(folder, (folder, imgpath)=>{
      this.imagesDisplayed.push(imgpath);
      this.dRef.detectChanges();
    });
  }

  ngOnInit() {
  }

}
