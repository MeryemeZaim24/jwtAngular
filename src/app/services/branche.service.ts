

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branche } from '../classe/branche';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrancheService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/branches';


  getAllBranches(): Observable<Branche[]> {
    return this.http.get<Branche[]>(`${this.baseUrl}`);
  }
  // Créer une nouvelle branche
  createBranche(branche: Branche): Observable<Branche> {
    return this.http.post<Branche>(`${this.baseUrl}`, branche);
  }

}

