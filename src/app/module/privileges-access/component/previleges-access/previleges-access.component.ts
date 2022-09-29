import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit , OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
import { UserRoleService } from 'src/app/service/userRole/user-role.service';

@Component({
  selector: 'app-previleges-access',
  templateUrl: './previleges-access.component.html',
  styleUrls: ['./previleges-access.component.scss'],
})
export class PrevilegesAccessComponent implements OnInit , OnDestroy {
  constructor(
    private authenticationService: AuthenticationService,
    private userservice: UserService,
    private notificationService: NotificationService,
    private companyMasterService: CompanyService,
    private userRoleService: UserRoleService
  ) {}
  ngOnDestroy(): void {
    this.subscription.map(x=>x.unsubscribe());
  }
checkAl:boolean= false;
  panelOpenState = false;
  title: string = 'Privileges Access';
  roleDescription: string = '';
  oleRoleDescription: string = '';
  active: boolean = false;
  deleted: string = '';
  roleLimit: number = 0;
  showLoading: boolean = false;
  privilegesAccess: PrivilegedAccess[] = [];
  userService!: User;
  companyMaster!: CompanyMaster;
  userRole: UserRole = new UserRole();
  userRoleArray: UserRole[] = [];
  moduleMaster: ModuleMaster[] = [];
  moduleGroupMaster: ModuleGroupMaster = new ModuleGroupMaster();
  moduleGroupMasterArray: ModuleGroupMaster[] = [];
  subscription: Subscription[] = [];
  loggedInUser!:User;
  moduleAccess:ModuleMaster[] = [];
  myRole!:string;
  add!: boolean;
  edit!: boolean;
  delete!: boolean;
  print!: boolean;
  view!: boolean;
    ngOnInit(): void {

    this.loggedInUser = this.authenticationService.getUserFromLocalStorageCache();
    this.moduleAccess = this.loggedInUser.userRole.companyMaster.moduleMaster;
    this.myRole = this.loggedInUser.userRole.roleDescription;
    const companyModule = this.moduleAccess.find(
      (x) => x.moduleDescription == 'Privileges Access'
    );
    const companyModuleGroup = companyModule?.moduleGroupMaster.find(
      (x) => x.moduleGroupDescription == 'Home Page'
    );
    const companyPrivilegesAccess = companyModuleGroup?.privilegedAccess.find(
      (x) => x.userRoleMasterId == this.loggedInUser.userRole.roleId
    );

    this.add = companyPrivilegesAccess?.adds!;
    this.delete = companyPrivilegesAccess?.deletes!;
    this.view = companyPrivilegesAccess?.views!;
    this.edit = companyPrivilegesAccess?.edits!;
    this.print = companyPrivilegesAccess?.prints!;
    this.getModulesFromLocalStorage();
    if(this.myRole == 'ROLE_ROOT_ADMIN'){
      this.loadUserRole("");
     
    }else{
      this.loadUserRole('');
     
    }
    //this.loadUser();
  }

  public get canView(): boolean {
    if(this.view == true || this.myRole == 'ROLE_ROOT_ADMIN'){
     return true
    }else{
     return false
    }
   }
 //can edit
 
 public get canEdit(): boolean {
   
   if(this.edit == true || this.myRole == 'ROLE_ROOT_ADMIN'){
     return true
    }else{
     return false
    }
 }

  //can edit
 
  public get canDelete(): boolean {
   
    if(this.delete == true || this.myRole == 'ROLE_ROOT_ADMIN'){
      return true
     }else{
      return false
     }
  }
   //can edit
 
 public get canAdd(): boolean {
   
  if(this.add == true || this.myRole == 'ROLE_ROOT_ADMIN'){
    return true
   }else{
    return false
   }
}

