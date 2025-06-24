import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveusersService {

 private apiUrl = `https://localhost:7258/api/Admin/DeletedUsers`; // Update as needed

  constructor(private http: HttpClient) {}

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials:true });
  }

  getActiveUser(role: string = 'user', pageNumber: number = 1, pageSize: number = 30): Observable<any[]> {
  const url = `https://localhost:7258/api/Admin/ActiveUsers?role=${role}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.http.get<any[]>(url, { withCredentials: true });
}

  deleteUser(id: number) {
  return this.http.delete(`https://localhost:7258/api/Admin/DisableUser?id=${id}`, {
    withCredentials: true
  });
}
}
