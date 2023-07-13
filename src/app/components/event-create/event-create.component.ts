import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventId: number = 0;
  newEvent: Event = new Event(this.eventId);
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(private eventService: EventService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('MoWildToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.firstName = decodedToken.given_name;
      this.lastName = decodedToken.family_name;
    }
    
  }

  addEvent(){
    this.newEvent.hostName = `${this.firstName} ${this.lastName}`;
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
