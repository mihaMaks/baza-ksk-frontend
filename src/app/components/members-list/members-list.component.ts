import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../member';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this import
import { MatInputModule } from '@angular/material/input'; // Add this import
import { MatSelectModule } from '@angular/material/select';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {CommonModule, NgForOf} from '@angular/common';
import {NoMembersDialogComponent} from '../no-members-found-dialog/no-members-found-dialog.component'; // Add this import

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,    // Add this to imports array
    MatInputModule,        // Add this to imports array
    MatSelectModule,       // Add this to imports array
    FormsModule,
    MatPaginator,
    MatMenu,
    MatMenuTrigger,
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
    MatMenuItem,
    NgForOf
  ],
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  members: any[] = [];
  nameFilter: string = '';
  surnameFilter: string = '';
  emailFilter: string = '';
  pendingFilter: string = '';
  error: string | null = null;
  displayedColumns: string[] = ['index', 'name', 'surname', 'email', 'dateOfBirth', 'homeAddress'];
  pageSize: number = 5;
  currentPage: number = 1;
  totalMembers = 0;
  totalPages = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  noMembersFound: boolean = false;

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMembers();  // Fetch members on initial load
  }

  // Fetch members with pagination and search query
  fetchMembers(): void {
    if (this.currentPage <= 0 || this.pageSize <= 0) {
      console.error('Invalid page or size parameters');
      return;
    }
    this.memberService.getPendingPaginatedMembers(this.currentPage, this.pageSize, this.nameFilter, this.surnameFilter, this.emailFilter, this.pendingFilter).subscribe(
      (response: any) => {
        // Check if response.members is not null or undefined
        if (response && response.members) {
          this.members = response.members;
          this.totalMembers = response.totalMembers;
          this.totalPages = response.totalPages;
          this.noMembersFound = false;
        } else {
          console.error("Members data is missing from the response.");
          // Handle the error gracefully (e.g., show an empty table or a message)
          this.members = [];
          this.noMembersFound = true;
        }
      },
      (error) => {
        console.error("An error occurred:", error);
      }
    );
  }

  // Search for members based on the search query
  onSearch(): void {
    this.currentPage = 1;  // Reset to the first page when searching
    this.fetchMembers();  // Fetch members based on the search query
  }

  // Pagination methods
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; // Material paginator uses 0-based index
    this.pageSize = event.pageSize;
    this.fetchMembers();  // Fetch members for the new page, considering the search query
  }

  // Handle row click
  onRowClick(id: any) {
    this.router.navigate(['/members', id]);
  }

  // Navigate to first page
  goToFirstPage() {
    this.currentPage = 1;  // Reset to first page
    this.fetchMembers();
  }

  // Navigate to previous page
  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.fetchMembers();
  }

  // Navigate to next page
  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.fetchMembers();
  }

  // Navigate to last page
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.fetchMembers();
  }

  // Change page size
  onPageSizeChange(option: number) {
    this.pageSize = option;
    this.goToFirstPage();
  }

  protected readonly Math = Math; // For math functions


}
