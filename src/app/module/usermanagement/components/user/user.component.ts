import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { User } from '../../../../model/User';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/service/notification.service';
import { NotificationType } from 'src/app/core/enum/notification-type-enum';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/enum/role.eum';
import { UserRoleService } from 'src/app/service/userRole/user-role.service';
import { UserRole } from 'src/app/model/UserRole';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[] = [];
  public user!: User;
  public refreshing: boolean = false;
  private subscription: Subscription[] = [];
  public selectedUser: User = new User();
  public showLoading: boolean = false;
  public fileName: string = '';
  public profileImage!: File;
  public editUserFileName: string = '';
  public editUserProfileImage!: File;
 public userRoles:UserRole[] = [];

  editUser: User = new User();
  currentUserName: string = '';
  imagePath: any = [];
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private modalService: NgbModal,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userRoleService:UserRoleService
  ) {}

  /* open Modal*/

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  /** change title */

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }
  onTabChange(aa: any) {
    debugger;
    var a = this.changeTitle(aa.tab.textLabel);
    if (aa.tab.textLabel == 'profile') {
      this.onEditUser(this.user);
    }
  }
  /**change title */
  public getUsers(showNotification: boolean): void {
    debugger;
    this.refreshing = true;
    this.subscription.push(
      this.userService.getUsers().subscribe(
        (response: User[] | any) => {
          debugger
          this.userService.addUsersToLocalCache(response);
          this.users = response;
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

  /**show pop up model on selected user  */
  public onSelectUser(selectedUser: User, content: any): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo');

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  /**search user */
  public searchUsers(searchTerm: string) {
    debugger;
    const result: User[] = [];
    for (let user of this.userService.getUsersToLocalCache()) {
      if (
        user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        result.push(user);
      }
    }
    this.users = result;
    if (result.length == 0 || !searchTerm) {
      this.users = this.userService.getUsersToLocalCache();
    }
  }

  /**get on change user role */
get(value:any){
debugger
const s = value.innerText
this.editUser.userRole = this.userRoles.find(x=>x.roleDescription == s)!;
}
  /**add new user */
  public onAddNewUser(userForm: NgForm) {
    debugger;
    console.log(userForm.value);
    userForm.value.userRole =  this.userRoles.find(x=>x.roleDescription == userForm.value.userRole);
    userForm.value.userRoleId = userForm.value.userRole.roleId;
    const formData = this.userService.createUserFormData(
      ' ',
      userForm.value ,
      this.profileImage
    );
    this.subscription.push(
      this.userService.addUser(formData).subscribe(
        (response: User | any) => {
          debugger
          this.clickButton('closenewuser');

          this.getUsers(false);
          this.fileName = '';

          //userForm.reset();

          this.refreshing = false;
          this.sendNotification(
            NotificationType.SUCCESS,
            `${response.firstName} ${response.lastName} New User Added Sucessfully`
          );
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
  /**delete user */
  onDeleteUser(userId: string) {
    debugger;
    this.subscription.push(
      this.userService.deleteUser(userId).subscribe(
        (response: CustomHttpResponse | any) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(true);
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

  /**edit user */

  public onEditUser(editUser: User) {
    debugger;
    this.editUser = editUser;
    this.currentUserName = editUser.userName;
    this.imagePath = editUser.profileImage;
  }
  onEditUserSubmit(userForm: NgForm): void {
    debugger;
    this.showLoading = true;
    console.log(userForm.value);
    userForm.value.userRole =  this.userRoles.find(x=>x.roleDescription == userForm.value.userRole);
    userForm.value.userRoleId = userForm.value.userRole.roleId;
    const formData = this.userService.createUserFormData(
      this.currentUserName,
      userForm.value,
      this.profileImage
    );
    this.subscription.push(
      this.userService.updateUser(formData).subscribe(
        (response: User | any) => {
          this.clickButton('closeedituser');
          this.showLoading = false;
          this.getUsers(false);
        //  this.fileName = '';

          userForm.reset();
          debugger;
          this.editUser = response;
          this.refreshing = false;
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
          this.refreshing = false;
        }
      )
    );
  }

  /** reset password*/
  onResetPassword(emailForm: NgForm): void {
    this.refreshing = true;
    const emailAddress = emailForm.value['reset-password-email'];
    this.subscription.push(
      this.userService.resetPassword(emailAddress).subscribe(
        (response: CustomHttpResponse | any) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.WARNING,
            errorResponse.error.message
          );
          this.refreshing = false;
        },
        () => emailForm.reset()
      )
    );
  }
  /**update profile image */
  //TODO
  updateProfileImage() {
    this.openFileLocal();
    const formData = new FormData();
    formData.append('userName', this.user.userName);
    formData.append('profileImage', this.profileImage);
    this.subscription.push(
      this.userService.updateProfileImage(formData).subscribe(
        (response: HttpEvent<any> | any) => {
          this.clickButton('closenewuser');

          this.getUsers(false);
          this.fileName = '';

          //userForm.reset();

          this.refreshing = false;
          this.sendNotification(
            NotificationType.SUCCESS,
            `profile image updated Sucessfully`
          );
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

  /**logout */
  onLogout(): void {
    this.authenticationService.Logout();
    this.router.navigate(['/login']);
    this.sendNotification(
      NotificationType.SUCCESS,
      'you have benn Sucessfully logged out'
    );
  }

  /** get UserRoles  */
  getUserRoles(){
    debugger
    this.subscription.push(
      this.userRoleService.getUsersRole().subscribe(
        (response: UserRole[] | any) => {
         debugger
          this.userRoles = response;
         
          // if (showNotification) {
          //   this.sendNotification(
          //     NotificationType.SUCCESS,
          //     `${response.length} User(s) loades sucessfully`
          //   );
          // }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error
          );
          this.refreshing = false;
        }
      )
    );
  }
  // public get isAdmin(): boolean {
  //   return (
  //     this.getUserRole() === Role.ADMIN ||
  //     this.getUserRole() === Role.SUPER_ADMIN
  //   );
  // }
  // public get isManager(): boolean {
  //   return (
  //     this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.MANAGER
  //   );
  // }
  // public get isAdminOrManager(): boolean {
  //   return this.isAdmin || this.isManager;
  // }

  openFileLocal() {
    debugger;
    this.clickButton('fileSelector');
  }
  onSubmitUser() {
    this.clickButton('newuser');
  }
  onUpdateUser() {
    this.clickButton('edituser');
  }
  clickButton(bttonId: string) {
    document.getElementById(bttonId)?.click();
  }
  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalStorageCache();
    this.getUsers(true);
    this.getUserRoles();
  }
  ngOnDestroy(): void {
    this.subscription.map(x=>x.unsubscribe());
    //throw new Error('Method not implemented.');
  }
}
