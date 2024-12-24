import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MemberService } from '../../services/member.service';
import {DatePipe, NgIf} from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatRow,
  MatTable
} from '@angular/material/table';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {BrowserModule, DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatHeaderRow,
    MatCard,
    MatCardHeader,
    NgIf,
    MatCardContent,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatRow,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
  ],
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  member: any[] = [];  // To be used in the member table
  events: any[] = [];  // To be used in the events table
  enrollments: any[] = [];
  memberKeyValuePairs: { key: string, value: any }[] = [];
  displayedColumns: string[] = ['key', 'value'];
  memberId: number | undefined;

  attributeOrder: string[] = ['id', 'name', 'surname', 'email', 'phoneNumber', 'dateOfBirth', 'homeAddress', 'zipCode', 'status', 'pending'];
  displayedEventColumns: string[] = ['eventName', 'starts', 'ends', 'place'];
  displayedEnrollmentColumns: string[] = ['university', 'validFrom', 'validTo', 'pupilOrStudent'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.memberId = +params.get('id'); // Get the ID from the route
      this.loadMemberData(this.memberId);
      this.loadEventData();
      this.loadCertificateData();
    });
  }

  // Load certificates data using the service
  loadCertificateData(): void {
    if (this.memberId) {
      this.memberService.getEnrollments(this.memberId).subscribe(
        data => {
          this.enrollments = data;
        },
        error => {
          console.error('Error fetching certificate data', error);
        }
      );
    }
  }

  // Load member data using the service
  loadMemberData(id: number): void {
    this.memberService.getMemberById(id).subscribe(
      data => {
        //this.member = [data]; // Wrap in an array for mat-table compatibility
        this.member = data;
        this.generateKeyValuePairs();
      },
      error => {
        console.error('Error fetching member data', error);
      }
    );
  }
  private generateKeyValuePairs(): void {
    // Ensure the key-value pairs are sorted according to `attributeOrder`
    this.memberKeyValuePairs = this.attributeOrder
      .filter((key) => key in this.member) // Include only keys present in the member object
      .map((key) => ({
        key,
        value: this.member[key as keyof typeof this.member] // Use type assertion
      }));
  }

  // Load events data using the service
  loadEventData(): void {
    this.memberService.getEvents(this.memberId).subscribe(
      data => {
        // Preprocess dates to remove '[UTC]' if present
        this.events = data.map((event: { starts: string; ends: string; }) => ({
          ...event,
          starts: event.starts.replace(/\[UTC\]/, ''),
          ends: event.ends.replace(/\[UTC\]/, ''),
        }));
      },
      error => {
        console.error('Error fetching event data', error);
      }
    );
  }

  onEventRowClick(event: any) {
    console.log('Event clicked:', event);
    // Optionally navigate to an event details page or perform another action
    // this.router.navigate(['/events', event.id]);
  }

  navigateToAddEnrollment() {
    // Get the member ID from the current route
    const memberId = this.route.snapshot.paramMap.get('id');

    if (memberId) {
      // Navigate to the add-certificate route
      this.router.navigate([`members/${memberId}/add-enrollment`]);
    } else {
      console.error('Member ID not found in the route');
    }
  }


  navigateToShowFiles(): void {
    const memberId = this.route.snapshot.paramMap.get('id');

    if (memberId) {
      this.memberService.getMemberFile(+memberId).subscribe(
        (file: Blob) => {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank'); // Open the file in a new tab
        },
        (error) => {
          console.error('Error fetching file:', error);
          alert('Error fetching file');
        }
      );
    } else {
      console.error('Member ID not found in the route');
    }
  }
}
