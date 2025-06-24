import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShowSavings {
  id: number;
  amount: number;
  platform: string;
  type: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  private apiUrl = `https://localhost:7258/api/Savings/UserSavings`; // Update as needed
public cachedSavings: any[] = [];
  constructor(private http: HttpClient) {}

  getSavings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials:true });
  }

  deletesavings(savingsId: number) {
  return this.http.delete(`https://localhost:7258/api/Savings/${savingsId}/DeleteSavings`, {
    withCredentials: true
  });
}

// updateSaving(id: number, payload: any): Observable<any> {
//     return this.http.put(`https://localhost:7258/api/Savings/${id}/EditSavings`, payload, {
//       withCredentials: true
//     });
//   }
  updateSavings(id: number, updatedSavings: any): Observable<any> {
    return this.http.put(`https://localhost:7258/api/Savings/${id}/EditSavings`, updatedSavings, {
      withCredentials: true,
      responseType: 'text' as const
    });
  }
}

