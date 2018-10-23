import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Callback, CognitoUtil} from '../../../services/cognito/cognito.service';
import {UserLoginService} from '../../../services/userLogin/user-login.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [
    trigger('openDrawer', [
      transition(':enter', [
        style({
          left: '-100%',
          opacity: 0,
        }),
        animate('.3s')
      ]),
      transition(':leave', [
        style({
          right: '-100px',
          opacity: 0
        }),
        animate('0.3s')
      ])
    ])
  ]
})
export class SideNavComponent implements OnInit, Callback {
  @Output()
  closeDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  openDrawer: boolean;

  currentUser: string;

  constructor(public cognitoUtil: CognitoUtil,
              private eRef: ElementRef,
              private userLoginService: UserLoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.cognitoUtil.getCurrentUser().getUsername();
  }

  @HostListener('document:click', ['$event'])
  public clickOut(event) {
    if (event.target.id === 'side-nav-launch-btn') {
      return;
    }
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDrawer.emit();
    }
  }

  public onLogout() {
    this.userLoginService.logout(this);
  }

  callback(): void {
    this.router.navigate(['/home/login']);
  }

  callbackWithParam(result: any): void {
  }


}
