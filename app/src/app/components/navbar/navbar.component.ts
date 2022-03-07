import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserSessionService } from '../../services/user-session.service';
import { Router } from '@angular/router';
import { Access } from 'src/app/models/access.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userSession: UserSessionService,
    private router: Router
    ) {}

  isLoggedIn = () => {
    return this.userSession.isLoggedIn();
  }

  canAccess = () => {
    return this.userSession.canAccess(Access.READ);
  }

  logout() {
    this.userSession.logout();
    this.router.navigate(['']);
  }
}
