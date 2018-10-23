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
  router: Router;

  constructor(public userService: UserLoginService, router: Router) {
    this.router = router;
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
