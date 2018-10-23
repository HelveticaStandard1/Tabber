import {Component, OnInit} from '@angular/core';
import {CognitoCallback} from '../../../services/cognito/cognito.service';
import {Router} from '@angular/router';
import {UserRegistrationService} from '../../../services/userRegistration/user-registration.service';

export class RegistrationUser {
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements CognitoCallback {
  registrationUser: RegistrationUser;
  router: Router;
  errorMessage: string;
  loading: boolean;

  constructor(public userRegistration: UserRegistrationService, router: Router) {
    this.router = router;
    this.onInit();
  }

  onInit() {
    this.registrationUser = new RegistrationUser();
    this.errorMessage = null;
  }

  onRegister() {
    this.loading = true;
    this.errorMessage = null;
    this.userRegistration.register(this.registrationUser, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) {
      this.errorMessage = message;
      console.log('result: ' + this.errorMessage);
    } else {
      console.log('redirecting');
      this.router.navigate(['/home/confirm-registration', result.user.username]);
    }
    this.loading = false;
  }

  goToLogin() {
    this.router.navigate(['/home/login']);
  }
}

