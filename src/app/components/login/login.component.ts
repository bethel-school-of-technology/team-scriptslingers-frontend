import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailValid = new FormControl('', [Validators.required, Validators.email]);
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

      this.router.navigateByUrl('/home').then(() => {
        location.reload();
      });

    }, error => {
      console.log('Error: ', error);
      window.alert('Sorry, your email or password was incorrect. Please try again.');
      this.router.navigateByUrl('/signin');
    });
  }

  getErrorMessage() {
    if (this.emailValid.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailValid.hasError('email') ? 'Not a valid email' : '';
  }

}
