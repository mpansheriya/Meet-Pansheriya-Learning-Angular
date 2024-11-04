import { Injectable } from '@angular/core';
//import our mock data
import {phoneList} from "../models/mockContent.data";
import { Observable, of } from 'rxjs';
import {Phone} from "../models/phone";

//Notice the new Decorator
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents: Phone[] = phoneList; //Local copy of content (phone) data for CRUD Operations
  constructor() { }
  //Returns all contents (phones)

  getContents(): Observable<Phone[]> {
    return of(this.contents);
  }

  getContentById(id: number): Observable<Phone | undefined> {
    return of(this.contents.find(content => content.id === id));
  }

  addContent(content: Phone): Observable<Phone> {
    this.contents.push(content);
    return of(content);
  }

  updateContent(updatedContent: Phone): Observable<Phone | undefined> {
    const index = this.contents.findIndex(content => content.id === updatedContent.id);
    if (index > -1) {
      this.contents[index] = updatedContent;
      return of(updatedContent);
    }
    return of(undefined);
  }

  deleteContent(id: number): void {
    this.contents = this.contents.filter(content => content.id !== id);
  }

  // New method to generate a new unique ID
  generateNewId(): number {
    return this.contents.length > 0 ? Math.max(...this.contents.map(content => content.id)) + 1 : 1;
  }
}
