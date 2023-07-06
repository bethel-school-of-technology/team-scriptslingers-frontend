import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-scriptslingers-frontend';

  isLoggedIn = false;
  username?: string;
  id = 0;

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      // this.username = this.userService.getUserById().name[0];
      // this.id = this.userService.getUserById().sub;
    }
  }

  logout() {
    console.log("You are now logged out :)")
    this.isLoggedIn = false;
  }
  
}
