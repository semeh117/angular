import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getLivres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/livres`);
  }
  getLivresById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/livres/${id}`);
  }

  deleteLivre(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/livres/${id}`);
  }

  createLivre(livre: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/livres`, livre);
  }
  updateLivres(id: string, livre: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/livres/${id}`, livre);
  }

  getAuteurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auteurs`);
  }
  getAuteursById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auteurs/${id}`);
  }
  createAuteur(auteur: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auteurs`, auteur);
  }
  updateAuteur(id: string, auteur: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auteurs/${id}`, auteur);
  }
  deleteAuteur(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auteurs/${id}`);
  }
}
