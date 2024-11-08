import { Injectable } from '@angular/core';
//import our mock data
import {phoneList} from "../models/mockContent.data";
import {Phone} from "../models/phone";
import {catchError, Observable,  throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


//Notice the new Decorator
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'api/contents'; //url to web api
  private contents: Phone[] = phoneList;//Local copy of student data for CRUD Operations
  constructor(private http: HttpClient) { }//DI http
  //CRUD operations using HTTP Requests
  //All operations we need are:
  // Get, post, put, delete
  getContents(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getContentById(id: number): Observable<Phone> {
    return this.http.get<Phone>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError)); //return a single content
  }

  addContent(content: Phone): Observable<Phone> {
    content.id = this.generateNewId();
    return this.http.post<Phone>(this.apiUrl, content).pipe(catchError(this.handleError));
  }

  updateContent(content: Phone): Observable<Phone | undefined> {
    const url = `${this.apiUrl}/${content.id}`;
    return this.http.put<Phone>(url, content).pipe(catchError(this.handleError));
  }

  deleteContent(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }
  // New method to generate a new unique ID
  generateNewId(): number {
    return this.contents.length > 0 ? Math.max(...this.contents.map(content => content.id)) + 1 : 1;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error('Server error, please try again.'));
  }
}
