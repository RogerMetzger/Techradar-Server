import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserSessionService } from 'src/app/services/user-session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    if(this.userSession.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(itemForm: NgForm) {
    
    if(itemForm.valid) {
      this.auth.register(this.user.email, this.user.password).subscribe({
        next: user => {
          console.log(user);
          this.storage.saveUserDetails(JSON.stringify(user.data));
          this.storage.saveToken(user.token);
          this.isLoggedIn = true;
          this.router.navigate(['login']);
      }, 
      error: error => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }
}
