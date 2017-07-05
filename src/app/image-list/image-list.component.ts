import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  private _folder:string;
  @Input() images:string[];

  constructor(private fs:FileSystemService) { }

  ngOnInit() {  }

}
