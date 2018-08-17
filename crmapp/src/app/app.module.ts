import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent, SetValueDialog } from './app.component';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    SetValueDialog,
    DBTreeViewComponent,
    CachTreeViewComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    SetValueDialog
  ]
})
export class AppModule { }
