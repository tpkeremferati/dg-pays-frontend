import { Routes } from '@angular/router';
import { TransactionFormComponent } from './components/transaction/transaction-form/transaction-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TransactionLookupComponent } from './components/transaction/transaction-lookup/transaction-lookup.component';
import { TransactionListComponent } from './components/transaction/transaction-list/transaction-list.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'transaction', component: TransactionFormComponent },
    { path: 'transactions', component: TransactionListComponent },
    { path: 'lookup', component: TransactionLookupComponent }
  ];
  