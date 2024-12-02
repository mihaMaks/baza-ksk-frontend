import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MemberService } from '../../services/member.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class EntryFormComponent {
  memberForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private memberService: MemberService) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: [''],
      homeAddress: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.pattern(/^\d{4}$/)]],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      status: [false],
      pending: [false],
    });
  }

  // Triggered when a file is selected
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
  onSubmit(form: any): void {
    if (!form.valid || !this.selectedFile) {
      alert('Please fill in all fields and select a file.');
      return;
    }
    // Create a FormData object
    const memberData = new FormData();

    memberData.append('member', JSON.stringify(this.memberForm.value));

    // Add the selected file
    memberData.append('file', this.selectedFile);
    for (const [key, value] of memberData.entries()) {
      console.log(`${key}:`, value);
    }

    // Use member service to save member data
    this.memberService.addMemberForm(memberData).subscribe(
      response => {
        alert('Member added successfully!');
        this.memberForm.reset();
      },
      error => {
        console.error('Error adding member:', error);
        alert('Failed to add member.');
      }
    );
  }
}
