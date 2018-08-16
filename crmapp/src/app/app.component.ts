import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { OperationEnum } from './services/cache.service';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  title = 'cached-db'; 
  loading: boolean = false;

  constructor() { }

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
  
  moveSelectedToCache() {
    this.cache.service.ids = this.source.getSelectedIds();
    this.buildCacheTree();
  }
  
  appendCreate() {
    
  }
  
  appendDelete() {
    /*this.cache.service.appendOperation(OperationEnum.Delete, {
        id: this.cache.getSelectedIds()[0]
    });*/
  }
  
  appendUpdate() {
    
  }
  
  applyChanges() {
    
  }
  
  resetTree() {
    this.loading = true;
    this.source.resetTree().toPromise().then(() => {
      this.loading = false;
      this.cache.service.ids = [];
      this.buildCacheTree();
      this.buildSourceTree();
    });
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
