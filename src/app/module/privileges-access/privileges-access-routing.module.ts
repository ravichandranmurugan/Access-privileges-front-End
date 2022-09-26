import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guard/authentication.guard';
import { PrevilegesAccessComponent } from './component/previleges-access/previleges-access.component';

const routes: Routes = [
  {
    path:'',
    component:PrevilegesAccessComponent,canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegesAccessRoutingModule { }
