import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import {HeaderType } from '../../../../core/enum/header-type-enum'
import { UserService } from 'src/app/service/user/user.service';
import { CompanyService } from 'src/app/service/company/company.service';
import { CompanyMaster } from 'src/app/model/CompanyMaster';
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
    private notificationService: NotificationService,
    private companyService:CompanyService,

  ) {}
  companyMaster:CompanyMaster[] =[];
  ngOnInit(): void {
    this.subscription.push(
      this.companyService.getCompanys().subscribe(
        (response: HttpResponse<CompanyMaster> | any) => {
          
        this.companyMaster = response;
         
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
          this.showLoading = false;
          this.sendErrorNotification(
            NotificationType.SUCCESS,
          ` Welcome to ${response.body.userRole.companyMaster.companyName}`
          );
          this.router.navigateByUrl('layout/dash/home');
         
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
      this.notificationService.notify(notificationType, message);
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