  /**Get User Role */
  loadUserRole(value:string) {
  if(value == 'ROLE_ROOT_ADMIN'){
    this.subscription.push(
      this.userRoleService.getUsersRole().subscribe(
        (response: UserRole[] | any) => {
          debugger;
          this.showLoading = false;
          this.userRoleArray = response;
          // this.sendNotification(
          //   NotificationType.SUCCESS,
          //   ` User Role Loaded Sucessfully`
          // );
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
  }else{
    this.subscription.push(
      this.userRoleService.getUsersRoleByCompany(this.loggedInUser.userRole.companyMaster.companyId).subscribe(
        (response: UserRole[] | any) => {
          debugger;
          this.showLoading = false;
          this.userRoleArray = response;
          // this.sendNotification(
          //   NotificationType.SUCCESS,
          //   ` User Role Loaded Sucessfully`
          // );
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
  }

//check all
checkAll(moduleId:string,event:any){

  if(event.target.checked){
    this.privilegesAccess.map(x=>{
      if(moduleId == x.moduleMasterId){
        x.adds=true;
        x.deletes =true;
        x.edits =true;
        x.views = true;
        x.prints =true;
      }
    })
  }else{
    this.privilegesAccess.map(x=>{
      if(moduleId == x.moduleMasterId){
        x.adds=false;
        x.deletes =false;
        x.edits =false;
        x.views = false;
        x.prints =false;
      }
    })
  }

}

  /**Add New Role  */
  onAddRole(userRoleForm: NgForm, title: string) {
    debugger;
    this.privilegesAccess;
   
    this.companyMaster = this.userService.userRole.companyMaster;
    this.companyMaster.moduleMaster.map((x) => {
      x.moduleGroupMaster.map((data) => {
        data.privilegedAccess = [];
        const privileges = this.privilegesAccess.filter(
          (d) => d.moduleMasterGroupId == data.moduleGroupId && d.privilegedAccessId =="" && d.userRoleMasterId == ""
        );
        if (privileges) {
         
          data.privilegedAccess = privileges;
        }
      });
    });
    this.userRole.roleDescription = this.roleDescription
    this.userRole.companyMaster = this.companyMaster
    this.userRole.companyMaster.moduleMaster = [];
     this.userRole.companyMaster.moduleMaster = this.moduleMaster

     if(title == "Privileges Access"){

       this.subscription.push(
        this.userRoleService.addNewRoleWithPrivilegesAccess(this.userRole).subscribe(
          (response: UserRole | any) => {
            debugger;
            this.showLoading = false;
          
            this.sendNotification(
              NotificationType.SUCCESS,
              ` User Role Added Sucessfully`
            );
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(
              NotificationType.ERROR,
              errorResponse.error
            );
            this.showLoading = false;
          }
        )
      );
     }else{
      this.subscription.push(
        this.userRoleService.updateRoleWithPrivilegesAccess(this.privilegesAccess,this.roleDescription,this.active,this.oleRoleDescription).subscribe(
          (response: UserRole | any) => {
            debugger;
            this.showLoading = false;
          this.onEditRole(response);
            this.sendNotification(
              NotificationType.SUCCESS,
              ` User Role updated Sucessfully`
            );
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(
              NotificationType.ERROR,
              errorResponse.error
            );
            this.showLoading = false;
          }
        )
      );
     }
  }
  /**Load User from Db */
  loadUser() {
    debugger;
    this.subscription.push(
      this.userservice.findUseById(this.userService.userId).subscribe(
        (response: User | any) => {
          debugger;
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
  getModulesFromLocalStorage() {
    
    this.userService =
      this.authenticationService.getUserFromLocalStorageCache();
   // this.userRole = this.userService.userRole;
  if(this.userService.userRole.roleDescription == "ROLE_ROOT_ADMIN"){
    this.companyMaster = this.userService.companyMaster;
    this.moduleMaster = this.userService.userRole.companyMaster.moduleMaster;
    this.moduleMaster.map((x) => {
      x.moduleGroupMaster.map((data) => {
        const newPrivilegesAccess = new PrivilegedAccess();
        newPrivilegesAccess.description =
          data.moduleGroupDescription + ' ' + data.moduleGroupType;
        newPrivilegesAccess.moduleMasterId = x.moduleId;
        newPrivilegesAccess.moduleMasterGroupId = data.moduleGroupId;
        this.privilegesAccess.push(newPrivilegesAccess);
      });
    });
  }else{
    this.companyMaster = this.userService.userRole.companyMaster;
    this.moduleMaster = this.userService.userRole.companyMaster.moduleMaster;
    this.moduleMaster.map((x) => {
      x.moduleGroupMaster.map((data) => {
        const newPrivilegesAccess = new PrivilegedAccess();
        newPrivilegesAccess.description =
          data.moduleGroupDescription + ' ' + data.moduleGroupType;
        newPrivilegesAccess.moduleMasterId = x.moduleId;
        newPrivilegesAccess.moduleMasterGroupId = data.moduleGroupId;
        this.privilegesAccess.push(newPrivilegesAccess);
      });
    });
  }
  }
//cancel form 
cancelForm(form:NgForm){
  form.reset()
 this.privilegesAccess.map(x=>{
  x.adds = false;
  x.views= false;
  x.deletes = false;
  x.prints = false;
  x.edits = false;
 })
 this.title = 'Privileges Access'
}
  /** send notification  */
  private sendNotification(
    notificationType: NotificationType,
    message: string
  ) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'An Error Occured , Please try Again'
      );
    }
  }
  /**select sub module */
  selectSubModule(subModule: PrivilegedAccess, event: any, value: any) {
    debugger;
    if (value == 'adds') {
      subModule.adds = event.target.checked;
    } else if (value == 'deletes') {
      subModule.deletes = event.target.checked;
    } else if (value == 'views') {
      subModule.views = event.target.checked;
    } else if (value == 'edits') {
      subModule.edits = event.target.checked;
    } else if (value == 'prints') {
      subModule.prints = event.target.checked;
    }
  }

  /** on edit user Role */
  onEditRole(userRole:UserRole){
   
    debugger
    this.checkAl = false
    this.oleRoleDescription = userRole.roleDescription;
    this.delete = userRole.deleted
    this.title = `Update `
    this.roleDescription = userRole.roleDescription;
    this.privilegesAccess = []; 
    userRole.companyMaster.moduleMaster.map((x) => {
      x.moduleGroupMaster.map((data) => {
       data.privilegedAccess.map(dataa=>{
       if(dataa.userRoleMasterId == userRole.roleId){
        dataa.description =
        data.moduleGroupDescription + ' ' + data.moduleGroupType;
      // newPrivilegesAccess.moduleMasterId = x.moduleId;
      // newPrivilegesAccess.moduleMasterGroupId = data.moduleGroupId;
      this.privilegesAccess.push(dataa);
       }
       })
     
      });
    });
  }
}
