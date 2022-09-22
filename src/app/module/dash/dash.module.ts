import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashRoutingModule
  ]
})
export class DashModule { }
