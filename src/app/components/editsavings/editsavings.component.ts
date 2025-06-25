import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SavingsService } from '../../services/savings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editsavings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editsavings.component.html',
  styleUrl: './editsavings.component.css'
})
export class EditsavingsComponent implements OnInit {
  SavingsForm!: FormGroup;
  savingsId!: number;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private savingsService: SavingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.savingsId = Number(this.route.snapshot.paramMap.get('id'));
    const saving = this.savingsService.cachedSavings.find(s => s.id === this.savingsId);

    if (!saving) {
      this.message = 'Savings not found.';
      return;
    }

    this.SavingsForm = this.fb.group({
      platform: [saving.platform, Validators.required],
      type: [saving.type, Validators.required],
      amount: [saving.amount, Validators.required]
    });
  }

  submit() {
    if (this.SavingsForm.invalid) return;

    this.savingsService.updateSavings(this.savingsId, this.SavingsForm.value).subscribe({
      next: () => {
        this.message = 'Savings updated successfully!';
        setTimeout(() => this.router.navigate(['/savings']), 1500);
      },
      error: err => {
        console.error('Update failed:', err);
        this.message = 'Update failed.';
      }
    });
  }
}