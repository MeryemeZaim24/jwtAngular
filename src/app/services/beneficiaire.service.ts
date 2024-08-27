
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiaire } from '../classe/beneficiaire';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  private apiUrl = 'http://localhost:8080/api/beneficiaires';

  constructor(private http: HttpClient) {}

  getAllBeneficiaires(): Observable<Beneficiaire[]> {
    return this.http.get<Beneficiaire[]>(this.apiUrl);
  }

  getBeneficiaireById(id: number): Observable<Beneficiaire> {
    return this.http.get<Beneficiaire>(`${this.apiUrl}/${id}`);
  }

  createBeneficiaire(beneficiaire: Beneficiaire): Observable<Beneficiaire> {
    return this.http.post<Beneficiaire>(this.apiUrl, beneficiaire);
  }

  updateBeneficiaire(id: number, beneficiaire: Beneficiaire): Observable<Beneficiaire> {
    return this.http.put<Beneficiaire>(`${this.apiUrl}/${id}`, beneficiaire);
  }

  deleteBeneficiaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // getBeneficiaireByBrancheId(brancheId: number): Observable<Beneficiaire[]> {
  //   return this.http.get<Beneficiaire[]>(`${this.apiUrl}/branche/${brancheId}`);
  // }

  // getBeneficiaireByVilleId(villeId: number): Observable<Beneficiaire[]> {
  //   return this.http.get<Beneficiaire[]>(`${this.apiUrl}/ville/${villeId}`);
  // }

  // getBeneficiairesByActivite(activiteId: number): Observable<Beneficiaire[]> {
  //   return this.http.get<Beneficiaire[]>(`${this.apiUrl}/byActivite/${activiteId}`);
  // }
}
