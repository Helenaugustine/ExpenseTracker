
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface YearlySnapshotDto {
  userId: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netSavings: number;
}

@Injectable({
  providedIn: 'root'
})
export class YearlycardsService {


  constructor(private http: HttpClient) { }

  getSnapshot(year: number): Observable<YearlySnapshotDto> {
    return this.http.get<YearlySnapshotDto>(`https://localhost:7258/api/YearlySnapshot/YearlySnapshot?year=${year}`, {
      withCredentials: true
    });
  }
}

