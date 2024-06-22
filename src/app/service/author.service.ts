// author.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../model/author';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = `${environment.apiUrl}author`;
  
  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}`);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  createAuthor(author: Author): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, author);
  }

  updateAuthor(id: number, author: Author): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, author);
  }
}
