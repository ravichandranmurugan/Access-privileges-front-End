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
  myRole:string='';
  ngOnInit(): void {
    this.userService = this.authService.getUserFromLocalStorageCache();
    this.moduleAccess = this.userService.userRole.companyMaster.moduleMaster;
    this.myRole = this.userService.userRole.roleDescription
    const companyModule = this.moduleAccess.find(
      (x) => x.moduleDescription == 'Organization Module'
    );
    const companyModuleGroup = companyModule?.moduleGroupMaster.find(
      (x) => x.moduleGroupDescription == 'Home Page'
    );
    const companyPrivilegesAccess = companyModuleGroup?.privilegedAccess.find(
      (x) => x.userRoleMasterId == this.userService.userRole.roleId
    );
  }
  onclick(value: any) {
    if (value != 'user') {
      this.router.navigate([`layout/${value}/home`]);
    } else {
      this.router.navigate([`layout/${value}/management`]);
    }
  }
}
