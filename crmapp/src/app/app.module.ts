import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SetValueDialog } from './dialogs/setvaluedialog.component';
import { ConfirmDialog } from './dialogs/confirmdialog.component';
import { ShowErrorDialog } from './dialogs/showerrordialog.component';
import { DBTreeViewComponent, CachTreeViewComponent } from './treeview/treeview.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTreeModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    HttpModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    SetValueDialog,
    ConfirmDialog,
    ShowErrorDialog,
    DBTreeViewComponent,
    CachTreeViewComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    SetValueDialog,
    ConfirmDialog,
    ShowErrorDialog,
  ]
})
export class AppModule { }
