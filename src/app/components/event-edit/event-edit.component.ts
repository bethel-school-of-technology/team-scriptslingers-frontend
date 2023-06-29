import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
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

  onSubmit(){
    this.eventService.editEvent(this.eventId, this.currentEvent).subscribe(edittedEvent => {
      console.log(edittedEvent);
      window.alert("Item updated Successfully");
    this.router.navigate(['calendar']);
    }, error => {
      console.log('Error: ', error)
      if (error.status === 401 || error.status === 403) {
        this.router.navigate(['signin']);
      }
    });
  }

}
