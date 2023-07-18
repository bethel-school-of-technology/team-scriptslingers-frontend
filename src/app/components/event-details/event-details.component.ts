import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { TemplateBindingParseResult } from '@angular/compiler';

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
  username: string = "not logged in";
  inEvent: boolean | undefined;

  constructor(private eventService: EventService, public userService: UserService, private actRoute: ActivatedRoute, private router: Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get("id") ?? "";
    console.log('routeId', routeId)
    this.eventId = parseInt(routeId);
    var tempAttendeeList: string | undefined;

    this.eventService.getEventById(this.eventId).subscribe(foundEvent => {
      console.log(foundEvent);
      this.currentEvent = foundEvent;

      // until line 46 is code for seeing if a user is signed up for the current event
      tempAttendeeList = foundEvent.attendeeList;
      console.log(tempAttendeeList);

      const token = localStorage.getItem('MoWildToken');
      if (token) {
        this.isLoggedIn = true;
        const decodedToken: any = jwt_decode(token);
        this.username = `${decodedToken.given_name} ${decodedToken.family_name}`;

        if(tempAttendeeList?.includes(this.username)){
          this.inEvent = true;
          console.log(this.inEvent);
        } else {
          this.inEvent = false;
          console.log(this.inEvent);
        }
      }
    });

    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges();
      console.log('isLoggedIn', isLoggedIn)
    });

    
    

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

  signUp(eventId: number | undefined){
    if (this.currentEvent.attendeeList == null || this.currentEvent.attendeeList == "" || this.currentEvent.attendeeList == "string"){
      this.currentEvent.attendeeList = this.username;
      this.eventService.editEvent(eventId, this.currentEvent).subscribe(edittedEvent => {
        console.log(edittedEvent);
        this.router.navigate(["home"]);
      })
    } else {
      this.currentEvent.attendeeList = `${this.currentEvent.attendeeList}, ${this.username}`;
      this.eventService.editEvent(eventId, this.currentEvent).subscribe(edittedEvent => {
        console.log(edittedEvent);
        this.router.navigate(["home"]);
      });
    }
  }

  cancel(eventId: number | undefined){
    var tempList = this.currentEvent.attendeeList?.split(", ");
    console.log("tempList", tempList);
    
    if(tempList){
      for (let i = 0; i < tempList.length; i++) {
        const guest = tempList[i];
        if(guest == this.username){
          tempList.splice(i, 1);
          this.currentEvent.attendeeList = tempList.join(", ");

          this.eventService.editEvent(eventId, this.currentEvent);
          this.router.navigate([`home`]);
        }
      }
    }
  }
}
