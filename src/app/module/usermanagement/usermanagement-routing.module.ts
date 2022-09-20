import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guard/authentication.guard';
import { UserComponent } from 'src/app/module/usermanagement/components/user/user.component';

const routes: Routes = [
  {
    path:"management",component:UserComponent,canActivate:[AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermanagementRoutingModule { }
