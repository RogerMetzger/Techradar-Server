import { Injectable } from '@angular/core';
import { Permission } from '../models/permission.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(private storage: SessionStorageService) { }

  getRole() {
    let user = this.storage.getUserDetails();
    return user ? user.role : null;
  }

  isLoggedIn() {
    return this.storage.getUserDetails() != null;
  }

  canAccess(perm: Permission) {
    let role = this.getRole()
    if (role) {
      return perm.includes(role);
    } else {
      return false;
    }
  }

  logout() {
    this.storage.clearStorage();
  }
}
