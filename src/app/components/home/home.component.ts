import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { HostListener } from '@angular/core';

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

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((foundEvents: Event[]) => {
      console.log(foundEvents);
      this.eventList = foundEvents;
    });
  }

}
