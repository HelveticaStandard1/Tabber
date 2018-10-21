import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegistrationService} from '../../../services/userRegistration/user-registration.service';
// import {UserLoginService} from '../../../service/user-login.service';
import {CognitoCallback} from '../../../services/cognito/cognito.service';
import {UserLoginService} from '../../../services/userLogin/user-login.service';

export class NewPasswordUser {
  username: string;
  existingPassword: string;
  password: string;
}

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html'
})
export class NewpasswordComponent implements CognitoCallback {
  registrationUser: NewPasswordUser;
  router: Router;
  errorMessage: string;

  constructor(public userRegistration: UserRegistrationService, public userService: UserLoginService, router: Router) {
    this.router = router;
    this.onInit();
  }

  onInit() {
    this.registrationUser = new NewPasswordUser();
    this.errorMessage = null;
  }

  ngOnInit() {
    this.errorMessage = null;
    console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
    this.userService.isAuthenticated(this);
  }

  onRegister() {
    console.log(this.registrationUser);
    this.errorMessage = null;
    this.userRegistration.newPassword(this.registrationUser, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) {
      this.errorMessage = message;
      console.log('result: ' + this.errorMessage);
    } else {
      console.log('redirecting');
      this.router.navigate(['/securehome']);
    }
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigate(['/securehome']);
    }
  }
}
