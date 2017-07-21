import {WindowService} from '../services/window.service';
import { Injectable, EventEmitter } from '@angular/core';

type StatusMessage = {status:string, complete:boolean}

@Injectable()
export class StatusService {
  private status:StatusMessage = {status:'idle', complete:true};

  constructor(private a:WindowService){}
 
  private statusChangeListener:EventEmitter<StatusMessage> = new EventEmitter();

  addListener(callback:(status:StatusMessage)=>void){
    this.statusChangeListener.subscribe(callback);
  }

  finalizeStatus(){
    this.status.complete = true;
    this.statusChangeListener.emit({status: this.status.status, complete: true});
  }

  setStatus(status:string){
    this.status.complete = false;
    this.status.status = status;
    this.statusChangeListener.emit({status: this.status.status, complete: false});
  }
}
