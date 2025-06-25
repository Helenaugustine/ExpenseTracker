
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense',
   imports:[FormsModule,CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {
   expenses: any[] = [];
  selectedMonth: number | null = null;
selectedYear: number | null = null;
searchText: string = '';
filteredExpenses: any[] = [];

   constructor(private ExpenseService: ExpenseService,private router: Router) {}

 goToAddExpense() {
    this.router.navigate(['/addexpense']);
  }
  // ngOnInit() {
  //   this.ExpenseService.getExpense().subscribe(data => {
  //     this.expenses = data;
  //     console.log(data)
  //   });
  // }
ngOnInit() {
  this.ExpenseService.getExpense().subscribe(data => {
    this.expenses = data;
    this.filteredExpenses = data;
    this.ExpenseService.cachedExpenses = data; 
  });
}

filterExpenses() {
  const text = this.searchText.trim().toLowerCase();
  this.filteredExpenses = !text
    ? this.expenses
    : this.expenses.filter(e =>
        e.categoryName.toLowerCase().startsWith(text)
      );
}
 

//   deleteExpense(expenseId: number) {
//     console.log('Deleting expense with ID:', expenseId);
//   if (confirm('Are you sure you want to delete this expense?')) {
//     this.ExpenseService.deleteExpense(expenseId).subscribe({
//       next: () => {
//         alert('expense deleted successfully!');
//         this.expenses = this.expenses.filter(i => i.id !== expenseId); // update UI
//       },
//       error: err => {
//         console.error('Error deleting expense:', err);
//         alert('Failed to delete expense.');
//       }

//     });
//   }
// }
deleteExpense(expenseId: number) {
  console.log('Deleting expense with ID:', expenseId);
  if (confirm('Are you sure you want to delete this expense?')) {
    this.ExpenseService.deleteExpense(expenseId).subscribe({
      next: () => {
        alert('Expense deleted successfully!');
        this.expenses = this.expenses.filter(i => i.id !== expenseId);
        this.filteredExpenses = this.filteredExpenses.filter(i => i.id !== expenseId); 
      },
      error: err => {
        console.error('Error deleting expense:', err);
        alert('Failed to delete expense.');
      }
    });
  }
}


filterExpenseByMonth() {
  const month = Number(this.selectedMonth);
  const year = Number(this.selectedYear);

  if (!month && !year) {
    this.filteredExpenses = this.expenses;
    return;
  }

  this.filteredExpenses = this.expenses.filter(s => {
    const date = new Date(s.createdAt);
    const matchesMonth = !month || (date.getMonth() + 1) === month;
    const matchesYear = !year || date.getFullYear() === year;

    console.log(`Saving: ${s.platform} | Date: ${date} | Month match: ${matchesMonth} | Year match: ${matchesYear}`);
    return matchesMonth && matchesYear;
  });

  console.log('Filtered result:', this.filteredExpenses);
}

goToEditExpense(id: number) {
  this.router.navigate(['/edit-expense', id]);
}
}


