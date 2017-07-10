import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FileSystemService} from '../services/services';

import {RouterParamMap} from '../util/router-param-map.decorator';
import { Events } from "app/config/event.service";

@Component({
  selector: 'show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
@RouterParamMap({imageid: "viewedImage"})
export class ShowImageComponent implements OnInit {
  @Output() onChange:EventEmitter<"next"|"prev"> = new EventEmitter();
  viewedImage:string;
  images:string[];

  constructor() { }

  ngOnInit() { 
    Events.SHOW_IMAGE.CHANGE_IMAGE.subscribe(this.t.bind(this));
  }

  t(v){console.log("recebi",v)}

  next(){
    console.log("next");
    Events.SHOW_IMAGE.CHANGE_IMAGE.next("next");
  }

  prev(){
    console.log("prev");
    Events.SHOW_IMAGE.CHANGE_IMAGE.next("prev");
  }

}
