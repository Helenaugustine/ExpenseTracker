import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsService } from '../../services/savings.service';

@Component({
  selector: 'app-savings',
  imports: [FormsModule, CommonModule],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css'
})
export class SavingsComponent {
  searchText: string = '';
  savings: any[] = [];
  filteredSavings: any[] = [];   
  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  constructor(private SavingsService: SavingsService, private router: Router) { }

 

  ngOnInit() {
    this.SavingsService.getSavings().subscribe(data => {
       this.savings = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this.filteredSavings = [...this.savings];
    this.SavingsService.cachedSavings = this.savings;

    });
  }

  filterSavings() {
    const text = this.searchText.trim().toLowerCase();
    this.filteredSavings = !text
      ? this.savings
      : this.savings.filter(s =>
        s.platform.toLowerCase().startsWith(text)
      );
  }
  goToAddSavings() {
    this.router.navigate(['/addsavings']);
  }


  deletesavings(savingsId: number) {
  console.log('Deleting savings with ID:', savingsId);
  if (confirm('Are you sure you want to delete this saving?')) {
    this.SavingsService.deletesavings(savingsId).subscribe({
      next: () => {
        alert('Savings deleted successfully!');
        this.savings = this.savings.filter(i => i.id !== savingsId);
        this.filteredSavings = this.filteredSavings.filter(i => i.id !== savingsId);
      },
      error: err => {
        console.error('Error deleting savings:', err);
        alert('Failed to delete savings.');
      }
    });
  }
}



  filterSavingsByMonth() {
    const month = Number(this.selectedMonth);
    const year = Number(this.selectedYear);

    if (!month && !year) {
      this.filteredSavings = this.savings;
      return;
    }

    this.filteredSavings = this.savings.filter(s => {
      const date = new Date(s.createdAt);
      const matchesMonth = !month || (date.getMonth() + 1) === month;
      const matchesYear = !year || date.getFullYear() === year;

      console.log(`Saving: ${s.platform} | Date: ${date} | Month match: ${matchesMonth} | Year match: ${matchesYear}`);
      return matchesMonth && matchesYear;
    });

    console.log('Filtered result:', this.filteredSavings);
  }

  goToEditSavings(id: number) {
    this.router.navigate(['/edit-savings', id]);
  }
}
