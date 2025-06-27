// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const isLoggedIn = !!localStorage.getItem('userName');
//     if (!isLoggedIn) {
//       this.router.navigate(['/login'], { replaceUrl: true });
//       return false;
//     }
//     return true;
//   }
// }
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('userName');

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const isLoggedIn = !!localStorage.getItem('userName');

//   if (!isLoggedIn) {
//     // Redirect to login if not authenticated
//     window.location.href = '/login';
//     return false;
//   }

//   return true;
// };
