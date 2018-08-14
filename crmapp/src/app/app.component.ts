import { Component, OnInit, ViewChild } from '@angular/core';

import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  title = 'cached-db';

  constructor() { }

  @ViewChild(CachTreeViewComponent) cache: CachTreeViewComponent;
  @ViewChild(DBTreeViewComponent) source: DBTreeViewComponent;

  ngOnInit() {
    this.cache.getTree();
    this.source.getTree();
  }
}
