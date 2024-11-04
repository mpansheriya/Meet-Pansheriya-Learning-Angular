import { Component, OnInit } from '@angular/core';
import { Phone } from "../models/phone";
import { ContentService } from "../services/content.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { catchError, map, of, switchMap } from "rxjs";

@Component({
  selector: 'app-modify-phone',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],

  templateUrl: './modify-phone.component.html',
  styleUrls: ['./modify-phone.component.scss']
})
export class ModifyContentComponent implements OnInit {
  phoneForm: FormGroup;
  phone: Phone | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private router: Router
  ) {
    this.phoneForm = this.fb.group({
      id: ['', Validators.required], // ID is required
      brand: ['', Validators.required], // Brand is required
      name: ['', Validators.required],
      colour: [''],
      type: [''],
      typec: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contentService.getContentById(+id).subscribe(phone => {
        if (phone) {
          this.phone = phone;
          this.phoneForm.patchValue(phone);
        }
      });
    }
  }

  onSubmit(): void {
    const phone: Phone = this.phoneForm.value;

    // Check if we're updating an existing phone
    if (phone.id) {
      this.contentService.updateContent(phone);
    } else {
      // For adding a new phone, generate a new ID
      const newId = this.contentService.generateNewId(); // This method will create a new ID
      phone.id = newId;
      this.contentService.addContent(phone);
    }

    this.router.navigate(['/phones']);
  }

  onDelete(): void {
    const id = this.phoneForm.get('id')?.value;
    if (id) {
      this.contentService.deleteContent(id);
      this.router.navigate(['/phones']);
    }
  }

  navigateToPhoneList(): void {
    this.router.navigate(['/phones']);
  }
}
