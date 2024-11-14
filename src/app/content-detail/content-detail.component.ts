import { Component, Input, OnInit } from '@angular/core';
import { Phone } from '../models/phone';
import { CurrencyPipe,NgIf } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ContentService } from "../services/content.service";

@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {
  @Input() content: Phone | undefined;
  phoneList: Phone[] = [];
  currentIndex: number = 0;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetches phone list from ContentService
    this.contentService.getContents().subscribe({
      next: (phones: Phone[]) => {
        this.phoneList = phones;
        this.error = null; // Clear any previous errors

        // Update the content based on route parameter
        this.route.paramMap.subscribe(params => {
          const id = Number(params.get('id'));
          if (id) {
            this.currentIndex = this.phoneList.findIndex(phone => phone.id === id);
            this.content = this.phoneList[this.currentIndex];
          }
        });
      },
      error: (err) => {
        this.error = 'Error fetching contents';
        console.error('Error fetching contents:', err);
      }
    });
  }


  goBack(): void {
    this.router.navigate(['/contents']);
  }


  goForward(): void {
    if (this.currentIndex < this.phoneList.length - 1) {
      this.currentIndex++;
      this.router.navigate(['/contents', this.phoneList[this.currentIndex].id]);
    }
  }


  goBackward(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.router.navigate(['/contents', this.phoneList[this.currentIndex].id]);
    }
  }
}
