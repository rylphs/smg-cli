import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {remote} from 'electron';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {StatusService} from './status.service';
import {MenuService, Menu} from '../services/menu.service';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  animations: [
  trigger('enterAnimation', [
    state('in', style({ opacity: 1})),
    state('void', style({ opacity: 0})),
    transition('void => *', animate('1000ms ease-in')),
    transition('* => void', animate('1000ms ease-out'))
  ])
]
})
export class StatusComponent implements OnInit {
  private msg:string = "";
  display:boolean = false;

  constructor(private status:StatusService, private dRef:ChangeDetectorRef, private menuService: MenuService) { 
    status.addListener((status:{status:string, complete:boolean})=>{
      this.msg = status.status;
      this.display = ! status.complete;
      dRef.detectChanges();
    });
  }

  ngOnInit() { }

}
