import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsService } from '../../services/savings.service';

@Component({
  selector: 'app-savings',
  imports: [FormsModule,CommonModule],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css'
})
export class SavingsComponent {
  searchText: string = '';
  savings: any[] = [];

  constructor(private SavingsService: SavingsService,private router: Router) {}
  
    ngOnInit() {
      this.SavingsService.getSavings().subscribe(data => {
        this.savings = data;
        console.log(data)
      });
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
          this.savings = this.savings.filter(i => i.id !== savingsId); // update UI
        },
        error: err => {
          console.error('Error deleting savings:', err);
          alert('Failed to delete savings.');
        }
  
      });
    }
  }

}
