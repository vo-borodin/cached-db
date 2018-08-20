import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  template: `<h2 mat-dialog-title>{{title}}</h2>
             <input matInput type="text"
                             [(ngModel)]="value"
                             placeholder="Enter value..." />
             <mat-dialog-actions>
               <button class="mat-raised-button" (click)="cancel()">Cancel</button>
               <button class="mat-raised-button mat-primary" (click)="save()">Save</button>
             </mat-dialog-actions>`
})
export class SetValueDialog {
  value: string = '';
  title: string = '';
  
  constructor(private dialogRef: MatDialogRef<SetValueDialog>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.value = data.value;
    this.title = data.title;
  }
  
  save() {
    this.dialogRef.close(this.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
