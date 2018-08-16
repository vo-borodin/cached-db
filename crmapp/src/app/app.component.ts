import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('editButton')
  private elSelectButton: ElementRef;
  @ViewChild('applyButton')
  private elApplyButton: ElementRef;
  @ViewChild('resetButton')
  private elResetButton: ElementRef;
  @ViewChild('mainContent')
  private elMainContent: ElementRef;
  @ViewChild('loader')
  private elLoader: ElementRef;

  ngOnInit() {
    
    
    this.cache.getTree();
    this.source.getTree();
  }
  
  resetTree() {
    this.loading = true;
    this.source.resetTree().toPromise().then(() => {
      this.loading = false;
      this.cache.getTree();
      this.source.getTree();
    });
  }
  
  testLoader() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  }
}
