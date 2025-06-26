import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminaddcat',
  imports: [FormsModule, CommonModule],
  templateUrl: './adminaddcat.component.html',
  styleUrl: './adminaddcat.component.css'
})
export class AdminaddcatComponent  {
  cate = {
    Name: '',
    Type: ''
  };

  constructor(private http: HttpClient , private router: Router) { }


  submitcate() {
  const { Name, Type } = this.cate;

  if (!Name.trim() || !Type.trim()) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const payload = {
    Name: Name.trim(),
    type: Type.trim()
  };

  console.log('Submitting category:', payload);

  this.http.post(`https://localhost:7258/api/Category/AddCategory`, payload, {
    withCredentials: true
  }).subscribe({
    next: () => {
      alert('Category added successfully!');
      this.cate = { Name: '', Type: '' }; // reset form
       this.router.navigate(['/admincategory']);
    },
    error: (err) => {
      console.error('Error adding category:', err);
      alert('Failed to add category.');
    }
  });
}

}

