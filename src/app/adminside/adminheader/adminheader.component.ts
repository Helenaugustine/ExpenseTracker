import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-adminheader',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.css'
})
export class AdminheaderComponent {
  pageTitle = 'ActiveUsers';
  constructor(
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.auth.loadUser();
    // update page title from child route data
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let r = this.route.firstChild;
        while (r?.firstChild) r = r.firstChild;
        return r?.snapshot.data['title'] || 'ActiveUsers';
      })
    ).subscribe(title => this.pageTitle = title);
  }

  logout() {
    this.auth.clearUser();
    this.router.navigate(['/login']);
  }


}
