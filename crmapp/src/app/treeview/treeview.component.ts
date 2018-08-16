import { Component} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { IService } from '../services/iservice.service';
import { Database } from '../services/database.service';
import { Cache } from '../services/cache.service';
import { Node } from '../models/node.model';

class TreeViewComponent {
  nestedTreeControl: NestedTreeControl<Node>;
  nestedDataSource: MatTreeNestedDataSource<Node>;

  constructor(public service: IService) {
    this.nestedTreeControl = new NestedTreeControl<Node>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.service.dataChange.subscribe(data => {
      this.nestedDataSource.data = data;
    });
  }

  getTree () {
    return this.service.getTree();
  }

  hasNestedChild = (_: number, nodeData: Node) => !!nodeData.children.length;

  private _getChildren = (node: Node) => node.children;
  
  private _selectedIds: Array<any> = [];
  
  rowClick(node) {
    if (!node.deleted) {
      node.selected = !node.selected;
      var index = this._selectedIds.indexOf(node.id);
      if (index == -1)
        this._selectedIds.push(node.id);
      else
        this._selectedIds.splice(index, 1);
    }
  }
  
  getSelectedIds(): Array<any> {
    return this._selectedIds;
  }
}

@Component({
  selector: 'db-tree-view',
  templateUrl: 'treeview.component.html',
  styleUrls: ['treeview.component.css']
})
export class DBTreeViewComponent extends TreeViewComponent {
  constructor(public service: Database) {
    super(service);
  }
  
  resetTree() {
    return this.service.resetNodes();
  }
}

@Component({
  selector: 'cach-tree-view',
  templateUrl: 'treeview.component.html',
  styleUrls: ['treeview.component.css']
})
export class CachTreeViewComponent extends TreeViewComponent {
  constructor(public service: Cache) {
    super(service);
  }
}
