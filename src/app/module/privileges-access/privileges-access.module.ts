import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivilegesAccessRoutingModule } from './privileges-access-routing.module';
import { PrevilegesAccessComponent } from './component/previleges-access/previleges-access.component';
import { MaterialModule } from 'src/app/shared/module/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrevilegesAccessComponent
  ],
  imports: [
    CommonModule,
    PrivilegesAccessRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class PrivilegesAccessModule { }
