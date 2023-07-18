import { ChangeDetectorRef, Component } from '@angular/core';
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
  isLoggedIn: boolean | undefined;
  isAdmin: boolean | undefined;
  username?: string;
  userList: User[] = [];
  currentUserEmail: string | null = null;
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(public router: Router, public userService: UserService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isAuthenticated();
    this.isAdmin = this.userService.getIsAdmin();

    this.userService.authStateChanged().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges();
    });

    this.userService.adminStateChanged().subscribe((isAdmin:boolean)=>{
      this.isAdmin = isAdmin;
      this.cdRef.detectChanges()
    })
  
    this.userService.currentUserEmail$.subscribe(email => {
      this.currentUserEmail = email;
    });

    const token = localStorage.getItem('MoWildToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.firstName = decodedToken.given_name;
      this.lastName = decodedToken.family_name;
    }

    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

  }

  logout() {
    this.userService.logout()
    location.reload();
  }

}
