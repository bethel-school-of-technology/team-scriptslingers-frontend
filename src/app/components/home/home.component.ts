import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventList: Event[] = [];
  isLoggedIn: boolean | undefined;
  isAdmin: boolean | undefined;
  isSmallScreen: boolean | undefined;



  constructor(private eventService: EventService, public userService: UserService, private router: Router, private cdRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) { }



  ngOnInit(): void {
    this.eventService.getAllFutureEvent().subscribe((foundEvents: Event[]) => {
      console.log(foundEvents);
      this.eventList = foundEvents;
    });

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        this.isSmallScreen = state.matches && !state.breakpoints[Breakpoints.Small];
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

  getGridColumns(): number {
    return this.isSmallScreen ? 1 : 2;
  }



}

