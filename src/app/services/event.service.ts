import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8081/v1/events';

  constructor(private http: HttpClient) {}

  getPaginatedEvents(page: number, size: number, name?: string, location?: string, date?: string): Observable<any> {
    //const params = { page: page.toString(), size: size.toString(), name, location, date };

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.baseUrl}/paginated`, { params });
  }
  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getEventMembers(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${eventId}/members`);
  }

  addEvent(event: any) {
    return this.http.post<any>(`${this.baseUrl}`, event);
  }

  deleteEvent(memberId: number): Observable<void> {
    const url = `${this.baseUrl}/${memberId}`;
    return this.http.delete<void>(url, { responseType: 'text' as 'json' });
  }
}
