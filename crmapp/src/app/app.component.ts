import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";

import { Create, Delete, Update } from './services/cache.service';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@Component({
  template: `<div class="set-value-dialog">
              <h2 mat-dialog-title>{{title}}</h2>
              <input matInput [value]="value || ''"
                              placeholder="Enter value..." />
              <mat-dialog-actions>
                <button class="mat-raised-button"(click)="close()">Close</button>
                <button class="mat-raised-button mat-primary"(click)="save()">Save</button>
              </mat-dialog-actions>
            </div>`
})
export class SetValueDialog implements OnInit {
  value: string;
  title: string;
  
  constructor(private dialogRef: MatDialogRef<SetValueDialog>, @Inject(MAT_DIALOG_DATA) data) {
    this.value = data.value;
    this.title = data.title;
  }
  
  ngOnInit() {
    
  }
  
  save() {
    this.dialogRef.close(this.value);
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  title = 'cached-db'; 
  loading: boolean = false;

  constructor(private dialog: MatDialog) { }

  @ViewChild(CachTreeViewComponent)
  private cache: CachTreeViewComponent;
  @ViewChild(DBTreeViewComponent)
  private source: DBTreeViewComponent;
  @ViewChild('selectButton')
  private elSelectButton: ElementRef;
  @ViewChild('createButton')
  private elCreateButton: ElementRef;
  @ViewChild('deleteButton')
  private elDeleteButton: ElementRef;
  @ViewChild('updateButton')
  private elUpdateButton: ElementRef;
  @ViewChild('applyButton')
  private elApplyButton: ElementRef;
  @ViewChild('resetButton')
  private elResetButton: ElementRef;
  @ViewChild('mainContent')
  private elMainContent: ElementRef;
  @ViewChild('loader')
  private elLoader: ElementRef;

  ngOnInit() {
    this.buildCacheTree();
    this.buildSourceTree();
  }
  
  isMoveDisabled() {
    var node = this.source.getSelectedNode();
    return !node || this.cache.service.ids.indexOf(node.id) != -1;
  }
  
  isOperDisabled() {
    return !this.cache.getSelectedNode();
  }
  
  isApplyDisabled() {
    return !this.cache.service.applyable;
  }
  
  moveSelectedToCache() {
    this.cache.service.addId(this.source.getSelectedNode().id);
    this.buildCacheTree();
  }
  
  appendCreate() {
    this.openDialog("Add New Child of Node", "").then(data => {
      if (data && data.value.trim()) {
        var c = new Create(this.cache.getSelectedNode().id, data.value);
        this.cache.service.appendOperation(c);
      }
    });
  }
  
  appendDelete() {
    var selectedNode = this.cache.getSelectedNode();
    if (confirm("Are you sure you want to delete the node '" + selectedNode.value + "'?")) {
      var d = new Delete(selectedNode.id);
      this.cache.service.appendOperation(d);
    }
  }
  
  appendUpdate() {
    var selectedNode = this.cache.getSelectedNode();
    var oldValue = selectedNode.value;
    this.openDialog("Edit Node", selectedNode.value).then(data => {
      if (data && oldValue != data.value) {
        var u = new Update(selectedNode.id, data.value);
        this.cache.service.appendOperation(u);
      }
    });
  }
  
  applyChanges() {
    
  }
  
  resetTree() {
    this.loading = true;
    this.source.resetTree().toPromise().then(() => {
      this.loading = false;
      this.cache.service.clearIds();
      this.buildCacheTree();
      this.buildSourceTree();
    });
  }
  
  private openDialog(title: string, value: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    
    dialogConfig.data = {
      value: value,
      title: title
    };

    const dialogRef = this.dialog.open(SetValueDialog, dialogConfig);
    
    return dialogRef.afterClosed().toPromise();
  }
  
  private buildCacheTree() {
    this.loading = true;
    this.cache.getTree().then((resp) => {
      this.loading = false;
    });
  }
  
  private buildSourceTree() {
    this.loading = true;
    this.source.getTree().then((resp) => {
      this.loading = false;
    });
  }
}
