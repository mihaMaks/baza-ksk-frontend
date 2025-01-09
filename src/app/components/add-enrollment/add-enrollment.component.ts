import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'add-enrollment',
  templateUrl: './add-enrollment.component.html',
  styleUrls: ['./add-enrollment.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class AddEnrollmentComponent implements OnInit {
  enrollmentForm: FormGroup;
  memberId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initializing the form group with controls
    this.enrollmentForm = this.fb.group({
      university: ['', Validators.required],
      validFrom: ['', Validators.required],
      validTo: ['', Validators.required],
      pupilOrStudent: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Retrieve the member ID from the route parameters
    this.memberId = this.route.snapshot.paramMap.get('id');
    if (!this.memberId) {
      alert('Member ID is missing. Redirecting to member list.');
      this.router.navigate(['/members']);
    }
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (!this.memberId) {
      alert('Member ID is missing.');
      return;  // Early return if memberId is null
    }

    const enrollmentData = {
      ...this.enrollmentForm.value,
      memberId: this.memberId
    };

    // Post the enrollment data to the service
    this.memberService.addEnrollment(enrollmentData).subscribe(
      (response) => {
        console.log('enrollment added successfully:', response);
        alert('enrollment added successfully.');

        // Send email to the member
        this.memberService.getMemberById(enrollmentData.memberId).subscribe(
          (member) => {
            //console.log('Member data:', member);

            // Extract the email from the member object
            const memberEmail = member.email;

            // Now you can use the email (e.g., send email, log it, etc.)
            console.log('Member Email:', memberEmail);
            this.sendConfirmationEmail(memberEmail);
            // Proceed with your enrollment logic, such as sending an email or other actions
          },
          (error) => {
            console.error('Error fetching member:', error);
            alert('An error occurred while fetching the member data.');
          }
        );


        this.router.navigate([`/members/${this.memberId}`]); // Redirect to the member detail page
      },
      (error) => {
        console.error('Error adding enrollment:', error);
        alert('An error occurred while adding the enrollment.');
      }
    );
  }

  sendConfirmationEmail(memberEmail: any): void {
    // You would typically retrieve the member's email from the response or by calling another API method.
    // For now, I'm assuming you already have the member's email stored in the `this.memberId` or another property.

    //const memberEmail = 'member@example.com'; // Replace with the actual member email address.

    const emailRequest = {
      to: memberEmail,
      subject: 'Enrollment Successful',
      content: 'Dear Member, \n\nYou have been successfully enrolled as a member.'
    };

    // Call the backend to send the email
    this.memberService.sendEmail(emailRequest).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }
}
