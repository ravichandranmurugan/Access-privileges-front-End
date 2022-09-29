import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-layout-bottom-header',
  templateUrl: './layout-bottom-header.component.html',
  styleUrls: ['./layout-bottom-header.component.scss']
})
export class LayoutBottomHeaderComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthenticationService) { }
  activeIcon:any;
  activehover:any;
  loggedInUser!: User;
  ngOnInit(): void {
    this.loggedInUser = this.authService.getUserFromLocalStorageCache();
  }
}
