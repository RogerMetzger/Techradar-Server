import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserSessionService } from 'src/app/services/user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordHide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  isLoggedIn: boolean = false;
  errorMessage: string = "";

  constructor(
    private auth: AuthService, 
    private storage: SessionStorageService,
    private userSession: UserSessionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.userSession.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(form: any) {
    console.log(form.password);
    if(this.loginForm.valid) {
      this.auth.login(form.email, form.password).subscribe({
        next: user => {
          console.log(user.message);
          this.storage.saveUserDetails(user.token);
          this.storage.saveToken(user.token);
          this.isLoggedIn = true;
          window.location.reload();
          this.router.navigate(['']);
        }, 
        error: error => {
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.userSession.logout();
    window.location.reload();
    this.router.navigate(['login']);
  }

  loginFormError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
