import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addincome',
  imports: [FormsModule,CommonModule],
  templateUrl: './addincome.component.html',
  styleUrl: './addincome.component.css'
})

export class AddIncomeComponent {
  income = {
    Source: '',
    Amount: ''
  };

  // userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) {}

  submitIncome() {
    const payload = {
      source: this.income.Source,
      amount: Number(this.income.Amount)
    };
    
    this.http.post(`https://localhost:7258/api/Income/AddIncome`, payload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('Income added successfully!');
        this.income = { Source: '', Amount: '' }; // reset form
      },
      error: (err) => {
        console.error('Error adding income:', err);
        alert('Failed to add income.');
      }
    });
  }
}
