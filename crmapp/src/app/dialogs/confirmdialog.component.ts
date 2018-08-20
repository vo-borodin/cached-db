import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  template: `<h2 mat-dialog-title>{{title}}</h2>
             <div class="mat-expansion-panel-content">{{question}}</div>
             <mat-dialog-actions>
               <button class="mat-raised-button" (click)="cancel()">Cancel</button>
               <button class="mat-raised-button mat-primary" (click)="confirm()">Confirm</button>
             </mat-dialog-actions>`
})
export class ConfirmDialog {
  title: string = '';
  question: string = '';
  
  constructor(private dialogRef: MatDialogRef<ConfirmDialog>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.question = data.question;
  }
  
  confirm() {
    this.dialogRef.close(true);
  }
  
  cancel() {
    this.dialogRef.close(false);
  }
}
