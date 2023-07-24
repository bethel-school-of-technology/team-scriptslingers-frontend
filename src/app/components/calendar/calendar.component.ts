import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/models/event';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

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
  isLoggedIn: boolean | undefined;
  username: string = "not logged in";
  inEvent: boolean | undefined;
  eventUserList?: string[] = ["No one has signed up for this event"];
  
  constructor(private eventService: EventService, public userService: UserService, private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    this.eventService.getAllFutureEvent().subscribe(events => {
      // console.log(events);
      this.eventList = events;
      this.eventId = this.eventList[0].eventId;
      this.showCurrentEvent()
    });  
    this.checkLogIn()

  }

  showCurrentEvent() {
    var tempAttendeeList: string | undefined;
    this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
        this.currentEvent = foundEvent;
        tempAttendeeList = foundEvent.attendeeList;
        this.eventUserList = tempAttendeeList?.split(", ");

        if (tempAttendeeList === null || tempAttendeeList === "") {
          this.eventUserList = ["No one has signed up for this event"];
        }

        const token = localStorage.getItem('MoWildToken');
        if (token) {
          this.isLoggedIn = true;
          const decodedToken: any = jwt_decode(token);
          this.username = `${decodedToken.given_name} ${decodedToken.family_name}`;

          if(tempAttendeeList?.includes(this.username)){
            this.inEvent = true;
            // console.log(this.inEvent);
          } else {
            this.inEvent = false;
            // console.log(this.inEvent);
          }
        } 
      });
  }

  checkLogIn() {
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges();
      // console.log('isLoggedIn', isLoggedIn)
    });
  }

  showEventDetails(currentId?: number) {
    if(window.innerWidth <= 960) {
      this.router.navigate(["/event-details", currentId]);
    }
    this.eventId = currentId;
    this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
      this.currentEvent = foundEvent;
    });
    this.showCurrentEvent();
  }

  onDelete(eventId: number | undefined) {
    // console.log('eventList:', this.eventList)
    // console.log('onDelete id', eventId);
    if (eventId != undefined) {
      this.eventService.deleteEvent(eventId).subscribe(response => {
        console.log(response);
        window.alert("Item Successfully removed");
        // this.router.navigate(['home']);
        this.ngOnInit();
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

  signUp(){
    if (this.currentEvent.attendeeList == null || this.currentEvent.attendeeList == "" || this.currentEvent.attendeeList == "string"){
      this.currentEvent.attendeeList = this.username;
      this.eventService.updateAttendees(this.currentEvent).subscribe(edittedEvent => {
        // console.log(edittedEvent);
        // this.router.navigate(["home"]);
        this.showCurrentEvent();
      })
    } else {
      this.currentEvent.attendeeList = `${this.currentEvent.attendeeList}, ${this.username}`;
      this.eventService.updateAttendees(this.currentEvent).subscribe(edittedEvent => {
        // console.log(edittedEvent);
        // this.router.navigate(["home"]);
        this.showCurrentEvent();
      });
    }
  }

  cancel(){
    var tempList = this.currentEvent.attendeeList?.split(", ");
    
    if(tempList){
      for (let i = 0; i < tempList.length; i++) {
        const guest = tempList[i];
        if(guest == this.username){
          tempList.splice(i, 1);
          this.currentEvent.attendeeList = tempList.join(", ");

          this.eventService.updateAttendees(this.currentEvent).subscribe(edittedEvent => {
            // console.log(edittedEvent);
            // this.router.navigate(["home"]);
            this.showCurrentEvent();
          });
        }
      }
    }
  }
}
