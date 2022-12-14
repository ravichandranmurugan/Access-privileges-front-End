import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './component/company/company.component';
import { MaterialModule } from 'src/app/shared/module/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CompanyModule { }
