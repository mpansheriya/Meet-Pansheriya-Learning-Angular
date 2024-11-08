import {Component, OnInit} from '@angular/core';
import {Phone} from "../models/phone";
import {ContentService} from "../services/content.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-modify-content',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './modify-content.component.html',
  styleUrl: './modify-content.component.scss'
})
export class ModifyContentComponent implements OnInit{
  contentForm: FormGroup;
  content: Phone | undefined;
  error: string | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private router: Router
  ) {
    this.contentForm = this.fb.group({
      //Auto filling the ID field with a new ID
      id: [contentService.generateNewId()], //ID is NOT required
      brand: ['', Validators.required],//First name is required
      name: ['', Validators.required],
      colour: [''],
      typeC: [false]
    });
  }
  /*
  This code initializes the component by fetching the details of a specific student based on the ID provided
   in the route parameters. It then populates the reactive form with the student's data, allowing the user
    to view or modify the student's details.
   */
  ngOnInit(): void {
    // first we retreive the student ID from the route parameters using the ActivatedRoute service
    //the paramMap.get('id') method extracts the 'id' parameter from the route, and Number()
    // converts it to a numeric value. This ID is then used to fetch the student's details.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      //if the ID is valid, the StudentService is used to fetch the student's details by calling the getStudentById method
      this.contentService.getContentById(id).subscribe( {
        next: content => {
          if (content) {
            //If the student object is valid, the patchValue method of the reactive form
            // (studentForm) is called to populate the form with the student's data The patchValue method updates the form controls with the
            // values from the student object without resetting the entire form
            this.contentForm.patchValue(content);
          }
        },
        error: err => {
          this.error = 'Error fetching content';
          console.error('Error fetching content:', err);
        }
      });
    }
  }
  /*
  onSubmit method in the ModifyStudentComponent class is responsible for handling
   the form submission when the user attempts to save the students details.
    This method first checks if the form is valid by using the valid property of the reactive form
   */
  onSubmit(): void {
    if (this.contentForm.valid) {
      //Iff the form is valid, it extracts the form values into a student object of type User
      const content: Phone = this.contentForm.value;
      /*
      Here we have a little bit of logic, first iff the student.id
      and just being updated

      if it does not exist, we know that the student is new and we need to add it to the list
       */
      if (content.id) {
        this.contentService.updateContent(content).subscribe(() => this.router.navigate(['/contents']));
      } else {
        content.id = this.contentService.generateNewId();
        this.contentService.addContent(content).subscribe(() => this.router.navigate(['/contents']));
      }
    }
  }
  onDelete(): void {
    const id = this.contentForm.value.id;
    if (id) {
      this.contentService.deleteContent(id).subscribe(() => this.router.navigate(['/contents']));
    }
  }

  navigateToStudentList(): void {
    this.router.navigate(['/contents']);
  }


}
