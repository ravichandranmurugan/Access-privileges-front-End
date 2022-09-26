import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrevilegesAccessComponent } from './component/previleges-access/previleges-access.component';

const routes: Routes = [
  {
    path:'',
    component:PrevilegesAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegesAccessRoutingModule { }
