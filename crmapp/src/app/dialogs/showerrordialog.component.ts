import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  template: `<h2 mat-dialog-title>{{title}}</h2>
             <div class="mat-expansion-panel-content">{{message}}</div>
             <mat-dialog-actions>
               <button class="mat-raised-button" (click)="ok()">OK</button>
             </mat-dialog-actions>`
})
export class ShowErrorDialog {
  title: string = '';
  message: string = '';
  
  constructor(private dialogRef: MatDialogRef<ShowErrorDialog>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.message = data.message;
  }
  
  ok() {
    this.dialogRef.close(false);
  }
}