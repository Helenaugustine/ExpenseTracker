
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


   constructor(private ExpenseService: ExpenseService,private router: Router) {}

 goToAddExpense() {
    this.router.navigate(['/addexpense']);
  }
  ngOnInit() {
    this.ExpenseService.getExpense().subscribe(data => {
      this.expenses = data;
      console.log(data)
    });
  }

 

  deleteExpense(expenseId: number) {
    console.log('Deleting expense with ID:', expenseId);
  if (confirm('Are you sure you want to delete this expense?')) {
    this.ExpenseService.deleteExpense(expenseId).subscribe({
      next: () => {
        alert('expense deleted successfully!');
        this.expenses = this.expenses.filter(i => i.id !== expenseId); // update UI
      },
      error: err => {
        console.error('Error deleting expense:', err);
        alert('Failed to delete expense.');
      }

    });
  }
}


}
