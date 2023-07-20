import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';
import jwt_decode from 'jwt-decode';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-scriptslingers-frontend';
  // isLoggedIn: boolean | undefined;
  // isAdmin: boolean | undefined;
  isAdmin$!: Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;


  username?: string;
  userList: User[] = [];
  currentUserEmail: string | null = null;
  firstName: string | undefined;
  lastName: string | undefined;
  isSmallScreen: boolean | undefined;
  isMobile = false;

  constructor(public router: Router, public userService: UserService, private cdRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  
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
      this.isLoggedIn$ = of(isLoggedIn);
    });

    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin$ = of(isAdmin);
    });

    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.isAdmin$ = this.userService.isAdmin$;

    this.checkScreenSize();
  }

  logout() {
    this.userService.logout()
    this.router.navigateByUrl('/home')
  }

  @HostListener('window:resize', [])
    onResize(){
      this.checkScreenSize();
    }

    checkScreenSize(){
      this.isMobile = window.innerWidth < 815;
    };

}



