import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcategory',
imports: [FormsModule,CommonModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
   cate = {
    Name: '',
    Type: ''
  };

constructor(private http: HttpClient) {}

  submitcate() {
    const payload = {
      Name: this.cate.Name,
      type:this.cate.Type
      
    };
    console.log('Submitting category:', this.cate);

    this.http.post(`https://localhost:7258/api/Category/AddCategory`, payload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('category added successfully!');
        this.cate = { Name: '', Type: '' }; // reset form
      },
      error: (err) => {
        console.error('Error adding category:', err);
        alert('Failed to add category.');
      }
    });
  }
}

