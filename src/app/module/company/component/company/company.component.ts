import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CompanyMaster } from 'src/app/model/CompanyMaster';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { ModuleMaster } from 'src/app/model/ModuleMaster';
import { User } from 'src/app/model/User';
import { CompanyService } from 'src/app/service/company/company.service';
import { ModuleMasterService } from 'src/app/service/Module/module-master.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  title: string = 'Add Organization';
  fileName!: string;
  imagePath: any = [];
  profileImage!: File;
  showLoading: boolean = false;
  subscription: Subscription[] = [];
  moduleMap = new Map();
  companyMaster: CompanyMaster = new CompanyMaster();
  modules: ModuleMaster[] = [];
  modulesCopy: ModuleMaster[] = [];
  companys: CompanyMaster[] = [];
  currentCompanyEmail: string = '';
  add!: boolean;
  edit!: boolean;
  delete!: boolean;
  print!: boolean;
  view!: boolean;
  constructor(
    private moduleService: ModuleMasterService,
    private notificationService: NotificationService,
    private companyService: CompanyService,
    private authService: AuthenticationService
  ) {}
  userService: User = new User();
  moduleAccess: ModuleMaster[] = [];
  myRole: string = '';
  ngOnInit(): void {
    debugger;
    this.userService = this.authService.getUserFromLocalStorageCache();
    this.moduleAccess = this.userService.userRole.companyMaster.moduleMaster;
    this.myRole = this.userService.userRole.roleDescription;
    const companyModule = this.moduleAccess.find(
      (x) => x.moduleDescription == 'Company Master'
    );
    const companyModuleGroup = companyModule?.moduleGroupMaster.find(
      (x) => x.moduleGroupDescription == 'Home Page'
    );
    const companyPrivilegesAccess = companyModuleGroup?.privilegedAccess.find(
      (x) => x.userRoleMasterId == this.userService.userRole.roleId
    );

    this.add = companyPrivilegesAccess?.adds!;
    this.delete = companyPrivilegesAccess?.deletes!;
    this.view = companyPrivilegesAccess?.views!;
    this.edit = companyPrivilegesAccess?.edits!;
    this.print = companyPrivilegesAccess?.prints!;

    debugger;
    if (this.myRole == 'ROLE_ROOT_ADMIN') {
      this.getAllModules();
      this.getCompanys(false);
    } else {
      this.companyMaster = this.userService.userRole.companyMaster;
      this.companyMaster.moduleMaster.map(x=>{
        this.modules.push(x)
        this.modulesCopy.push(x)
      })
      this.onEditCompany(this.companyMaster);
    }
  }

    //can view
 

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
  /** Add New Company */
  onAddNewCompany(companyForm: NgForm, title: string) {
    debugger;
    this.companyMaster.moduleMaster = [];
    for (let [key, value] of this.moduleMap) {
      if (value == true) {
        this.companyMaster.moduleMaster.push(key);
      }
    }
    if (title === 'Add Organization') {
      const fromData = this.companyService.createUserFormData(
        '',
        this.companyMaster,
        this.profileImage
      );

      this.subscription.push(
        this.companyService.addCompany(this.companyMaster).subscribe(
          (response: CustomHttpResponse | any) => {
            this.modules = response;
            companyForm.reset();
            debugger;
            this.modules.map((data) => {
              this.moduleMap.set(data, false);
            });
            this.getCompanys(false);
            this.sendNotification(NotificationType.SUCCESS, response.message);
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
    } else {
      this.subscription.push(
        this.companyService
          .updateCompany(this.companyMaster, this.currentCompanyEmail)
          .subscribe(
            (response: CustomHttpResponse | any) => {
              this.modules = response;
              companyForm.reset();
              debugger;
              this.modules.map((data) => {
                this.moduleMap.set(data, false);
              });
              debugger;
              this.getCompanys(false);
              this.title === 'Add Organization';
              this.sendNotification(NotificationType.SUCCESS, response.message);
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

  //GET ALL COMPANY
  public getCompanys(showNotification: boolean): void {
    debugger;
    this.showLoading = true;
    this.subscription.push(
      this.companyService.getCompanys().subscribe(
        (response: CompanyMaster[] | any) => {
          debugger;
          this.companys = response;

          this.showLoading = false;
          if (showNotification) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `${response.length} Company Loaded sucessfully`
            );
          }
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

  /**on edit company */
  onEditCompany(company: CompanyMaster) {
    debugger;
    this.title = `Update   ${company.companyName}`;
    this.companyMaster = company;
    if (company.moduleMaster.length == 0) {
      this.modules.map((data) => {
        this.moduleMap.set(data, false);
      });
    } else {
      this.setAllModuleMasterFalseOrTrue(false);
      company.moduleMaster.map((x) => {
        this.modulesCopy.find((x1) => {
          if (x1.moduleDescription == x.moduleDescription) {
            this.loadExistDataModuleMap(x1);
          }
        });
      });
    }

    debugger;
    this.currentCompanyEmail = company.companyEmail;
  }

  /**on Delete company */
  onDeleteCompany(companyId: string) {
    debugger;
    this.subscription.push(
      this.companyService.deleteCompany(companyId).subscribe(
        (response: CustomHttpResponse | any) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getCompanys(true);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      )
    );
  }

  /** on change profile image*/
  public onProfileImageChange(event: any): void {
    debugger;
    this.fileName = event.target?.files[0].name;
    this.profileImage = event.target?.files[0];
    if (event.target.files && event.target.files[0]) {
      this.imagePath = [];

      var filesCount = event.target.files.length;

      for (let i = 0; i < filesCount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (ev) => {
          debugger;
          console.log(fileReader.result);
          this.imagePath.push(fileReader.result);
          this.imagePath = this.imagePath[0].toString();
        };

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  /**click button */

  clickButton(bttonId: string) {
    document.getElementById(bttonId)?.click();
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
//cancel form 
cancelForm(form:NgForm){
  form.reset();
  this.setAllModuleMasterFalseOrTrue(false);
  this.title = 'Add Organization';
  this.getCompanys(false);
}
  loadExistDataModuleMap(value1: any) {
    debugger;

    this.moduleMap.set(value1, true);
  }
  onSelectAllModules() {
    this.setAllModuleMasterFalseOrTrue(true);
  }

  /**set all module master false */
  setAllModuleMasterFalseOrTrue(value: boolean) {
    this.modules.map((data) => {
      this.moduleMap.set(data, value);
    });
  }
  /** Get All Modules */
  getAllModules() {
    this.subscription.push(
      this.moduleService.getModuleMasters().subscribe(
        (response: CustomHttpResponse | any) => {
          this.modules = response;
          this.modulesCopy = response;
          this.modules.map((data) => {
            this.moduleMap.set(data, false);
          });
          //this.sendNotification(NotificationType.SUCCESS, response.message);
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
  /** on check modules */
  onCheckModule(value: any, event: any) {
    debugger;
    this.moduleMap.set(value, event.target.checked);
  }
}
