import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addexpense',
  imports: [FormsModule,CommonModule],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})



export class AddexpenseComponent implements OnInit {

  categories: any[] = [];

  expense = {
    category: '',
    amount: '',
    note: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>(`https://localhost:7258/api/Category`, { withCredentials: true })
      .subscribe({
        next: (data) => this.categories = data,
        // error: (err) => alert('Failed to load categories')
        error: (err) => {
        console.error('Failed to load categories:', err);
        alert('Failed to load categories');
      }
      });
  }

  // submitExpense() {
  //   // You can complete this later with post logic
  //   console.log(this.expense);
  // }

submitExpense() {
  const selectedCategory = this.categories.find(
    c => c.name === this.expense.category
  );

  if (!selectedCategory) {
    alert('Invalid category selected.');
    return;
  }

  const payload = {
    categoryId: selectedCategory.id,
    amount: Number(this.expense.amount),
    note: this.expense.note
  };

  this.http.post(`https://localhost:7258/api/Expense/AddExpense`, payload, {
    withCredentials: true
  })
  .subscribe({
    next: () => {
      alert('Expense added successfully!');
      this.expense = { category: '', amount: '', note: '' }; // Reset form
    },
    error: (err) => {
      console.error('Error adding expense:', err);
      alert('Failed to add expense.');
    }
  });
}
}