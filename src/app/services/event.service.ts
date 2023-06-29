import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseURL: string = "https://localhost:7197/Events";

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

  createEvent(newEvent: Event) {
    return this.http.post(this.baseURL, newEvent);
  }

  editEvent(eventId: number, editedEvent: Event) {
    return this.http.put(this.baseURL + "/" + eventId, editedEvent);
  }

  deleteEvent(eventId: number) {
    return this.http.delete(this.baseURL + "/" + eventId)
  }
}
