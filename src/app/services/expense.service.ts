import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `https://localhost:7258/api/Expense/ViewExpenses`; // Update as needed

  constructor(private http: HttpClient) {}

  getExpense(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials:true });
  }

  deleteExpense(expenseId: number) {
  return this.http.delete(`https://localhost:7258/api/Expense/${expenseId}/DeleteExpense`, {
    withCredentials: true
  });
}
}
