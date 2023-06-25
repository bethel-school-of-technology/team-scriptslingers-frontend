import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-scriptslingers-frontend';

  isLoggedIn = true;
  username?: string;
  constructor(public router: Router) {}

  logout() {
    console.log("You are now logged out :)")
    this.isLoggedIn = false;
  }
  
}
