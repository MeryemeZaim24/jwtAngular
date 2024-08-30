import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Etude } from '../classe/etude'; 
import { AuthService } from '../authentication/serv/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtudeService {
  private baseUrl = 'http://localhost:8080/api/etudes'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllEtudes(): Observable<Etude[]> {
    return this.http.get<Etude[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getEtudeById(id: number): Observable<Etude> {
    return this.http.get<Etude>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createEtude(etude: Etude): Observable<Etude> {
    return this.http.post<Etude>(this.baseUrl, etude, { headers: this.getAuthHeaders() });
  }

  updateEtude(id: number, etude: Etude): Observable<Etude> {
    return this.http.put<Etude>(`${this.baseUrl}/${id}`, etude, { headers: this.getAuthHeaders() });
  }

  deleteEtude(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  searchEtudes(keyword: string): Observable<Etude[]> {
    return this.http.get<Etude[]>(`${this.baseUrl}/search`, {
      headers: this.getAuthHeaders(),
      params: { keyword }
    }).pipe(
      catchError(error => {
        console.error('Error searching etudes', error);
        return throwError(error);
      })
    );
  }
}
























