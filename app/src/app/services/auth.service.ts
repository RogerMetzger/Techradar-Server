import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  //api

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, {
      email,
      password
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, {
      email,
      password
    });
  }

  //localstorage

  getUserDetails() {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
  }

  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }
}
