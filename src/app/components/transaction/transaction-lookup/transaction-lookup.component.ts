import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '../../../shared/services/transaction.service';
import { TransactionResponse } from '../../../shared/models/transaction.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-lookup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './transaction-lookup.component.html',
  styleUrls: ['./transaction-lookup.component.scss']
})
export class TransactionLookupComponent {
  lookupForm: FormGroup;
  result: TransactionResponse | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.lookupForm = this.fb.group({
      transactionId: ['', Validators.required]
    });
  }

  onSubmit() {
    this.result = null;
    this.errorMessage = null;

    const id = this.lookupForm.value.transactionId;

    this.transactionService.getTransaction(id).subscribe({
        next: (res: TransactionResponse) => {
          this.result = res;
        },
        error: (err) => {
          this.errorMessage = 'Transaction not found or lookup failed.';
        }
      });
  }
}
