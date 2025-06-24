
// income.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private apiUrl = `https://localhost:7258/api/Income/UserIncome`; // Update as needed
public cachedIncomes: any[] = [];
  constructor(private http: HttpClient) {}

  getIncomes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials:true });
  }

  deleteIncome(incomeId: number) {
  return this.http.delete(`https://localhost:7258/api/Income/${incomeId}/DeleteIncome`, {
    withCredentials: true
  });
}

getMonthlyIncome(month: number, year: number) {
  return this.http.get<any[]>(`https://localhost:7258/api/Income/MonthlyIncome?month=${month}&year=${year}`, {
    withCredentials: true
  });
}

getYearlyIncome(year: number) {
  return this.http.get<any[]>(`https://localhost:7258/api/Income/YearlyIncome?year=${year}`, {
    withCredentials: true
  });
}

getIncomeBySource(source: string) {
  return this.http.get<any[]>(`https://localhost:7258/api/Income/SourcewiseIncome?source=${source}`, {
    withCredentials: true
  });
}
// for edit
getIncomeById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
}
// updateIncome(id: number, updatedIncome: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}/EditIncome`, updatedIncome, { withCredentials: true });
//   }
// updateIncome(id: number, payload: { amount: number; source: string }) {
//   return this.http.put(`https://localhost:7258/api/Income/${id}/EditIncome`, payload, {
//     withCredentials: true
//   });
// }
updateIncome(id: number, payload: any): Observable<any> {
    return this.http.put(`https://localhost:7258/api/Income/${id}/EditIncome`, payload, {
      withCredentials: true
    });
  }
}
