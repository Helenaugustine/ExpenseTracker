import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsavings',
  imports: [FormsModule, CommonModule],
  templateUrl: './addsavings.component.html',
  styleUrl: './addsavings.component.css'
})
export class AddsavingsComponent {
  saving = {
    Platform: '',
    Type: '',
    Amount: ''
  };

  constructor(private http: HttpClient,  private router: Router) { }

  submitSavings() {
    const payload = {
      platform: this.saving.Platform,
      type: this.saving.Type,
      amount: Number(this.saving.Amount,
      )
    };

    this.http.post(`https://localhost:7258/api/Savings/AddSavings`, payload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('saving added successfully!');
        this.saving = { Platform: '', Type: '', Amount: '' }; // reset form
         this.router.navigate(['/savings']);
      },
      error: (err) => {
        console.error('Error adding saving:', err);
        alert('Failed to add saving.');
      }
    });
  }
}


