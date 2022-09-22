import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import {HeaderType } from '../../../../core/enum/header-type-enum'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading = false;
  private subscription: Subscription[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['dash/home']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  public onLogin(user: User) {
    this.showLoading = true;
   
    this.subscription.push(
      this.authenticationService.Login(user).subscribe(
        (response: HttpResponse<User> | any) => {
          
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalStorage(response.body);
          
          this.router.navigateByUrl('dash/home');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          
          this.sendErrorNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.showLoading = false;
        }
      )
    );
  }
  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message.toLowerCase());
    } else {
      this.notificationService.notify(
        notificationType,
        'An Error Occured , Please try Again'
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub =>sub.unsubscribe());
  }

}
