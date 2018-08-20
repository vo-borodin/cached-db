import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
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

  hasNestedChild = (_: number, nodeData: Node) => !!nodeData.children.length;

  private _getChildren = (node: Node) => node.children;
  
  private _prevClickedNode: Node = null;
  private _selectedNode: Node = null;
  
  rowClick(node) {
    if (!node.deleted) {
      if (this._prevClickedNode && this._prevClickedNode != node)
        this._prevClickedNode.selected = false;
      this._prevClickedNode = node;
      node.selected = !node.selected;
      if (node.selected)
        this._selectedNode = node;
      else
        this._selectedNode = null;
    }
  }
  
  getSelectedNode(): Node {
    return this._selectedNode;
  }
  
  deselect() {
    this.rowClick(this._selectedNode);
  }
}

@Component({
  selector: 'db-tree-view',
  templateUrl: 'treeview.component.html',
  styleUrls: ['treeview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DBTreeViewComponent extends TreeViewComponent {
  constructor(public service: Database) {
    super(service);
  }
}

@Component({
  selector: 'cach-tree-view',
  templateUrl: 'treeview.component.html',
  styleUrls: ['treeview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CachTreeViewComponent extends TreeViewComponent {
  constructor(public service: Cache) {
    super(service);
  }
}
