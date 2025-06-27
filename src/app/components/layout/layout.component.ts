import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
    this.auth.loadUser();
    
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
    
    this.router.navigate(['/login'], { replaceUrl: true });

    
localStorage.removeItem('userToken');
 localStorage.removeItem('userData');
 this.router.navigate(['/login']);


  }
// logout() {
//     this.auth.clearUser().subscribe({
//       next: () => {
//         localStorage.clear();
//         this.router.navigate(['/login']);
//          this.auth.clearUser();
//       },
//       error: () => {
//         alert("Logout failed. Please try again.");
//       }
//     });
//   }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

 
}
