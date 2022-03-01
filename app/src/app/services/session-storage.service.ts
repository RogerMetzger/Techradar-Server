import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

const TOKEN = 'token';
const USER_DATA = 'userData';
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveUserDetails(token: any) {
    let decodedToken = jwtDecode<any>(token);
    if (decodedToken) {
      let data = {
        email: decodedToken.email,
        role: decodedToken.role
      };
      sessionStorage.setItem(USER_DATA, JSON.stringify(data));
    } else {
      console.error('Cannot decode token');
    }
  }

  getUserDetails() {
    const userData = sessionStorage.getItem(USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  saveToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN);
  }

  clearStorage() {
    sessionStorage.clear();
  }
}
