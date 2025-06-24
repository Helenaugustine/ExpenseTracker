import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  private apiUrl = `https://localhost:7258/api/Savings/UserSavings`; // Update as needed

  constructor(private http: HttpClient) {}

  getSavings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials:true });
  }

  deletesavings(savingsId: number) {
  return this.http.delete(`https://localhost:7258/api/Savings/${savingsId}/DeleteSavings`, {
    withCredentials: true
  });
}
}
