
import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income',
  imports:[FormsModule,CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomes: any[] = [];
  selectedMonth: number | null = null;
selectedYear: number | null = null;
searchText: string = '';


  constructor(private incomeService: IncomeService,private router: Router) {}

  ngOnInit() {
    this.incomeService.getIncomes().subscribe(data => {
      this.incomes = data;
      console.log(data)
    });
  }

  goToAddIncome() {
    this.router.navigate(['/addincome']);
  }

  deleteIncome(incomeId: number) {
    console.log('Deleting income with ID:', incomeId);
  if (confirm('Are you sure you want to delete this income?')) {
    this.incomeService.deleteIncome(incomeId).subscribe({
      next: () => {
        alert('Income deleted successfully!');
        this.incomes = this.incomes.filter(i => i.id !== incomeId); // update UI
      },
      error: err => {
        console.error('Error deleting income:', err);
        alert('Failed to delete income.');
      }

    });
  }
}


filterIncomeByMonth() {
  if (this.selectedMonth && this.selectedYear) {
    // Fetch by month and year
    this.incomeService.getMonthlyIncome(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => this.incomes = data,
      error: (err) => {
        console.error('Monthly income fetch failed:', err);
        alert(err.error || 'No income records found for this month and year.');
        this.incomes = [];
      }
    });
  } else if (!this.selectedMonth && this.selectedYear) {
    // Fetch by year only
    this.incomeService.getYearlyIncome(this.selectedYear).subscribe({
      next: (data) => this.incomes = data,
      error: (err) => {
        console.error('Yearly income fetch failed:', err);
        alert(err.error || 'No income records found for this year.');
        this.incomes = [];
      }
    });
  }
}

filterIncomeBySource() {
  const trimmed = this.searchText.trim();
  if (trimmed) {
    this.incomeService.getIncomeBySource(trimmed).subscribe({
      next: (data) => this.incomes = data,
      error: (err) => {
        console.error('Source filter failed:', err);
        alert(err.error || 'No income records found for that source.');
        this.incomes = [];
      }
    });
  }
}


}
