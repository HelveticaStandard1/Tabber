import {NgtUniversalModule} from '@ng-toolkit/universal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './core/routing/app-routing.module';
import {LoginComponent} from './public/auth/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './core/material/material.module';
import {FormsModule} from '@angular/forms';
import {CognitoUtil} from './services/cognito/cognito.service';
import {RegisterComponent} from './public/auth/register/register.component';
import {NewpasswordComponent} from './public/auth/newpassword/newpassword.component';
import {UserRegistrationService} from './services/userRegistration/user-registration.service';
import {UserLoginService} from './services/userLogin/user-login.service';
import {HomeComponent} from './public/home/home.component';
import {ConfirmRegistrationComponent} from './public/auth/confirm-registration/confirm-registration.component';
import {SecureHomeComponent} from './public/secure/secure-home/secure-home.component';
import {TabActionsComponent} from './public/secure/tab-actions/tab-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NewpasswordComponent,
    HomeComponent,
    ConfirmRegistrationComponent,
    SecureHomeComponent,
    TabActionsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgtUniversalModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [CognitoUtil, UserRegistrationService, UserLoginService],
})
export class AppModule {
}
