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
  enableCompanyRouter:boolean=false;
  enableModuleRouter:boolean = false;
  ngOnInit(): void {
    this.userService = this.authService.getUserFromLocalStorageCache();
    //this.moduleAccess = this.userService.userRole.companyMaster.moduleMaster;
    this.userService.userRole.companyMaster.moduleMaster.map(data=>{
      const moduleGroup = data.moduleGroupMaster.find(x=>x.moduleGroupDescription == 'Home Page')
      const companyPrivilegesAccess = moduleGroup?.privilegedAccess.find(
       (x) => x.userRoleMasterId == this.userService.userRole.roleId
     );
     if(companyPrivilegesAccess?.views){
       this.moduleAccess.push(data);
     }
     })
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
    console.log(this.moduleAccess)
    let companyModule1 = this.moduleAccess.find(
      (x) => x.moduleDescription == "Organization"
    );
    if(!companyModule1 && this.myRole == 'ROLE_ROOT_ADMIN'){
      this.enableCompanyRouter = true
    }else{
      this.enableCompanyRouter = false;
    }
    if(!companyModule && this.myRole == 'ROLE_ROOT_ADMIN'){
      this.enableModuleRouter = true
    }else{
      this.enableModuleRouter = false;
    }
    
  }
  onclick(value: any) {
    if (value != 'user') {
      this.router.navigate([`layout/${value}/home`]);
    } else {
      this.router.navigate([`layout/${value}/management`]);
    }
  }
}
