import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBottomComponent } from './layout/layout-bottom/layout-bottom.component';
import { RouterModule } from '@angular/router';
import { LayoutBottomFooterComponent } from './layout/layout-bottom-footer/layout-bottom-footer.component';


@NgModule({
  declarations: [
    LayoutBottomComponent,
    LayoutBottomFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
