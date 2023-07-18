import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  hide = true;
  firstName: string = '';
  lastName: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signin() {

    this.userService.login(this.email, this.password).subscribe((response: any) => {
      this.userService.setCurrentUserEmail(this.email);
      // this.userService.setCurrentUser(this.firstName, this.lastName);

      this.router.navigateByUrl('/home').then(() => {
        location.reload();
      });

    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Login');
      this.router.navigateByUrl('/signin');
    });
  }

}
