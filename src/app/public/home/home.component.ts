import {Component, OnInit} from '@angular/core';
import {UserLoginService} from '../../services/userLogin/user-login.service';
import {Router} from '@angular/router';
import {LoggedInCallback} from '../../services/cognito/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, LoggedInCallback {

  constructor(public userService: UserLoginService, public router: Router) {
  }

  ngOnInit() {
    console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
    this.userService.isAuthenticated(this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.router.navigate(['/securehome/tab-actions']);
    }
  }

}
