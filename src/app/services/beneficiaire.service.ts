import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiaire } from '../classe/beneficiaire';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface DataTablesResponse {
  draw?: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}
@Injectable({
  providedIn: 'root'
})

  export class BeneficiaireService {

    private baseUrl = 'http://localhost:8080/api/beneficiaires';
    constructor(private http: HttpClient) { }
  
    createBeneficiaire(beneficiaire: Beneficiaire): Observable<Beneficiaire> {      
      return this.http.post<Beneficiaire>(`${this.baseUrl}`, beneficiaire);
    }
  
    getAllBeneficiaires(dataTablesParameters: any): Observable<DataTablesResponse> {
      console.log(dataTablesParameters);
      
      const url = `${this.baseUrl}/liste`; // Adjust this URL as needed
      return this.http.post<DataTablesResponse>(url, dataTablesParameters);
  }
  
    // getAllBeneficiaires(): Observable<Beneficiaire[]> {
    //   return this.http.get<Beneficiaire[]>(`${this.baseUrl}`);
    // }
  
    getBeneficiaireById(id: number): Observable<Beneficiaire> {
      return this.http.get<Beneficiaire>(`${this.baseUrl}/${id}`);
    }
  
    updateBeneficiaire(id: number, beneficiaire: Beneficiaire): Observable<Beneficiaire> {
      return this.http.put<Beneficiaire>(`${this.baseUrl}/${id}`, beneficiaire);
    }
  
    deleteBeneficiaire(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  
    getBeneficaireByBrancheId(brancheId: number): Observable<Beneficiaire[]> {
      return this.http.get<Beneficiaire[]>(`${this.baseUrl}/branche/${brancheId}`);
    }
  
    getBeneficaireByVilleId(villeId: number): Observable<Beneficiaire[]> {
      return this.http.get<Beneficiaire[]>(`${this.baseUrl}/ville/${villeId}`);
    }
  
    getBeneficiairesByActivite(activiteId: number): Observable<Beneficiaire[]> {
      return this.http.get<Beneficiaire[]>(`${this.baseUrl}/byActivite/${activiteId}`);
    }

    getFilteredBeneficiaires(filters: any): Observable<DataTablesResponse> {
      const params = new HttpParams()
        .set('nom', filters.nom)
        .set('prenom', filters.prenom)
        .set('branche', filters.branche);
    
      return this.http.get<DataTablesResponse>(`${this.baseUrl}/filter`, { params });
    }
    

  
  }
