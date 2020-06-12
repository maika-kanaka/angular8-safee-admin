import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserComponent } from './admin/setting/user/user.component';
import { UserGroupComponent } from './admin/setting/user-group/user-group.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LogoutComponent } from './admin/logout/logout.component';
import { ProfileComponent } from './admin/profile/profile.component';


const routes: Routes = [
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/logout', component: LogoutComponent},
  {path: 'admin/password/forgot', component: ForgotPasswordComponent},

  {
    path: 'admin/dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard], data: {menu_id: DashboardComponent.menu_id}
  },
  {
    path: 'admin/profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard], data: {menu_id: ProfileComponent.menu_id}
  },
  {
    path: 'admin/setting/user', 
    component: UserComponent, 
    canActivate: [AuthGuard], data: {menu_id: UserComponent.menu_id}
  },
  {
    path: 'admin/setting/user/group', 
    component: UserGroupComponent, 
    canActivate: [AuthGuard], data: {menu_id: UserGroupComponent.menu_id}
  },

  {path: '', redirectTo: 'admin/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
