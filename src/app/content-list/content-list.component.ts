import { Component, OnInit } from '@angular/core';
import { Phone } from '../models/phone';
import {CurrencyPipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { ContentService } from '../services/content.service';
import {RouterLink} from "@angular/router";
import {FullNamePipe} from "../pipes/full-name.pipe";
Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    NgForOf,
    ContentDetailComponent,
    RouterLink,
    NgIf,
    CurrencyPipe,
    FullNamePipe,
    UpperCasePipe
  ],
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  // Placeholder values for the table
  displayedColumns: string[] = ['id', 'brand', 'name', 'colour',  'isAdmin'];
  phoneList: Phone[] = [];
  error: string | null = null; //Var to hold an error message

  constructor(private contentService: ContentService) {
    // This constructor is primarily used for dependency injection
  }
  ngOnInit(){
    // This lifecycle hook is a good place to fetch and init our data
    this.contentService.getContents().subscribe({
      next: (data: Phone[]) => {
        this.phoneList = data;
        this.error = null; // Clear any previous errors
      },
      error: err => {
        this.error = 'Error fetching contents'; // Set an error message
        console.error("Error fetching Contents", err);
      },
      complete: () => console.log("Content data fetch complete!")
    });
  }
  selectedContent?: Phone;
  selectContent(content: Phone): void {
    this.selectedContent = content;
  }



}
