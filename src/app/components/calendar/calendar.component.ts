import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/models/event';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  eventList: Event[] = [];
  eventId?: number;
  currentEvent: Event = new Event();
  small: boolean | undefined;
  
  constructor(private eventService: EventService, public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllFutureEvent().subscribe(events => {
      console.log(events);
      this.eventList = events;
      this.eventId = this.eventList[0].eventId;
      this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
        this.currentEvent = foundEvent;
      }); 
    });
  }

  showEventDetails(currentId?: number) {
    if(window.innerWidth < 950) {
      this.router.navigate(["/event-details", currentId]);
    }
    this.eventId = currentId;
    this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
      this.currentEvent = foundEvent;
  });
  }
}
