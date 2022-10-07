import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationType } from '../../enum/notification-type-enum';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-layout-bottom-header',
  templateUrl: './layout-bottom-header.component.html',
  styleUrls: ['./layout-bottom-header.component.scss']
})
export class LayoutBottomHeaderComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthenticationService,
    private modalService:NgbModal,
    private userService:UserService,
    private notificationService:NotificationService) { }
  activeIcon:any;
  showLoading:boolean = false;
  activehover:any;
  loggedInUser!: User;
  imagePath!:any;
  fileName:string ='';
  editUser!:User;
  profileImage!:File;
  subscription:Subscription[]=[];
  currentUserName:string=''
  ngOnInit(): void {
    this.loggedInUser = this.authService.getUserFromLocalStorageCache();
    this.editUser = this.loggedInUser;
    this.currentUserName = this.loggedInUser.userName;
    this.imagePath = this.loggedInUser.profileImage
    this.editUser.password = this.editUser.userName
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  clickButton(bttonId: string) {
    document.getElementById(bttonId)?.click();
  }
  openFileLocal() {
    debugger;
    this.clickButton('fileSelector');
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
  clearProfile(){
    this.imagePath ='';
    this.fileName ='';
    this.profileImage = this.imagePath;
  }
  updateUser(form:NgForm){
    debugger
    const value = form.value
    this.editUser = this.loggedInUser;
    this.editUser.firstName = value.firstName 
    this.editUser.lastName = value.lastName;
    this.editUser.userName = value.userName;
    this.editUser.password = value.userName;
    this.editUser.email = value.email;
    this.editUser.userRoleId = this.loggedInUser.userRole.roleId;
    this.editUser.active = true;
    this.editUser.notLocked = true;
    const formData = this.userService.createUserFormData(
      this.currentUserName,
      this.editUser,
      this.profileImage
    
    );
    this.subscription.push(
      this.userService.updateUser(formData).subscribe(
        (response: User | any) => {
          this.clickButton('closeedituser');
          this.showLoading = false;
        
        //  this.fileName = '';
        this.modalService.dismissAll()
          form.reset();
          debugger;
          this.editUser = response;
          this.loggedInUser = response;
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
}
