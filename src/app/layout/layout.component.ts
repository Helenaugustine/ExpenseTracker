import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  pageTitle = 'Home';

  constructor(
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    // update page title from child route data
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let r = this.route.firstChild;
        while (r?.firstChild) r = r.firstChild;
        return r?.snapshot.data['title'] || 'Home';
      })
    ).subscribe(title => this.pageTitle = title);
  }

  logout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }
 
goToProfile() {
  this.router.navigate(['/profile']);
}

// logout() {
//   this.auth.logout().subscribe({
//     next: (res) => {
//       alert(res.message || 'Logged out successfully!');
//       localStorage.clear(); // clear tokens or user data
//       this.router.navigate(['/login']); // or your login route
//   //     const message = (res as any).message;
//   // alert(message || 'Logged out successfully!');
//   // localStorage.clear();
//   // this.router.navigate(['/login']);
//     },

//     error: (err) => {
//       console.error('Logout failed:', err);
//       alert('Something went wrong while logging out.');
//     }
//   });
// }

}
