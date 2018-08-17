import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatTreeModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DBTreeViewComponent,
    CachTreeViewComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
