import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransactionResponse } from '../models/transaction.model';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = 'https://localhost:7189';

  constructor(private http: HttpClient) {}

  processTransaction(payload: any): Observable<TransactionResponse> {
    console.log('sending request 1');
    return this.http.post<TransactionResponse>(`${this.baseUrl}/process`, payload);
  }

  getTransaction(id: string): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.baseUrl}/${id}`);
  }

  filterTransactions(params: {
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
  }): Observable<TransactionResponse[]> {
    let httpParams = new HttpParams();
  
    if (params.startDate) httpParams = httpParams.set('startDate', params.startDate);
    if (params.endDate) httpParams = httpParams.set('endDate', params.endDate);
    if (params.minAmount != null) httpParams = httpParams.set('minAmount', params.minAmount.toString());
    if (params.maxAmount != null) httpParams = httpParams.set('maxAmount', params.maxAmount.toString());
  
    return this.http.get<TransactionResponse[]>(`${this.baseUrl}/filter`, { params: httpParams });
  }
}
