import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";

import { Create, Delete, Update } from './services/operations';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@Component({
  template: `<div class="set-value-dialog">
              <h2 mat-dialog-title>{{title}}</h2>
              <input matInput type="text"
                              [(ngModel)]="value"
                              placeholder="Enter value..." />
              <mat-dialog-actions>
                <button class="mat-raised-button"(click)="close()">Close</button>
                <button class="mat-raised-button mat-primary"(click)="save()">Save</button>
              </mat-dialog-actions>
            </div>`
})
export class SetValueDialog implements OnInit {
  value: string = '';
  title: string = '';
  
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

  constructor(private dialog: MatDialog) { }

  @ViewChild(CachTreeViewComponent)
  private cache: CachTreeViewComponent;
  @ViewChild(DBTreeViewComponent)
  private source: DBTreeViewComponent;
  
  ngOnInit() {
    this.source.service.readAll();
  }
  
  isMoveDisabled() {
    var node = this.source.getSelectedNode();
    return !node || this.cache.service.contains(node.id);
  }
  
  isOperDisabled() {
    return !this.cache.getSelectedNode();
  }
  
  isApplyDisabled() {
    return !this.cache.service.applyable;
  }
  
  moveSelectedToCache() {
    this.cache.service.addNode(this.source.getSelectedNode().id);
    this.source.deselect();
  }
  
  addCreate() {
    this.openDialog("Add New Child of Node", "").then((value) => {
      if (value && value.trim()) {
        var c = new Create(this.cache.getSelectedNode().id, value);
        this.cache.service.addOperation(c);
        this.cache.deselect();
      }
    });
  }
  
  addDelete() {
    var selectedNode = this.cache.getSelectedNode();
    if (confirm("Are you sure you want to delete the node '" + selectedNode.value + "'?")) {
      var d = new Delete(selectedNode.id);
      this.cache.service.addOperation(d);
      this.cache.deselect();
    }
  }
  
  addUpdate() {
    var selectedNode = this.cache.getSelectedNode();
    var oldValue = selectedNode.value;
    this.openDialog("Edit Node", selectedNode.value).then((value) => {
      if (value && oldValue != value) {
        var u = new Update(selectedNode.id, value);
        this.cache.service.addOperation(u);
        this.cache.deselect();
      }
    });
  }
  
  applyChanges() {
    this.cache.service.applyChanges().subscribe((resp) => {
      this.source.service.readAll();
    }, (err) => {
      alert(err.error);
    });
  }
  
  resetTree() {
    this.source.resetTree().toPromise().then(() => {
      this.cache.service.clear();
      this.source.service.readAll();
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
}
