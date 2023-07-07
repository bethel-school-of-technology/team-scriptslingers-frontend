import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = window.pageYOffset;
    const foreground = document.querySelector('.foreground-image') as HTMLElement;
    foreground.style.top = `${scrollTop / 2}px`;
  }

  eventList: Event[] = [];
  isLoggedIn: boolean | undefined;

  constructor(private eventService: EventService, public userService: UserService, private router: Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((foundEvents: Event[]) => {
      console.log(foundEvents);
      this.eventList = foundEvents;
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
}

