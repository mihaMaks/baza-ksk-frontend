import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MembersListComponent} from './components/members-list/members-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterLink, RouterOutlet, MembersListComponent, NgIf],
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title = 'Membership Management';
  showNavbar = true;

  constructor(private router: Router) {
    // Subscribe to route changes to toggle the navbar visibility
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the URL is exactly '/' (home page) or another route
        this.showNavbar = event.urlAfterRedirects !== '/'; // Use `urlAfterRedirects` for accuracy
      }
    });
  }
  navigateTo(addEvent: string) {

  }
}
