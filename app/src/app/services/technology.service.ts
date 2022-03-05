import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Technology } from '../models/technology.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.baseUrl}/technologies`);
  }  
  
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/technology/${id}`);
  }

  create(technology: Technology): Observable<any> {
    return this.http.post(`${this.baseUrl}/technology`, technology);
  }
}
