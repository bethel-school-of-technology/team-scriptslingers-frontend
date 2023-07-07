import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-scriptslingers-frontend';
  isLoggedIn: boolean = false;
  username?: string;
  userList: User[] = [];
  currentUserEmail: string | null = null;

  constructor(public router: Router, public userService: UserService) {}

  ngOnInit(): void {
     this.userService.currentUserEmail$.subscribe(email => {
      this.currentUserEmail = email;
    });
  }

  logout() {
    this.userService.logout()
    location.reload();
  }
  
}
