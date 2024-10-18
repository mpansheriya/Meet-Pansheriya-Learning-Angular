import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Phone } from "./models/phone";
import { JsonPipe, NgForOf } from "@angular/common";
import { ContentListComponent } from "./content-list/content-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, JsonPipe, ContentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Phone Management System';
}
