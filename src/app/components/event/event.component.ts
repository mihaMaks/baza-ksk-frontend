import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  imports: [
    MatTable,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    DatePipe,
    MatButton
  ],
  standalone: true
})
export class EventComponent implements OnInit {
  event: any[] = [];
  eventId: number | undefined;
  members: any[] = [];
  eventKeyValuePairs: { key: string, value: any }[] = [];
  displayedColumns: string[] = ['key', 'value'];
  attributeOrder: string[] = ['id', 'name', 'place', 'starts', 'ends'];
  displayedMemberColumns: string[] = ['id', 'name', 'surname', 'dateOfBirth', 'email'];

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.eventId = +params.get('id'); // Get the ID from the route
      this.loadEventData(this.eventId);
      this.loadMemberData(this.eventId);
    });
  }

  private loadEventData(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe(
      (data) => {
        this.event = data;
        this.event = {
          ...data,
          starts: this.formatDateString(data.starts),
          ends: this.formatDateString(data.ends),
        };

        this.generateKeyValuePairs();
      },
      (error) => {
        console.error('Error fetching events data:', error);
      }
    );

  }

  private loadMemberData(eventId: number): void {
    this.eventService.getEventMembers(eventId).subscribe(
      (data: any[]) => {
        this.members = data;
      },
      (error: any) => {
        console.error('Error fetching events data:', error);
      }
    );
  }

  private generateKeyValuePairs(): void {
    // Ensure the key-value pairs are sorted according to `attributeOrder`
    this.eventKeyValuePairs = this.attributeOrder
      .filter((key) => key in this.event) // Include only keys present in the member object
      .map((key) => ({
        key,
        value: this.event[key as keyof typeof this.event] // Use type assertion
      }));
  }
  deleteEvent(): void {
    if (this.eventId) {
      // Confirm the deletion
      const confirmDelete = confirm('Are you sure you want to delete this event?');
      if (confirmDelete) {
        this.eventService.deleteEvent(this.eventId).subscribe(
          () => {
            alert('Event deleted successfully.');
            this.router.navigate(['/events']); // Navigate to events list or another appropriate route
          },
          error => {
            console.error('Error deleting event:', error);
            alert('An error occurred while trying to delete the event.');
          }
        );
      }
    } else {
      console.error('Event ID is not available for deletion.');
    }
  }


  formatDateString(input:string) {
    // Extract the date part and time part from the input string
    const datePart = input.substring(0, 10); // "2025-03-05"
    const timePart = input.substring(11, 19); // "09:00:00"

    // Format the string to match the desired format
    return `${datePart} @ ${timePart}`;
  }

}
