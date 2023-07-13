import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseURL: string = "https://localhost:7197/api/Events";
  authURL: string = "https://localhost:7197/api/auth";
  tokenKey: string = "MoWildToken"

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseURL);
  }

  getAllFutureEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseURL + "/future-events");
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(this.baseURL + "/" + eventId);
  }

  getEventsByMonth(eventMonth: number, eventYear: number): Observable<Event> {
    return this.http.get<Event>(this.baseURL + "/" + eventMonth + "/" + eventYear);
  }

  CreateEvent(newEvent: Event) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.post(this.baseURL, newEvent, { headers: reqHeaders });
  }

  editEvent(eventId: number, editedEvent: Event): Observable<Event> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
  }
    return this.http.put(this.baseURL + "/" + eventId, editedEvent, { headers: reqHeaders });
  }

  deleteEvent(eventId: number) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
  }
    return this.http.delete(this.baseURL + "/" + eventId, { headers: reqHeaders })
  }
}
