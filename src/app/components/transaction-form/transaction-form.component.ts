import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { isValidCard, maskCard } from '../../utils/utils';

@Component({
  selector: 'app-Transaction-form',
  templateUrl: './Transaction-form.component.html',
  styleUrls: ['./Transaction-form.component.scss']
})
export class TransactionFormComponent {
  transactionForm: FormGroup;
  result: any = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      cardholderName: ['', Validators.required],
      pan: ['', [Validators.required, Validators.minLength(12)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.result = null;

    const formValue = this.transactionForm.value;
    if (!isValidCard(formValue.pan)) {
      this.errorMessage = 'Invalid card number (failed Luhn check)';
      return;
    }

    const payload = {
      cardholderName: formValue.cardholderName,
      pan: formValue.pan,
      expiryDate: formValue.expiryDate,
      amount: Number(formValue.amount)
    };

    this.transactionService.processTransaction(payload).subscribe({
      next: (res: any) => {
        this.result = {
          cardMasked: maskCard(res.pan),
          transactionId: res.transactionId,
          responseCode: res.responseCode,
          timestamp: res.timestamp,
          amount: res.amount
        };
      },
      error: () => {
        this.errorMessage = 'Failed to process the transaction.';
      }
    });
  }
}
