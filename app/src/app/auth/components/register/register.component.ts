import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  onSubmit(itemForm: NgForm) {
    
    if(itemForm.valid) {
      this.auth.register(this.user.email, this.user.password).subscribe({
        next: user => {
          console.log(user);
          this.auth.setDataInLocalStorage('userData', JSON.stringify(user.data));
          this.auth.setDataInLocalStorage('token', user.token);
          this.isLoggedIn = true;
          this.router.navigate(['Login']);
      }, 
      error: error => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }
  
  isUserLoggedIn() {
    if(this.auth.getUserDetails() != null)
    {
      this.isLoggedIn = true;
    }
  }

}
