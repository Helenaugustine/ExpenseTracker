
import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income',
  imports: [FormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomes: any[] = [];
  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  searchText: string = '';


  constructor(private incomeService: IncomeService, private router: Router) { }


  filteredIncomes: any[] = [];   


  ngOnInit() {
    this.incomeService.getIncomes().subscribe(data => {
 
      this.incomes = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this.filteredIncomes = [...this.incomes];
    this.incomeService.cachedIncomes = this.incomes;
    });
  }


  filterIncomeBySource() {
    const text = this.searchText.trim().toLowerCase();
    this.filteredIncomes = !text
      ? this.incomes
      : this.incomes.filter(income =>
        income.source.toLowerCase().startsWith(text)
      );
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
        this.incomes = this.incomes.filter(i => i.id !== incomeId);
        this.filteredIncomes = this.filteredIncomes.filter(i => i.id !== incomeId); 
      },
      error: err => {
        console.error('Error deleting income:', err);
        alert('Failed to delete income.');
      }
    });
  }
}




  goToEditIncome(id: number) {
    this.router.navigate(['/edit-income', id]);
  }
  filterIncomeByMonth() {
    const month = Number(this.selectedMonth);
    const year = Number(this.selectedYear);

    if (!month && !year) {
      this.filteredIncomes = this.incomes;
      return;
    }

    this.filteredIncomes = this.incomes.filter(s => {
      const date = new Date(s.createdAt);
      const matchesMonth = !month || (date.getMonth() + 1) === month;
      const matchesYear = !year || date.getFullYear() === year;

      console.log(`Saving: ${s.platform} | Date: ${date} | Month match: ${matchesMonth} | Year match: ${matchesYear}`);
      return matchesMonth && matchesYear;
    });

    console.log('Filtered result:', this.filteredIncomes);
  }

}
