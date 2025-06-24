import { Component, OnInit } from '@angular/core';
import { ActiveusersService } from '../../services/activeusers.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-activeusers',
 imports:[FormsModule,CommonModule],
  templateUrl: './activeusers.component.html',
  styleUrl: './activeusers.component.css'
})
export class ActiveusersComponent implements OnInit {
  searchText: string = '';
  users: any[] = [];

  constructor(private ActiveusersService: ActiveusersService,private router: Router) {}
  
    // ngOnInit() {
    //   this.ActiveusersService.getActiveUser().subscribe(data => {
    //     this.users = data;
    //     console.log(data)
    //   });
    // }
  
     ngOnInit() {
    this.fetchUsers(); // Default fetch
  }

   fetchUsers() {
    const roleToSearch = this.searchText.trim().toLowerCase() || 'user';
    this.ActiveusersService.getActiveUser(roleToSearch).subscribe(data => {
      this.users = data;
    });
  }
  
  navigateToEdit(userId: number) {
  this.router.navigate(['/edit-user', userId]);
}


    onSearch() {
    this.fetchUsers();
  }

    deleteUser(id: number) {
      console.log('Deleting user with ID:', id);
    if (confirm('Are you sure you want to delete this user?')) {
      this.ActiveusersService.deleteUser(id).subscribe({
        next: () => {
          alert('user deleted successfully!');
          this.users = this.users.filter(i => i.id !== id); // update UI
        },
        error: err => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user.');
        }
  
      });
    }
  }
  

}


 

