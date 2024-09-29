import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // Check if the token exists
    if (token) {
      return true; // If the user is authenticated, allow access to the route
    } else {
      this.router.navigate(['/auth']); // Otherwise, redirect to log in
      return false;
    }
  }
}
