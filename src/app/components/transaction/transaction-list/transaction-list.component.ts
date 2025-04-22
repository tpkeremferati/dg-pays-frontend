import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../shared/services/transaction.service';
import { TransactionResponse } from '../../../shared/models/transaction.model';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayModule,
    RouterLink
  ],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  filterForm: FormGroup;
  transactions: TransactionResponse[] = [];
  displayedColumns: string[] = ['transactionId', 'maskedCardNumber', 'amount', 'responseCode', 'timestamp'];
  loading = false;
  error: string | null = null;

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      minAmount: ['', Validators.required],
      maxAmount: ['', Validators.required]
    });
  }

  onFilter() {
    if (this.filterForm.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.transactions = [];

    const formValue = this.filterForm.value;
    const formatDate = (date: Date) => date?.toISOString();

    this.transactionService.filterTransactions({
      startDate: formatDate(formValue.startDate),
      endDate: formatDate(formValue.endDate),
      minAmount: formValue.minAmount,
      maxAmount: formValue.maxAmount
    }).subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch transactions.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}