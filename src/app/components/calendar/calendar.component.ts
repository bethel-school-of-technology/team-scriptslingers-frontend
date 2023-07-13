import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  eventList: Event[] = [];

  constructor(private eventService: EventService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.eventService.getAllFutureEvent().subscribe(events => {
      console.log(events);
      this.eventList = events;
    });
  }

}
