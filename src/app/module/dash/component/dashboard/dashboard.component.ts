import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onclick(value: string) {
    if (value == 'company') {
      this.router.navigate(['company']);
    } else if (value == 'user') {
      this.router.navigate(['user/management']);
    } else if (value == 'module') {
      this.router.navigate(['module']);
    } else if (value == 'privilegesAccess') {
      this.router.navigate(['privilegesAccess']);
    }else if(value == 'optical'){
      this.router.navigate(['main/optical']);

    }else if(value == 'invoice'){
      this.router.navigate(['main/invoice']);

    }
  }
}
