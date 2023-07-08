import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';
import jwt_decode from 'jwt-decode';

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
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUserEmail$.subscribe(email => {
      this.currentUserEmail = email;
    });

    const token = localStorage.getItem('myEventToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.firstName = decodedToken.given_name;
      this.lastName = decodedToken.family_name;
    }
  }

  logout() {
    this.userService.logout()
    location.reload();
  }

}
