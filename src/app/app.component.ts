import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Phone } from './models/phone';
import {NgFor,NgIf} from "@angular/common"; // Adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgFor,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed to styleUrls
})
export class AppComponent {
  title = 'Phone List';

  phoneList: Phone[] = [
    { Brand: 'Apple', name: 'iPhone 13', colour: 'Black', type: 'Smartphone', typec: true },
    { Brand: 'Samsung', name: 'Galaxy S21', colour: 'Silver', type: 'Smartphone', typec: true },
    { Brand: 'Google', name: 'Pixel 6', colour: 'White', type: 'Smartphone' },
    { Brand: 'Nokia', name: '3310', colour: 'Blue', type: 'Feature Phone' },
    { Brand: 'OnePlus', name: '9 Pro', colour: 'Green', type: 'Smartphone', typec: true }
  ];
}
