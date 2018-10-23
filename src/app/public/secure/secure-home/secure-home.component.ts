import {Component, Input, OnInit} from '@angular/core';
import {LoggedInCallback} from '../../../services/cognito/cognito.service';
import {Router} from '@angular/router';
import {UserLoginService} from '../../../services/userLogin/user-login.service';

@Component({
  selector: 'app-secure-home',
  templateUrl: './secure-home.component.html',
  styleUrls: ['./secure-home.component.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {
  openDrawer = false;

  constructor(public router: Router, public userService: UserLoginService) {
    this.userService.isAuthenticated(this);
    console.log('SecureHomeComponent: constructor');
  }

  ngOnInit() {
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.router.navigate(['/home/login']);
    }
  }

  closeDrawer(): void {
    this.openDrawer = false;
  }

}
