import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type-enum';
import { AuthenticationService } from '../service/authentication.service';
import {NotificationService} from '../service/notification.service'
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService:NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    // if (this.authenticationService.isLoggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth/login']);
    //   //TODO - Send Notification
    //   this.notificationService.notify(NotificationType.ERROR,'you need to log in to access this page'.toLowerCase());
    //   return false;
    // }
    return true;
  }
}
