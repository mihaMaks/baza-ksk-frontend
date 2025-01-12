import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EventService } from '../../services/event.service'; // Make sure to create a service for handling events
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      starts: ['', Validators.required],
      ends: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Optionally initialize any data when the component loads
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      // Optionally, display a message or error state to the user
      alert('Please fill in all required fields with valid information.');
      return; // Do not proceed with the submission if invalid
    }

    // If the form is valid, prepare the data to be submitted
    const event = this.eventForm.value;

    // Call the service method to add the event to the database
    this.eventService.addEvent(event).subscribe(
      (response) => {
        // Successfully added the event, you can redirect or show a success message
        console.log('Event added successfully:', response);
        this.router.navigate(['/events']); // Redirecting to the events list page
      },
      (error) => {
        // Handle any errors that occur during the API call
        console.error('Error adding event', error);
        alert('An error occurred while adding the event.');
      }
    );
  }
}
