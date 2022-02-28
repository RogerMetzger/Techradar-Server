import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User("", "");

  isLoggedIn: boolean = false;
  errorMessage: string = "";

  constructor(
    private auth: AuthService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  onSubmit(itemForm: NgForm) {

    if(itemForm.valid) {
      this.auth.login(this.user.email, this.user.password).subscribe({
        next: user => {
          console.log(user);
          this.auth.setDataInLocalStorage('userData', JSON.stringify(user.data));
          this.auth.setDataInLocalStorage('token', user.token);
          this.isLoggedIn = true;
          this.router.navigate(['']);
      }, 
      error: error => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  isUserLoggedIn() {
    console.log(this.auth.getUserDetails());
    if (this.auth.getUserDetails() != null) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['']);
  }
}
