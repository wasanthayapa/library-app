// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = `${environment.apiUrl}book`;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`);
  }

  getPaginationBooks(page: number, pageSize: number): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/${page}/${pageSize}`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  createBook(book: Book): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, book);
  }

  updateBook(id: number, book: Book): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, book);
  }
}
