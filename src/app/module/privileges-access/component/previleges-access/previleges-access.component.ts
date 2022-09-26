import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CompanyMaster } from 'src/app/model/CompanyMaster';
import { ModuleGroupMaster } from 'src/app/model/ModuleGroupMaster';
import { ModuleMaster } from 'src/app/model/ModuleMaster';
import { PrivilegedAccess } from 'src/app/model/PrivilegedAccess';
import { User } from 'src/app/model/User';
import { UserRole } from 'src/app/model/UserRole';
import { CompanyService } from 'src/app/service/company/company.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-previleges-access',
  templateUrl: './previleges-access.component.html',
  styleUrls: ['./previleges-access.component.scss']
})
export class PrevilegesAccessComponent implements OnInit {

  constructor(
    private authenticationService:AuthenticationService,
    private userservice:UserService,
    private notificationService:NotificationService,
    private companyMasterService:CompanyService
  ) { }
  panelOpenState = false;
  title:string = 'Privileges Access'
  roleDescription:string = '';
  active:string = '';
  deleted:string = '';
  roleLimit:number= 0;
  showLoading:boolean=false;
  privilegesAccess:PrivilegedAccess[]=[];
  userService!:User;
  companyMaster!:CompanyMaster;
  userRole:UserRole = new UserRole();
  moduleMaster:ModuleMaster[] = [];
  moduleGroupMaster:ModuleGroupMaster = new ModuleGroupMaster();
  moduleGroupMasterArray:ModuleGroupMaster [] =[];
  subscription:Subscription[]=[];
  ngOnInit(): void {
    this.getModulesFromLocalStorage();
    //this.loadUser();
  }
/**Add New Role  */
onAddRole(userRoleForm:NgForm,title:string){
debugger;
this.privilegesAccess
this.companyMaster  = this.userService.userRole.companyMaster;
this.companyMaster.moduleMaster.map(x=>{
  x.moduleGroupMaster.map(data=>{
   
   const privileges = this.privilegesAccess.find(d=>d.findModuleGroupId == data.moduleGroupId)
   if(privileges){

     data.privilegedAccess.push(privileges!) 
   }
  })
})
console.log(this.companyMaster)
this.moduleMaster.map(data=>{
  this.subscription.push(
    this.companyMasterService.roleVsModule(this.roleDescription,data).subscribe(
      (response: CompanyMaster | any) => {
       debugger
        this.showLoading = false;
        this.sendNotification(
          NotificationType.SUCCESS,
          `${response.firstName} ${response.lastName} updated Sucessfully`
        );
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
})
}
/**Load User from Db */
loadUser(){
  debugger
  this.subscription.push(
    this.userservice.findUseById(this.userService.userId).subscribe(
      (response: User | any) => {
       debugger
        this.showLoading = false;
   this.userService = response;
        this.sendNotification(
          NotificationType.SUCCESS,
          `${response.firstName} ${response.lastName} updated Sucessfully`
        );
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
//**Get User Modules */
getModulesFromLocalStorage(){
  this.userService = this.authenticationService.getUserFromLocalStorageCache()
this.userRole = this.userService.userRole ;
this.companyMaster = this.userService.userRole.companyMaster;
this.moduleMaster  = this.userService.userRole.companyMaster.moduleMaster;
this.moduleMaster.map(x=>{
  x.moduleGroupMaster.map(data=>{
    const newPrivilegesAccess = new PrivilegedAccess();
    newPrivilegesAccess.description = data.moduleGroupDescription + " " + data.moduleGroupType
    newPrivilegesAccess.findModuleId = x.moduleId
    newPrivilegesAccess.findModuleGroupId = data.moduleGroupId
    this.privilegesAccess.push(newPrivilegesAccess);
  })
})
}

  /** send notification  */
  private sendNotification(
    notificationType: NotificationType,
    message: string
  ) {
    if (message) {
      this.notificationService.notify(notificationType, message.toLowerCase());
    } else {
      this.notificationService.notify(
        notificationType,
        'An Error Occured , Please try Again'
      );
    }
  }
  /**select sub module */
  selectSubModule(subModule:PrivilegedAccess,event:any,value:any){
    debugger
    if(value == 'adds'){
      subModule.adds = event.target.checked;
    }
  else if(value == 'deletes'){
    subModule.deletes = event.target.checked;
  }
  else if(value == 'views'){
    subModule.views = event.target.checked;
  }
  else if(value == 'edits'){
    subModule.edits = event.target.checked;
  }
  else if(value == 'prints'){
    subModule.prints = event.target.checked;
  }
  }
}