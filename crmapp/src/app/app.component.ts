import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SetValueDialog } from './dialogs/setvaluedialog.component';
import { ConfirmDialog } from './dialogs/confirmdialog.component';
import { ShowErrorDialog } from './dialogs/showerrordialog.component';
import { Create, Delete, Update } from './services/operations';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

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
    this.openSetValueDialog('Add New Child of Node', '').then((value) => {
      if (value && value.trim()) {
        var c = new Create(this.cache.getSelectedNode().id, value);
        this.cache.service.addOperation(c);
        this.cache.deselect();
      }
    });
  }
  
  addDelete() {
    var selectedNode = this.cache.getSelectedNode();
    var q = `Are you sure you want to delete the node "${selectedNode.value}" and all its descendants?`;
    this.openConfirmDialog('Delete Node', q).then((result) => {
      if (result) {
        var d = new Delete(selectedNode.id);
        this.cache.service.addOperation(d);
        this.cache.deselect();
      }
    });
  }
  
  addUpdate() {
    var selectedNode = this.cache.getSelectedNode();
    var oldValue = selectedNode.value;
    this.openSetValueDialog('Edit Node', selectedNode.value).then((value) => {
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
      this.openShowErrorDialog('Invalid changes', err.error).then(() => {
        this.cache.service.clear();
        this.cache.service.clearChanges();
      });
    });
  }
  
  resetTree() {
    this.source.service.resetNodes().subscribe(() => {
      this.cache.service.clear();
      this.cache.service.clearChanges();
      this.source.service.readAll();
    });
  }
  
  private openSetValueDialog(title: string, value: string) {
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
  
  private openConfirmDialog(title: string, question: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    
    dialogConfig.data = {
      title: title,
      question: question
    };
    
    const dialogRef = this.dialog.open(ConfirmDialog, dialogConfig);
    
    return dialogRef.afterClosed().toPromise();
  }
  
  private openShowErrorDialog(title: string, message: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    
    dialogConfig.data = {
      title: title,
      message: message
    }
    
    const dialogRef = this.dialog.open(ShowErrorDialog, dialogConfig);
    
    return dialogRef.afterClosed().toPromise();
  }
}
