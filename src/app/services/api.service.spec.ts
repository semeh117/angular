import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // L'URL de notre backend Express
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // --- REQUÊTES POUR LES AUTEURS ---
  getAuteurs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auteurs`);
  }

  // --- REQUÊTES POUR LES LIVRES ---
  getLivres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/livres`);
  }

  createLivre(livre: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/livres`, livre);
  }

  deleteLivre(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/livres/${id}`);
  }
}