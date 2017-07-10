import { Component, OnInit, 
  Input, ChangeDetectionStrategy } from '@angular/core';

import {Router} from "@angular/router";

import { WindowService } from '../services/services';
import {Routes} from '../config/config';
import { Events } from "app/config/event.service";

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  private index:number;
  @Input() images:string[];
  private detailWindow;

  constructor(private window:WindowService, private router: Router) { }

  ngOnInit() { 
    Events.SHOW_IMAGE.CHANGE_IMAGE.subscribe(this.onChangeImage.bind(this));
  }

  openImageDetailWindow(index:number){
    var image = this.images[index];
    var imageName = image.split('/').reverse()[0];
    
    var path = this.router.createUrlTree([Routes.IMAGE_DETAIL.path, image]);
    console.log(image, index, path.toString());
    this.detailWindow = this.window.openModalWindow(path.toString(), "Image " + imageName);
  }

  selectImage(index:number){
    this.index = index;
  }

  isTheImageSelected(index:number){
    return this.index === index;
  }

  onChangeImage(change:"next"|"prev"){ console.log("change", this.index);
    change === "next" ? this.index++ : this.index--;
    this.index = Math.max(0, Math.min(this.images.length-1, this.index));
    
    const baseURL = 'file://' + __dirname + '/index.html';
    var path = this.router.createUrlTree([Routes.IMAGE_DETAIL.path, this.images[this.index]]);

    var ps = path ? baseURL + "#/" + path.toString() : baseURL;
    this.detailWindow.loadURL(ps);
  }

}
