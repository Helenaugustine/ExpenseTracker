import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  category: any[] = [];

  searchText: string = '';

  filteredCategory: any[] = []; 


  constructor(private CategoryService: CategoryService, private router: Router) { }

 
  ngOnInit() {
    this.CategoryService.getcategory().subscribe(data => {
      this.category = data;
      this.filteredCategory = data;
    });
  }

  filterCategories() {
    const text = this.searchText.trim().toLowerCase();
    this.filteredCategory = !text
      ? this.category
      : this.category.filter(cat =>
        cat.name.toLowerCase().startsWith(text)
      );
  }
  goToAddCategory() {
    this.router.navigate(['/addcate']);
  }

 
  deletecategory(categoryId: number) {
  console.log('Deleting category with ID:', categoryId);
  if (confirm('Are you sure you want to delete this category?')) {
    this.CategoryService.deletecategory(categoryId).subscribe({
      next: () => {
        alert('Category deleted successfully!');
        this.category = this.category.filter(i => i.id !== categoryId);
        this.filteredCategory = this.filteredCategory.filter(i => i.id !== categoryId); 
      },
      error: err => {
        console.error('Error deleting category:', err);
        alert('Failed to delete category.');
      }
    });
  }
}


}
