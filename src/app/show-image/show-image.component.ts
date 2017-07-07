import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  path:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.params.subscribe((f)=> this.path = f.imageid);
  }

}
