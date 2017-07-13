import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/components/common/api';
import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss']
})
export class FolderTreeComponent implements OnInit {
  files:TreeNode[];
  selectedFile: TreeNode;
  _folder:string;
  @Input() aaa:string;
  @Output() onSelect: EventEmitter<string> = new EventEmitter();

  constructor(private fs: FileSystemService,  private dRef:ChangeDetectorRef) {
 
  }

  @Input() set folder(folder:string){
    this._folder = folder;
    this.files = this.createTreeNode(this._folder);
  }

  get folder(){
    return this._folder;
  }

  ngOnInit() { }

  ngAfterViewInit(){ }

   private createTreeNode(base) {
        var nodes: TreeNode[] = [];
        var folders = this.fs.getFolders(base);
        for (let i in folders) {
            var folder = folders[i];
            var node: TreeNode = {
                "label": folder,
                "data": base + '/' + folder,
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "leaf": false,
            };
            nodes.push(node);
        };
        return nodes;
    }

    loadNode(event) {
        if (event.node) {
            if (event.node.children && event.node.children.length > 0) return;
            event.node.children = this.createTreeNode(event.node.data);
            event.node.leaf = event.node.children.length == 0;
        }
    }

    nodeSelect(event) {
        this.onSelect.emit(event.node.data);
    }

    nodeUnselect(event) {}

}
