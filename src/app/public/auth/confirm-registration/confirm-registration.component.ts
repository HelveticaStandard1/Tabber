import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRegistrationService} from '../../../services/userRegistration/user-registration.service';
import {UserLoginService} from '../../../services/userLogin/user-login.service';
import {LoggedInCallback} from '../../../services/cognito/cognito.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html'
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  confirmationCode: string;
  userName: string;
  errorMessage: string;
  loading: boolean;
  private sub: any;

  constructor(public regService: UserRegistrationService, public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['username'];
    });

    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirmRegistration() {
    this.loading = true;
    this.errorMessage = null;
    this.regService.confirmRegistration(this.userName, this.confirmationCode, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) {
      this.errorMessage = message;
      console.log('message: ' + this.errorMessage);
    } else {
      console.log('Moving to securehome');
      this.router.navigate(['/home/login']);
    }
    this.loading = false;
  }

  goToLogin() {
    this.router.navigate(['/home/login']);
  }

  goToRegister() {
    this.router.navigate(['/home/register']);
  }
}





