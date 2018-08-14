import { Component} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { Database } from '../services/database.service';
import { Cache } from '../services/cache.service';
import { Node } from '../models/node.model';

class TreeViewComponent {
  nestedTreeControl: NestedTreeControl<Node>;
  nestedDataSource: MatTreeNestedDataSource<Node>;

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<Node>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  hasNestedChild = (_: number, nodeData: Node) => !!nodeData.children.length;

  private _getChildren = (node: Node) => node.children;
}

@Component({
  selector: 'db-tree-view',
  templateUrl: 'treeview.component.html',
  styleUrls: ['treeview.component.css']
})
export class DBTreeViewComponent extends TreeViewComponent {
  constructor(private database: Database) {
    super();

    this.database.dataChange.subscribe(data => {
      this.nestedDataSource.data = data;
    });
  }

  getTree () {
    this.database.getDefaultTree();
  }
}

@Component({
  selector: 'cach-tree-view',
  templateUrl: 'treeview.component.html',
  styleUrls: ['treeview.component.css']
})
export class CachTreeViewComponent extends TreeViewComponent {
  constructor(private cache: Cache) {
    super();
  }

  getTree () {
    this.cache.getEmptyTree();
  }
}
