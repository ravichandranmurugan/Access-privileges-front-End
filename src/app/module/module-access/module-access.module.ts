import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleAccessRoutingModule } from './module-access-routing.module';
import { ModuleaccessComponent } from './component/moduleaccess/moduleaccess.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/module/material/material.module';


@NgModule({
  declarations: [
    ModuleaccessComponent
  ],
  imports: [
    CommonModule,
    ModuleAccessRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ModuleAccessModule { }
