import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    const url = `${environment.tabcorpLibraryApiUrl}/api/books`;
    return this.http.get<Book[]>(url).pipe(
      map(data => data)
    );
  }

  createBook(body: any): Observable<Book> {
    const url = `${environment.tabcorpLibraryApiUrl}/api/books`;
    return this.http.post<Book>(url, body).pipe(
      map(data => data)
    );
  }
}
