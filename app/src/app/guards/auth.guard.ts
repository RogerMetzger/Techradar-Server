import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Access } from '../models/access.model';
import { UserSessionService } from '../services/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSession: UserSessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let access: Access = route.data['access'];
    if (!this.userSession.isLoggedIn()) {
        this.router.navigate(['/login']);
    } else if (access && !this.userSession.canAccess(access)) {
        this.router.navigate(['']);
    }
    return this.userSession.isLoggedIn();
  }
}