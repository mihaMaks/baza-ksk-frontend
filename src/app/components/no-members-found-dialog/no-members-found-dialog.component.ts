import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-no-members-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  template: `
    <h1 mat-dialog-title>No Members Found</h1>
    <div mat-dialog-content>
      <p>No members were found for the given search criteria.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `
})
export class NoMembersDialogComponent {}
