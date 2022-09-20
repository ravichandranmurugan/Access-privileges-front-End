import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBottomComponent } from './layout/layout-bottom/layout-bottom.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutBottomComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
