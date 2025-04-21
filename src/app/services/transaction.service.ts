import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = 'https://localhost:7189';

  constructor(private http: HttpClient) {}

  processTransaction(payload: any) {
    return this.http.post(`${this.baseUrl}/process`, payload);
  }

  getTransaction(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  filterTransactions(params: { date?: string, amount?: number }) {
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }
}
