import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { LayoutBottomComponent } from './core/layout/layout-bottom/layout-bottom.component';
import { LoginComponent } from './module/authentication/components/login/login.component';
import { RegisterComponent } from './module/authentication/components/register/register.component';
import { UserComponent } from './module/usermanagement/components/user/user.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./module/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },

  {
    path: 'layout',
    component: LayoutBottomComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./module/usermanagement/usermanagement.module').then(
            (m) => m.UsermanagementModule
          ),
      },
      {
        path: 'dash',
        loadChildren: () =>
          import('./module/dash/dash.module').then(
            (m) => m.DashModule
          ),
      },
      {
        path: 'module',
        loadChildren: () =>
          import('./module/module-access/module-access.module').then(
            (m) => m.ModuleAccessModule
          ),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./module/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'privilegesAccess',
        loadChildren: () =>
          import('./module/privileges-access/privileges-access.module').then(
            (m) => m.PrivilegesAccessModule
          ),
      },
      
    ]
  },
 
  {
    path:'',redirectTo:"auth/login",pathMatch:'full'
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
