import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admincategory',
  imports: [FormsModule, CommonModule],
  templateUrl: './admincategory.component.html',
  styleUrl: './admincategory.component.css'
})
export class AdmincategoryComponent implements OnInit {
  category: any[] = [];        // Original full list from backend
  filteredCategory: any[] = [];

  searchText: string = '';


  constructor(private CategoryService: CategoryService, private router: Router) { }


  ngOnInit() {
    this.CategoryService.getcategory().subscribe(data => {
      this.category = data;
      this.filteredCategory = data; // initially show all
    });
  }
  goToAddCategory() {
    this.router.navigate(['/addcate']);
  }

  deletecategory(categoryId: number) {
    console.log('Deleting category with ID:', categoryId);
    if (confirm('Are you sure you want to delete this category?')) {
      this.CategoryService.deletecategory(categoryId).subscribe({
        next: () => {
          alert('category deleted successfully!');
          this.category = this.category.filter(i => i.id !== categoryId); // update UI
        },
        error: err => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category.');
        }

      });
    }
  }
  filterCategories() {
    const text = this.searchText.toLowerCase();
    this.filteredCategory = !text
      ? this.category
      : this.category.filter(c =>
        c.name.toLowerCase().startsWith(text)
      );
  }
}
