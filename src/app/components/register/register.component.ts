import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();
  hide = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.newUser.isAdmin = undefined;

    this.userService.signUp(this.newUser).subscribe(() => {
      if(this.newUser.email && this.newUser.password){
        this.userService.login(this.newUser.email, this.newUser.password).subscribe(() => {
          this.router.navigateByUrl('/home').then(() => {
            location.reload();
          });
        })
      }
      
        
    }, error => {
        window.alert("User Registration Error");
        console.log('Error: ', error)
    });
  }

}
