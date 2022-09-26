import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ngOnInit(): void {
  }
  iconCilcked(value:string){
    this.activeIcon = value
    if(value == 'home'){
      this.router.navigate(['layout/dash/home']);
    }
    if(value =='logout'){
      this.authService.Logout();
      this.router.navigate(['layout/dash/home']);
    }
  }
  iconhover(value:string){
    
    this.activehover = value
  }
  iconOut(){
    this.activehover = "";
   
  }
}
