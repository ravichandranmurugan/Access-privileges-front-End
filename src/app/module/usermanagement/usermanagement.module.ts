import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagementRoutingModule } from './usermanagement-routing.module';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/module/material/material.module';


@NgModule({
  declarations: [
    UserComponent,
  
  ],
  imports: [
    CommonModule,
    UsermanagementRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class UsermanagementModule { }
