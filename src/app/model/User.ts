import { UserRole } from "./UserRole";

export class User{
     public id:number;
     public userId :string;
     public firstName:string;
     public lastName:string;
     public userName:string;
     public email:string;
     public lastLoginDate:Date;
     public joinDate:Date;
     public profileImage:string;
     public active:boolean;
     public notLocked:boolean;
    public userRole:UserRole;
     public userRoleId:string;
     constructor(){
        this.id = 0;
        this.userId = '';
        this.firstName = '';
        this.lastName = '';
        this.userName = '';
        this.email = '';
        this.lastLoginDate = new Date();
        this.joinDate = new Date();
        this.profileImage = '';
        this.active = false;
        this.notLocked = false;
      this.userRole = new UserRole();
      this.userRoleId = "";
     }
}