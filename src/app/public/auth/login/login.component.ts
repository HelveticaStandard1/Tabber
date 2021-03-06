import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLoginService} from '../../../services/userLogin/user-login.service';
import {CognitoCallback, LoggedInCallback} from '../../../services/cognito/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements CognitoCallback, OnInit, LoggedInCallback {

  router: Router;
  username: string;
  password: string;
  loading: boolean;
  errorMessage: string;
  mfaStep = false;
  mfaData = {
    destination: '',
    callback: null
  };

  constructor(router: Router,
              public userService: UserLoginService) {
    this.router = router;
  }

  ngOnInit() {
    this.loading = true;
    this.errorMessage = null;
    console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
    this.userService.isAuthenticated(this);
  }

  goToRegister() {
    this.router.navigate(['/home/register']);
  }

  onLogin() {
    if (this.username == null || this.password == null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.errorMessage = null;
    this.userService.authenticate(this.username, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) {
      this.errorMessage = message;
      console.log('result: ' + this.errorMessage);
      if (this.errorMessage === 'User does not exist.') {
        window.alert('Could not log in with that user.  If you are not registered, please click Register');
      } else if (this.errorMessage === 'User is not confirmed.') {
        console.log('redirecting');
        this.router.navigate(['/home/confirmRegistration', this.username]);
      } else if (this.errorMessage === 'User needs to set password.') {
        console.log('redirecting to set new password');
        this.router.navigate(['/home/newPassword']);
      }
    } else {
      this.router.navigate(['/securehome/tab-actions']);
    }
    this.loading = false;
  }

  isLoggedIn(message: string, isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.router.navigate(['/securehome/tab-actions']);
    }
    this.loading = false;
  }

}
