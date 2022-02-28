import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model'
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserSessionService } from 'src/app/services/user-session.service';

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
    private storage: SessionStorageService,
    private userSession: UserSessionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.userSession.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(itemForm: NgForm) {

    if(itemForm.valid) {
      this.auth.login(this.user.email, this.user.password).subscribe({
        next: user => {
          console.log(user);
          this.storage.saveUserDetails(JSON.stringify(user.data));
          this.storage.saveToken(user.token);
          this.isLoggedIn = true;
          this.router.navigate(['']);
      }, 
      error: error => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }

  logout() {
    this.userSession.logout();
    this.router.navigate(['']);
  }
}
