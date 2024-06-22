// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`);
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
