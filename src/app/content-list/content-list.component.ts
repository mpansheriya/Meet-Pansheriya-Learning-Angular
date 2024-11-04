import { Component, OnInit } from '@angular/core';
import { Phone } from '../models/phone';
import { NgForOf } from '@angular/common';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { ContentService } from '../services/content.service';
import {RouterLink} from "@angular/router";
Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    NgForOf,
    ContentDetailComponent,
    RouterLink,
  ],
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  // Placeholder values for the table
  displayedColumns: string[] = ['id', 'brand', 'name', 'colour', 'type', 'isAdmin'];
  phoneList: Phone[] = [];

  constructor(private contentService: ContentService) {
    // This constructor is primarily used for dependency injection
  }
  ngOnInit() {
    // This lifecycle hook is a good place to fetch and init our data
    this.contentService.getContents().subscribe({
      next: (data: Phone[]) => this.phoneList = data,
      error: err => console.error('Error fetching Contents', err),
      complete: () => console.log('Content data fetch complete!')
    });
  }

  selectedPhone?: Phone;
  selectPhone(phone: Phone): void {
    //this.selectedContent = content;
  }
}
