import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ModuleGroupMaster } from 'src/app/model/ModuleGroupMaster';
import { ModuleMaster } from 'src/app/model/ModuleMaster';
import { ModuleMasterService } from 'src/app/service/Module/module-master.service';
import {AuthenticationService} from '../../../../core/service/authentication.service'
@Component({
  selector: 'app-moduleaccess',
  templateUrl: './moduleaccess.component.html',
  styleUrls: ['./moduleaccess.component.scss'],
})
export class ModuleaccessComponent implements OnInit {
  editModuleMaster: ModuleMaster = new ModuleMaster();
  newModuleMaster: ModuleMaster = new ModuleMaster();

  modules: ModuleMaster[] | any = [];
  subscription: Subscription[] = [];
  refreshing: boolean = false;
  currentModuleDescription: string = '';
  constructor(
    private moduleService: ModuleMasterService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private authenticationService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAllModuleMaster(true);
  }

  /**serach module */

  public searchUsers(searchTerm: string) {
    debugger;
    const result: ModuleMaster[] = [];
    for (let user of this.modules) {
      if (
        user.moduleDescription
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.modulePath.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
          -1 ||
        user.moduleType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        result.push(user);
      }
    }
    this.modules = result;
    if (result.length == 0 || !searchTerm) {
      this.modules = this.moduleService.getModuleMasters();
    }
  }

  /**Get ALL MODULES */
  getAllModuleMaster(showNotification: boolean) {
    this.refreshing = true;
    this.subscription.push(
      this.moduleService.getModuleMasters().subscribe(
        (response: ModuleMaster[] | any) => {
          debugger;
          this.modules = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `${response.length} User(s) loades sucessfully`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.refreshing = false;
        }
      )
    );
  }
  
  /**on add new Module */
  onAddNewModule(moduleForm: NgForm) {
    debugger;
    this.refreshing = true;
    const formData = this.moduleService.createUserFormData(
      '',
      moduleForm.value
    );
    this.subscription.push(
      this.moduleService.addModuleMaster(this.newModuleMaster).subscribe(
        (response: ModuleMaster | any) => {
          debugger
          moduleForm.reset()
          this.refreshing = false;
          if (true) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `${response.length}Module Added Sucessfully`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.refreshing = false;
        }
      )
    );
  }
/**on remove Sub module */
onRemoveSubModule(value:number,obj:ModuleMaster){
  obj.moduleGroupMaster.splice(value,1);
}
/***Add sub module */
addSubModule(obj:ModuleMaster){
  debugger
  const newModuleGroupMaster = new ModuleGroupMaster();
  obj.moduleGroupMaster.unshift(newModuleGroupMaster);
}
  //**on edit modal */
  onEditModule(value: ModuleMaster) {
    this.editModuleMaster = value;
    this.currentModuleDescription = value.moduleDescription;
  }

  onEditModuleSubmit(moduleForm: NgForm) {
    // const formData = this.moduleService.createUserFormData(
    //   this.currentModuleDescription,
    //   moduleForm.value
    // );
    debugger
    this.editModuleMaster;
    this.subscription.push(
      this.moduleService.updateModuleMaster(this.editModuleMaster,this.currentModuleDescription).subscribe(
        (response: ModuleMaster | any) => {
          debugger
          this.getAllModuleMaster(true);
          this.refreshing = false;
          if (true) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `${response.length}Module Updated Sucessfully`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.refreshing = false;
        }
      )
    );
  }

  /**on delete module */
  onDeleteModule(moduleId: string) {
    this.subscription.push(
      this.moduleService.deleteModuleMaster(moduleId).subscribe(
        (response: ModuleMaster | any) => {
          this.refreshing = false;
          if (true) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `${response.length}Module Deleted Sucessfully`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.refreshing = false;
        }
      )
    );
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

  /**open modal */
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  /**click button */
  clickButton(bttonId: string) {
    document.getElementById(bttonId)?.click();
  }
}
