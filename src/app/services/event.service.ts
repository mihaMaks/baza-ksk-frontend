import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://api.example.com/events';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch events for a specific member based on their ID
  getMemberEvents(memberId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?memberId=${memberId}`);
  }
}
