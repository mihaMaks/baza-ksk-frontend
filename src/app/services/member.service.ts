import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member } from '../member';
import {MEMBERS} from '../mock-members';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'http://localhost:8080/v1/members'; // Backend API endpoint
  private eventsUrl = 'http://localhost:8080/v1/events';
  private  formUrl = 'http://localhost:8080/v1/entry-form';

  constructor(
    private http: HttpClient
  ) {}
  /** GET members from the server */
  getMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.membersUrl).pipe(
      tap((data) => {
        console.log('Received data:', data);
      }),
      catchError((error) => {
        console.error('Error fetching members:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }
  getPaginatedMembers(page: number, size: number): Observable<any> {
    // Construct query parameters
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Send the HTTP GET request
    return this.http.get(`${this.membersUrl}/paginated`, { params });
  }
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member);
  }
  // Add a new member
  addMemberForm(member: any): Observable<any> {
    const formData = new FormData();

    for (const key in member) {
      if (member[key] instanceof File) {
        // Append files
        formData.append(key, member[key]);
      } else if (typeof member[key] === 'object') {
        // Serialize nested objects (e.g., for JSON objects)
        formData.append(key, JSON.stringify(member[key]));
      } else if (member[key] != null) {
        // Append other primitive values
        formData.append(key, member[key].toString());
      }
    }


    return this.http.post(this.formUrl, member);
  }


  getMemberById(memberId: number) {
    return this.http.get<any>(`${this.membersUrl}/${memberId}`);
  }

  getEvents(memberId: number | undefined) {
    return this.http.get<any>(`${this.membersUrl}/${memberId}/events`);
  }
}
