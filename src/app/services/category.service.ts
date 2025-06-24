import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 private apiUrl = `https://localhost:7258/api/Category`; // Update as needed

  constructor(private http: HttpClient) {}

  getcategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials:true });
  }

  deletecategory(categoryId : number) {
  return this.http.delete(`https://localhost:7258/api/Category/user/category/${categoryId }`, {
    withCredentials: true
  });
}
}
