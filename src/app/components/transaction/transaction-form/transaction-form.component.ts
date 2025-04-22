import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../../shared/services/transaction.service';
import { isValidCard, maskCard } from '../../../shared/utilities/utilities';
import { TransactionResponse } from '../../../shared/models/transaction.model';
import { TransactionResultDialogComponent } from '../transaction-result-dialog.component/transaction-result-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  providers: [TransactionService],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  transactionForm: FormGroup;
  result: any = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private dialog: MatDialog) {
    this.transactionForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(12)]],
      expiryDate: [''],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.result = null;

    const formValue = this.transactionForm.value;
    if (!isValidCard(formValue.cardNumber)) {
      this.errorMessage = 'Invalid card number (failed Luhn check)';
      return;
    }
    
const payload = {
    cardholderName: formValue.cardholderName,
    cardNumber: formValue.cardNumber,
    expiryDate: formValue.expiryDate,
    amount: Number(formValue.amount)
  };

    this.transactionService.processTransaction(formValue).subscribe({
        next: (res: TransactionResponse) => {
            this.dialog.open(TransactionResultDialogComponent, {
                data: {
                  transactionId: res.transactionId,
                  maskedCardNumber: res.maskedCardNumber,
                  amount: res.amount,
                  responseCode: res.responseCode,
                  timestamp: res.timestamp
                },
                width: '400px',
                panelClass: 'bank-dialog'
              });
      },
      error: (err) => {
        console.error('Transaction failed:', err);
    
        if (err?.error?.message) {
          this.errorMessage = `Transaction failed: ${err.error.message}`;
        } else if (err?.status) {
          this.errorMessage = `Transaction failed with status ${err.status}`;
        } else {
          this.errorMessage = 'Transaction failed. Please try again.';
        }
      }
    });
  }
}
