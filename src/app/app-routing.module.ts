import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/password/forgot', component: ForgotPasswordComponent},
  
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: '', redirectTo: 'admin/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
