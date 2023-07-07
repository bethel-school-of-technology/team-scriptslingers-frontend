import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 0;
  currentEvent: Event = new Event(this.eventId);
  eventList: Event[] = [];
  isLoggedIn: boolean | undefined;

  constructor(private eventService: EventService, private userService: UserService, private actRoute: ActivatedRoute, private router: Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get("id") ?? "";
  console.log('routeId', routeId)
  this.eventId = parseInt(routeId);
  this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
      console.log(foundEvent);
      this.currentEvent = foundEvent;
    });

    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges();
      console.log('isLoggedIn', isLoggedIn)
    })
    
  }

  onDelete(eventId: number | undefined) {
    console.log('eventList:', this.eventList)
    console.log('onDelete id', eventId);
    if (eventId != undefined) {
      this.eventService.deleteEvent(eventId).subscribe(response => {
        console.log(response);
        window.alert("Item Successfully removed");
        this.router.navigateByUrl("home");
        location.reload();
      }, error => {
        console.log('Error: ', error)
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['login']);
        }
      });
    } else {
      console.log('id is undefined');
    }
  }

}
