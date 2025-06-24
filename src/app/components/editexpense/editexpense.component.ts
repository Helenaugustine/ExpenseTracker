import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editexpense',
 standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editexpense.component.html',
  styleUrl: './editexpense.component.css'
})
export class EditexpenseComponent implements OnInit {
  ExpenseForm!: FormGroup;
  expenseId!: number;
  message = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.expenseId = Number(this.route.snapshot.paramMap.get('id'));
    const expense = this.expenseService.cachedExpenses.find(e => e.id === this.expenseId);

    if (!expense) {
      this.message = 'Expense not found.';
      return;
    }

    this.ExpenseForm = this.fb.group({
      note: [expense.note, Validators.required],
      amount: [expense.amount, Validators.required]
    });
  }

  submit() {
    if (this.ExpenseForm.invalid) return;

    this.expenseService.updateExpense(this.expenseId, this.ExpenseForm.value).subscribe({
      next: () => {
        this.message = 'Expense updated successfully!';
        setTimeout(() => this.router.navigate(['/expenses']), 1500);
      },
      error: err => {
        console.error('Update failed:', err);
        this.message = 'Update failed.';
      }
    });
  }
}

 