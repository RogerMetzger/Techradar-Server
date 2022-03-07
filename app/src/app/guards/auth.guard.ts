import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Permission } from '../models/permission.model';
import { UserSessionService } from '../services/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSession: UserSessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let perm: Permission = route.data['perm'];
    if (!this.userSession.isLoggedIn()) {
        this.router.navigate(['/login']);
    } else if (perm && !this.userSession.canAccess(perm)) {
        this.router.navigate(['']);
    }
    return this.userSession.isLoggedIn();
  }
}