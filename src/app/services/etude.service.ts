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

  constructor(private http: HttpClient) {}

  getAllEtudes(): Observable<Etude[]> {
    return this.http.get<Etude[]>(this.baseUrl);
  }

//     getAllClientsLists(): Observable<any> {
//     const headers = new HttpHeaders().set('Authorization', Bearer ${this.authService.getToken()});
//     return this.http.get<any>(${this.baseUrl}/allClientsLists, { headers });
//   }

  // getAllEtudes():Observable<any>{
  //   const headers = new HttpHeaders().get('Authorization',Bearer ${this.authService.getToken()});
  //   return this.http.get<any>(${this.baseUrl}),{ headers });
  // }


  // getAllEtudes(): Observable<Etude[]> {
  //   const headers = this.getAuthHeaders(); // Obtenez les en-têtes d'autorisation
  //   return this.http.get<Etude[]>(this.baseUrl, { headers }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  getEtudeById(id: number): Observable<Etude> {
    return this.http.get<Etude>(`${this.baseUrl}/${id}`);
  }

  // getEtudesByBeneficiaireId(beneficiaireId: number): Observable<Etude[]> {
  //   return this.http.get<Etude[]>(`${this.baseUrl}/beneficiaire/${beneficiaireId}`);
  // }

  createEtude(etude: Etude): Observable<Etude> {
    return this.http.post<Etude>(this.baseUrl, etude);
  }

  updateEtude(id: number, etude: Etude): Observable<Etude> {
    return this.http.put<Etude>(`${this.baseUrl}/${id}`, etude);
  }

  deleteEtude(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // searchEtudes(keyword: string): Observable<Etude[]> {
  //   return this.http.get<Etude[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  // }


  searchEtudes(keyword: string): Observable<Etude[]> {
    return this.http.get<Etude[]>(`${this.baseUrl}/search`, {
      params: { keyword }
    }).pipe(
      catchError(error => {
        console.error('Error searching etudes', error);
        return throwError(error);
      })
    );
  }
  



}











// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
// import { Etude } from '../classe/etude'; 
// import { AuthService } from '../authentication/serv/auth.service';  // Assurez-vous que le chemin vers AuthService est correct

// @Injectable({
//   providedIn: 'root'
// })
// export class EtudeService {
//   private baseUrl = 'http://localhost:8080/api/etudes';  // URL de base pour les appels API

//   constructor(private http: HttpClient, private authService: AuthService) {}  // Injection du AuthService

//   // Récupérer toutes les études avec le token JWT
//   getAllEtudes(): Observable<Etude[]> {
//     const headers = this.getAuthHeaders();  // Obtenir les en-têtes avec le token
//     return this.http.get<Etude[]>(this.baseUrl, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Récupérer une étude par ID
//   getEtudeById(id: number): Observable<Etude> {
//     const headers = this.getAuthHeaders();  // Ajouter le token aux en-têtes
//     return this.http.get<Etude>(`${this.baseUrl}/${id}`, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Créer une nouvelle étude
//   createEtude(etude: Etude): Observable<Etude> {
//     const headers = this.getAuthHeaders();  // Ajouter le token aux en-têtes
//     return this.http.post<Etude>(this.baseUrl, etude, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Mettre à jour une étude existante
//   updateEtude(id: number, etude: Etude): Observable<Etude> {
//     const headers = this.getAuthHeaders();  // Ajouter le token aux en-têtes
//     return this.http.put<Etude>(`${this.baseUrl}/${id}`, etude, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Supprimer une étude
//   deleteEtude(id: number): Observable<void> {
//     const headers = this.getAuthHeaders();  // Ajouter le token aux en-têtes
//     return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Rechercher des études par mot-clé
//   searchEtudes(keyword: string): Observable<Etude[]> {
//     const headers = this.getAuthHeaders();  // Ajouter le token aux en-têtes
//     return this.http.get<Etude[]>(`${this.baseUrl}/search`, {
//       headers,
//       params: { keyword }
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Méthode privée pour ajouter les en-têtes d'authentification
//   private getAuthHeaders(): HttpHeaders {
//     const token = this.authService.getToken();  // Récupérer le token depuis AuthService
//     return new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Ajouter le token JWT aux en-têtes
//   }

//   // Gestion des erreurs
//   private handleError(error: any) {
//     console.error('An error occurred:', error);
//     return throwError(() => new Error('Something went wrong; please try again later.'));
//   }
// }

