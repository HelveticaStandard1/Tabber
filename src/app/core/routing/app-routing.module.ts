import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../public/auth/login/login.component';
import {RegisterComponent} from '../../public/auth/register/register.component';
import {HomeComponent} from '../../public/home/home.component';
import {ConfirmRegistrationComponent} from '../../public/auth/confirm-registration/confirm-registration.component';
import {SecureHomeComponent} from '../../public/secure/secure-home/secure-home.component';
import {TabActionsComponent} from '../../public/secure/tab-actions/tab-actions.component';

const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'confirm-registration/:username', component: ConfirmRegistrationComponent}
    ]
  }
];

const secureHomeRoutes: Routes = [
  {
    path: '',
    redirectTo: '/securehome',
    pathMatch: 'full'
  },
  {
    path: 'securehome', component: SecureHomeComponent,
    children: [
      {path: 'tab-actions', component: TabActionsComponent}
    ]
  }
];

const routes: Routes = [
  {
    path: '',
    children: [
      ...homeRoutes,
      ...secureHomeRoutes,
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
