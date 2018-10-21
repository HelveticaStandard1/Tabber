import {Component, OnInit} from '@angular/core';
import {LoggedInCallback} from '../../services/cognito/cognito.service';
import {UserLoginService} from '../../services/userLogin/user-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, LoggedInCallback {

  loggedIn: boolean;

  constructor(public router: Router, public userService: UserLoginService) {
    this.userService.isAuthenticated(this);
  }

  ngOnInit() {
  }

  onLogOut(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  isLoggedIn(message: string, isLoggedIn: boolean): void {
    this.loggedIn = isLoggedIn;
  }

}
