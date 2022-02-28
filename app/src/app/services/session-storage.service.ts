import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER_DATA = 'userData';
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveUserDetails(data: string) {
    sessionStorage.setItem(USER_DATA, data);
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
