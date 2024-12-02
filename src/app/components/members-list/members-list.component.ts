import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import {Member} from '../../member';
import {NgForOf, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCell,
    MatHeaderCell,
    MatTable,
    MatHeaderCellDef,
    MatRowDef,
    MatRow,
    MatPaginator,
    MatHeaderRow,
    MatColumnDef,
    MatCellDef,
    MatHeaderRowDef,
    MatOption,
    MatSelect,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLink
  ],
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  members: any[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['index', 'name', 'surname', 'email', 'dateOfBirth', 'homeAddress'];
  pageSize: number = 5;
  currentPage: number = 1;
  totalMembers = 0;
  totalPages = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];  // Options for number of items per page


  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMembers();
  }

  fetchMembers(): void {
    this.memberService.getPaginatedMembers(this.currentPage, this.pageSize).subscribe(
      response => {
        this.members = response.members;
        this.totalPages = response.totalPages; // Update total count for paginator
        this.totalMembers = response.totalCount;
      },
      error => console.error('Error fetching members:', error)
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; // Material paginator uses 0-based index
    this.pageSize = event.pageSize;
    this.fetchMembers(); // Fetch members for the new page
  }


  getMembers(): void {
    this.memberService.getMembers()
      .subscribe(members => this.members = members);
  }

  getPaginatedMembers(): void {
    this.memberService.getPaginatedMembers(this.currentPage, this.pageSize)
      .subscribe(members => this.members = members);
  }

  onSelect(member: any) {

  }

  goToFirstPage() {
    this.currentPage = 1 // Material paginator uses 0-based index
    this.fetchMembers();
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.fetchMembers();
  }

  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.fetchMembers();
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.fetchMembers();
  }

  protected readonly Math = Math;

  onPageSizeChange(option:number) {
    this.pageSize = option;
    this.goToFirstPage();
  }

  onRowClick(id: any) {
    this.router.navigate(['/members', id]);
  }
}
