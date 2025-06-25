import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addexpense',
  imports: [FormsModule, CommonModule],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})



export class AddexpenseComponent implements OnInit {

  categories: any[] = [];

  expense = {
    categoryId: null,
    Amount: '',
    Note: '',

  };

  constructor(private http: HttpClient ,  private router: Router) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>(`https://localhost:7258/api/Category`, { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.categories = data;
          console.log('Loaded categories:', this.categories);
        },
        error: (err) => {
          console.error('Failed to load categories:', err);
          alert('Failed to load categories');
        }
      });
  }



  // submitExpense() {

  //   const payload = {
  //     categoryId: this.expense.categoryId,
  //     amount: Number(this.expense.Amount),
  //     note: this.expense.Note
  //   };
  //   console.log('Submitting payload:', payload);
  //   this.http.post(`https://localhost:7258/api/Expense/AddExpense`, payload, {
  //     withCredentials: true
  //   })
  //     .subscribe({
  //       next: () => {
  //         alert('Expense added successfully!');
  //         this.expense = { categoryId: null, Amount: '', Note: '' }; // Reset form
  //       },
  //       error: (err) => {
  //         console.error('Error adding expense:', err);
  //         alert('Failed to add expense.');
  //       }
  //     });
  // }
  submitExpense() {
  const { categoryId, Amount, Note } = this.expense;

  if (!categoryId) {
    alert('Please select a category.');
    return;
  }

  const parsedAmount = parseFloat(Amount);
  if (!Amount.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  const payload = {
    categoryId,
    amount: parsedAmount,
    note: Note?.trim() || ''
  };

  console.log('Submitting payload:', payload);

  this.http.post(`https://localhost:7258/api/Expense/AddExpense`, payload, {
    withCredentials: true
  }).subscribe({
    next: () => {
      alert('Expense added successfully!');
      this.expense = { categoryId: null, Amount: '', Note: '' };
       this.router.navigate(['/expense']);
    },
    error: (err) => {
      console.error('Error adding expense:', err);
      alert('Failed to add expense.');
    }
  });
}

}