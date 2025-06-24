import { Component, OnInit } from '@angular/core';
import { ActiveusersService } from '../../services/activeusers.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deletedusers',
 imports:[FormsModule,CommonModule],
  templateUrl: './deletedusers.component.html',
  styleUrl: './deletedusers.component.css'
})
export class DeletedusersComponent {
  users: any[] = [];
  filteredUsers: any[] = []; 
  
  searchText: string = '';
  constructor(private ActiveusersService: ActiveusersService,private router: Router) {}
  
    // ngOnInit() {
    //   this.ActiveusersService.getUser().subscribe(data => {
    //     this.users = data;
    //     console.log(data)
    //   });
    // }
  ngOnInit() {
  this.ActiveusersService.getUser().subscribe(data => {
    this.users = data;
    this.filteredUsers = data; // initially show all
  });
}

filterDeletedUsers() {
  const text = this.searchText.trim().toLowerCase();
  this.filteredUsers = !text
    ? this.users
    : this.users.filter(user =>
        user.name.toLowerCase().startsWith(text)
      );
}

}
