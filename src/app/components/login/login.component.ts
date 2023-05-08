import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ApiClientService } from '../../services/api-client.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signIn: boolean = true;
  forgotPass: boolean = false;
  email?: string;
  password?: string;
  errorMessage = false;
  haveUser: any;
  loading = false;

  constructor(
    private apiClient: ApiClientService,
    private router: Router,
    private authGuard: AuthGuard
  ) { }

  hideSignin() {
    this.signIn = false;
    this.forgotPass = true;
  }
  showSignin() {
    this.signIn = true;
    this.forgotPass = false;
  }
  ngOnInit(): void { }
  login() {
    this.loading = true;
    setTimeout(() => {
      this.apiClient
      .getData('http://localhost:3000/users')
      .then((data) => {
        const users: User[] = data.users; // Update to use 'data' directly, assuming it's an array of users
        this.haveUser = users.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (this.haveUser) {
          // Store user credentials in local storage
          const token = this.haveUser.token;
          const expiration = this.haveUser.tokenExpiration;
          localStorage.setItem('token', token);
          localStorage.setItem('tokenExpiration', expiration);
          
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = true;
          console.log(this.errorMessage);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        // Set loading to false after the API call is completed
        this.loading = false;
      });
    }, 5000)
    this.authGuard.setAuthenticated(true);
  }
  logout() {
    this.authGuard.logout()
  }
}
