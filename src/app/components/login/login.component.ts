import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signin(){
    this.userService.login(this.email, this.password).subscribe((response:any) => {
        this.router.navigateByUrl('/home');
    }, error => {
        console.log('Error: ', error);
        window.alert('Unsuccessful Login');
        this.router.navigateByUrl('/signin');
    });
   }

}
