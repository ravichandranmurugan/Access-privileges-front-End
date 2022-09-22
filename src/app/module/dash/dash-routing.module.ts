import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guard/authentication.guard';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'home',
    component:DashboardComponent,canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
