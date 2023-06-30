import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 0;
  currentEvent: Event = new Event(this.eventId);

  constructor(private eventService: EventService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get("id") ?? "";
  console.log('routeId', routeId)
  this.eventId = parseInt(routeId);
  this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
      console.log(foundEvent);
      this.currentEvent = foundEvent;
    });
  }

}
