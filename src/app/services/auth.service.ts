
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userName = signal<string | null>(null);
  userEmail = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  setUser(name: string, email: string) {
    this.userName.set(name);
    this.userEmail.set(email);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
  }


  clearUser() {
    this.userName.set(null);
    this.userEmail.set(null);
    localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  }


  loadUser() {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    if (name) this.userName.set(name);
    if (email) this.userEmail.set(email);
  }




}
