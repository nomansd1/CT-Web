import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = false;
  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // Check for token and its expiration time in local storage
    if (token && tokenExpiration) {
      const now = new Date();      
      // Check if token is expired
      if (now < new Date(tokenExpiration)) {
        return true; // Allow access to protected route
      }
    }
      // Credentials are not stored, redirect to login page
      this.router.navigate(['/login']);
      return false;
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    this.router.navigate(['/login'])
  }
}
