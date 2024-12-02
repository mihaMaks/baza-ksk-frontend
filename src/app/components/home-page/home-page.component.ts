import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  welcomeMessage: string = 'Home page KSK baza';

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
