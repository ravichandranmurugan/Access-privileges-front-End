import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guard/authentication.guard';
import { ModuleaccessComponent } from './component/moduleaccess/moduleaccess.component';

const routes: Routes = [
  {
    path:"home",
    component:ModuleaccessComponent,canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAccessRoutingModule { }
