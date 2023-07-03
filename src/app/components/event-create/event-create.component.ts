import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventId: number = 0;
  newEvent: Event = new Event(this.eventId);

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addEvent(){
    this.eventService.CreateEvent(this.newEvent).subscribe(() => {
      window.alert("Posted Successfully");
      this.router.navigate(['calendar'])
    }, error => {
      console.log('Error: ', error)
      if (error.status === 401 || error.status === 403) {
        this.router.navigate(['signin']);
      }
    })
  }
}
