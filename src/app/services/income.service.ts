
// income.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private apiUrl = `https://localhost:7258/api/Income/UserIncome`; // Update as needed

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


}
