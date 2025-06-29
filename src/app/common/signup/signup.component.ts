
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    Name: '',
    Email: '',
    Password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

 

signup() {
  localStorage.clear();
  const { Name, Email, Password } = this.user;

  if (!Name.trim() || !Email.trim() || !Password.trim()) {
    alert('Please fill in all the fields.');
    return;
  }

  this.http.post<any>(`https://localhost:7258/api/User/RegisterUser`, this.user)
    .subscribe({
      next: (res: any) => {
        alert(res.message || 'Account created successfully.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        const errorMsg =
          typeof err.error === 'string'
            ? err.error
            : err.error?.message || 'Something went wrong!';
        alert(errorMsg);
      }
    });
}
}