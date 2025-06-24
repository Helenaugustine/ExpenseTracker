
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editincome',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editincome.component.html',
  styleUrl: './editincome.component.css'
})
export class EditincomeComponent implements OnInit {
  incomeForm!: FormGroup;
  incomeId!: number;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private incomeService: IncomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.incomeId = Number(this.route.snapshot.paramMap.get('id'));
    const income = this.incomeService.cachedIncomes.find(i => i.id === this.incomeId);

    if (!income) {
      this.message = 'Income not found.';
      return;
    }

    this.incomeForm = this.fb.group({
      amount: [income.amount, [Validators.required]],
      source: [income.source, [Validators.required]]
    });
  }

  submit() {
    if (this.incomeForm.invalid) return;

    this.incomeService.updateIncome(this.incomeId, this.incomeForm.value).subscribe({
      next: () => {
        this.message = 'Income updated successfully!';
        setTimeout(() => this.router.navigate(['/income']), 1500);
      },
      error: err => {
        console.error('Update failed:', err);
        this.message = 'Update failed.';
      }
    });
  }
}