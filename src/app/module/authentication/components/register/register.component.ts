import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public showLoading = false;
  private subscription: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/user/management']);
    }
  }
  onRegister(register:User){
  
    this.showLoading = true;
   
    this.subscription.push(
      this.authenticationService.Register(register).subscribe(
        (response: User | any) => {
         
          this.sendNotification(
            NotificationType.SUCCESS,
            `Anew account was created for ${response.firstName} , 
            please check your email for password to log in `
          );
                   this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.showLoading = false;
        }
      )
    );
  }
  private sendNotification(notificationType: NotificationType, message: string) {
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
