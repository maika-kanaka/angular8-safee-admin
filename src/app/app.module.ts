import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarLeftComponent } from './admin/sidebar-left/sidebar-left.component';
import { SidebarRightHeaderComponent } from './admin/sidebar-right-header/sidebar-right-header.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserComponent } from './admin/setting/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarLeftComponent,
    SidebarRightHeaderComponent,
    ForgotPasswordComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
