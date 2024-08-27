import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private router: Router, private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'text' });
  }

  login(authRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, authRequest, { responseType: 'text' });
  }

  getUserData(): Observable<any> {
    const token = this.getToken();
    return this.http.get<any>(`${this.baseUrl}/user/data?token=${token}`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/authentication/login-1');
  }
}

