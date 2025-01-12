import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatPaginator,
    MatTable,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./event-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: any[] = [];
  nameFilter: string = '';
  locationFilter: string = '';
  dateFilter: string = '';
  error: string | null = null;
  displayedColumns: string[] = ['index', 'name', 'place', 'starts', 'ends', 'actions'];
  pageSize: number = 5;
  currentPage: number = 1;
  totalEvents = 0;
  totalPages = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  noEventsFound: boolean = false;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents(); // Fetch events on initial load
  }

  // Fetch events with pagination and search query
  fetchEvents(): void {
    console.log('Fetching events:', this.currentPage, this.pageSize);
    if (this.currentPage <= 0 || this.pageSize <= 0) {
      console.error('Invalid page or size parameters');
      return;
    }
    this.eventService.getPaginatedEvents(this.currentPage, this.pageSize, this.nameFilter, this.locationFilter, this.dateFilter).subscribe(
      (response: any) => {
        if (response && response.events) {
          this.events = response.events;
          this.events = this.events.map((event: { starts: string; ends: string; }) => ({
            ...event,
            starts: this.formatDateString(event.starts),
            ends: this.formatDateString(event.ends),
          }));
          this.totalEvents = response.totalCount;
          this.totalPages = response.totalPages;
          this.noEventsFound = false;
        } else {
          this.events = [];
          this.noEventsFound = true;
        }
      },
      (error) => {
        console.error("An error occurred:", error);
      }
    );
  }

  // Search for events
  onSearch(): void {
    this.currentPage = 1; // Reset to the first page when searching
    this.fetchEvents();
  }

  // Pagination methods
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; // Material paginator uses 0-based index
    this.pageSize = event.pageSize;
    this.fetchEvents();
  }

  // Navigate to event details
  onRowClick(id: any) {
    this.router.navigate(['/events', id]);
  }

  // Navigate to first page
  goToFirstPage() {
    this.currentPage = 1; // Reset to first page
    this.fetchEvents();
  }

  // Navigate to previous page
  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.fetchEvents();
  }

  // Navigate to next page
  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.fetchEvents();
  }

  // Navigate to last page
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.fetchEvents();
  }

  // Change page size
  onPageSizeChange(option: number) {
    this.pageSize = option;
    this.goToFirstPage();
  }

  formatDateString(input:string) {
    // Extract the date part and time part from the input string
    const datePart = input.substring(0, 10); // "2025-03-05"
    const timePart = input.substring(11, 19); // "09:00:00"

    // Format the string to match the desired format
    return `${datePart} @ ${timePart}`;
  }

}
