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

    const enrollmentData = {
      ...this.enrollmentForm.value,
      memberId: this.memberId
    };

    // Post the enrollment data to the service
    this.memberService.addEnrollment(enrollmentData).subscribe(
      (response) => {
        console.log('enrollment added successfully:', response);
        alert('enrollment added successfully.');
        this.router.navigate([`/members/${this.memberId}`]); // Redirect to the member detail page
      },
      (error) => {
        console.error('Error adding enrollment:', error);
        alert('An error occurred while adding the enrollment.');
      }
    );
  }
}
