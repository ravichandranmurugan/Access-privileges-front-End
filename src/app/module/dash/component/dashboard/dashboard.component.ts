import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { ModuleMaster } from 'src/app/model/ModuleMaster';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  userService: User = new User();
  moduleAccess: ModuleMaster[] = [];
  ngOnInit(): void {
    this.userService = this.authService.getUserFromLocalStorageCache();
    this.moduleAccess = this.userService.userRole.companyMaster.moduleMaster;
  }
  onclick(value: any) {
    if (value != 'user') {
      this.router.navigate([`layout/${value}/home`]);
    } else {
      this.router.navigate([`layout/${value}/management`]);
    }
  }
}
