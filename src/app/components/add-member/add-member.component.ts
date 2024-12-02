import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MemberService } from '../../services/member.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Member} from '../../member';

@Component({
  selector: 'add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class AddMemberComponent {
  memberForm: FormGroup;

  constructor(private fb: FormBuilder, private memberService: MemberService, private router: Router) {
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


  onSubmit(): void {
    if (this.memberForm.invalid) {
      // Optionally, display a message or error state to the user
      alert('Please fill in all required fields with valid information.');
      return; // Do not proceed with the submission if invalid
    }

    // If the form is valid, prepare the data to be submitted
    const member: Member = this.memberForm.value;

    // Call the service method to add the member to the database
    this.memberService.addMember(member).subscribe(
      (response) => {
        // Successfully added the member, you can redirect or show a success message
        console.log('Member added successfully:', response);
        this.router.navigate(['/members']); // Redirecting to the members list page
      },
      (error) => {
        // Handle any errors that occur during the API call
        console.error('Error adding member', error);
        alert('An error occurred while adding the member.');
      }
    );
  }


}
