import { Component } from '@angular/core';
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
export class LoginComponent {

  passwordHide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage: string = "";

  constructor(
    private auth: AuthService, 
    private storage: SessionStorageService,
    private userSession: UserSessionService,
    private router: Router
    ) { }

  onSubmit(form: any) {
    if(this.loginForm.valid) {
      this.auth.login(form.email, form.password).subscribe({
        next: user => {
          console.log(user.message);
          this.storage.saveUserDetails(user.token);
          this.storage.saveToken(user.token);
          this.router.navigate(['']);
        }, 
        error: error => {
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  isLoggedIn = () => {
    return this.userSession.isLoggedIn();
  }

  logout() {
    this.userSession.logout();
    this.router.navigate(['']);
  }

  loginFormError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
