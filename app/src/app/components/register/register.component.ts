import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserSessionService } from 'src/app/services/user-session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordHide = true;
  registerForm = new FormGroup({
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
    if (this.registerForm.valid) {
      this.auth.register(form.email, form.password).subscribe({
        next: user => {
          console.log(user.message);
          this.storage.saveUserDetails(user.token);
          this.storage.saveToken(user.token);
          this.isLoggedIn = true;
          this.router.navigate(['']);
        },
        error: error => {
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  registerFormError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
