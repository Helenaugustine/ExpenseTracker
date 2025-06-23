
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userName = signal<string | null>(null);
  userEmail = signal<string | null>(null);

  setUser(name: string, email: string) {
    this.userName.set(name);
    this.userEmail.set(email);
  }

  clearUser() {
    this.userName.set(null);
    this.userEmail.set(null);
  }
}
