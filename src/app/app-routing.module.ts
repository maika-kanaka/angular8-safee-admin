import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserComponent } from './admin/setting/user/user.component';
import { UserGroupComponent } from './admin/setting/user-group/user-group.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/password/forgot', component: ForgotPasswordComponent},

  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin/setting/user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'admin/setting/user/group', component: UserGroupComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'admin/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
