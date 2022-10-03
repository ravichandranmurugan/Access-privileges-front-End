import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBottomComponent } from './layout/layout-bottom/layout-bottom.component';
import { RouterModule } from '@angular/router';
import { LayoutBottomFooterComponent } from './layout/layout-bottom-footer/layout-bottom-footer.component';
import { MaterialModule } from '../shared/module/material/material.module';
import { LayoutBottomHeaderComponent } from './layout/layout-bottom-header/layout-bottom-header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutBottomComponent,
    LayoutBottomFooterComponent,
    LayoutBottomHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ]
})
export class CoreModule { }
