import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit {
  roleForm!: FormGroup;
  userId!: number;
  message = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.roleForm = this.fb.group({
      role: ['User'] // default value
    });
  }

  submit() {
    const formData = this.roleForm.value;
    this.http.put(`https://localhost:7258/api/Admin/ChangeUserRole/${this.userId}`, formData, { withCredentials: true })
      .subscribe({
        next: () => {
          this.message = 'Role updated successfully!';
          setTimeout(() => this.router.navigate(['/activeusers']), 1500);
        },
        error: err => {
          console.error(err);
          this.message = 'Failed to update role.';
        }
      });
  }
}