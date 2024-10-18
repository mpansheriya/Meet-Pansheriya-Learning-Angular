import { Component,Input } from '@angular/core';
import { Phone } from '../models/phone';
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './content-detail.component.html',
  styleUrl: './content-detail.component.css'
})
export class ContentDetailComponent {
  @Input() phone?: Phone;
}
