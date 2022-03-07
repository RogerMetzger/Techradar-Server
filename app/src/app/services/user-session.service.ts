import { Injectable } from '@angular/core';
import { Permission } from '../models/permission.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(private storage: SessionStorageService) { }

  getEmail() {
    let user = this.getUser();
    return user ? user.email : null;
  }

  getRole() {
    let user = this.getUser();
    return user ? user.role : null;
  }

  isLoggedIn() {
    return this.getUser() != null;
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
  
  private getUser() {
    return this.storage.getUserDetails();
  }
}
