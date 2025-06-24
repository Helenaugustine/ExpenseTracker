
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = {
    Name: '',
    Password: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login() {
    this.http.post<any>(`https://localhost:7258/api/Authentictaion/login`, this.auth, {
      withCredentials: false // needed for cookies
    }).subscribe({
      next: (res) => {
        this.authService.setUser(res.name, res.email);
        console.log(res);
        if (res.message == 'Login successfull') {
          localStorage.setItem('userId', res.id);
          
          alert(res.message);
          console.log(localStorage.getItem('userId'));
          
          if (res.role === 'Admin') {
            this.router.navigate(['/activeusers']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        alert('Invalid credentials');
      }
    });
  }
}


