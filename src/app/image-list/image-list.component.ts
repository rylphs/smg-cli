import { Component, OnInit, 
  Input, ChangeDetectionStrategy } from '@angular/core';

import {Router} from "@angular/router";

import { WindowService } from '../services/services';
import {Routes} from '../config/config';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  private _folder:string;
  private selecteImage:string;
  @Input() images:string[];

  constructor(private window:WindowService, private router: Router) { }

  ngOnInit() { 
  
  }

  openImageDetailWindow(image:string){
    var imageName = image.split('/').reverse()[0];
    var path = this.router.createUrlTree([Routes.IMAGE_DETAIL.path, image]);
    this.window.openModalWindow(path.toString(), "Image " + imageName);
  }

  selectImage(image){
    this.selecteImage = image;
  }

  isTheImageSelected(image){
    return this.selecteImage == image;
  }

}
