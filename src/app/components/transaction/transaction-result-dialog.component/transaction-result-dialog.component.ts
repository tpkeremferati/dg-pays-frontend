import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-result-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './transaction-result-dialog.component.html',
  styleUrls: ['./transaction-result-dialog.component.scss']
})
export class TransactionResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TransactionResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
