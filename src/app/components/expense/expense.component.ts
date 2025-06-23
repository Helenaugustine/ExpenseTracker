import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  imports: [],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  constructor(private router: Router) {}

  goToAddExpense() {
    this.router.navigate(['/addexpense']);
  }

}
