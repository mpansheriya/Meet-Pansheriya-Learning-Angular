import { Component, OnInit } from '@angular/core';
import { Phone } from '../models/phone';
import { NgForOf } from '@angular/common';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { ContentService } from '../services/content.service';

Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [
    NgForOf,
    ContentDetailComponent
  ],
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
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
      error: err => console.error('Error fetching Phones', err),
      complete: () => console.log('Phone data fetch complete!')
    });
  }

  selectedPhone?: Phone;
  selectPhone(phone: Phone): void {
    this.selectedPhone = phone;
  }
}
