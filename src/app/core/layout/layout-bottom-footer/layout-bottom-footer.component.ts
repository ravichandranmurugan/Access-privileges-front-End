import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-layout-bottom-footer',
  templateUrl: './layout-bottom-footer.component.html',
  styleUrls: ['./layout-bottom-footer.component.scss']
})
export class LayoutBottomFooterComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthenticationService) { }
  activeIcon:any;
  activehover:any;
  loggedInUser!: User;
  ngOnInit(): void {
    this.loggedInUser = this.authService.getUserFromLocalStorageCache();
  }
  iconCilcked(value:string){
    this.activeIcon = value
    if(value == 'home'){
      this.router.navigate(['layout/dash/home']);
    }
    if(value =='sign-out'){
      this.authService.Logout();
      this.router.navigate(['auth/login']);
    }
  }
  iconhover(value:string){
    
    this.activehover = value
  }
  iconOut(){
    this.activehover = "";
   
  }
}
