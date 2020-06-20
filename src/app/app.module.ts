import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './_helpers/token.interprector';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarLeftComponent } from './admin/sidebar-left/sidebar-left.component';
import { SidebarRightHeaderComponent } from './admin/sidebar-right-header/sidebar-right-header.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserComponent } from './admin/setting/user/user.component';
import { UserGroupComponent } from './admin/setting/user-group/user-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { LogoutComponent } from './admin/logout/logout.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { MessageComponent } from './_ui/message/message.component';
import { UnderwidthComponent } from './_ui/underwidth/underwidth.component';
import { UserAddComponent } from './admin/setting/user-add/user-add.component';
import { UserGroupAddComponent } from './admin/setting/user-group-add/user-group-add.component';
import { UserEditComponent } from './admin/setting/user-edit/user-edit.component';
import { ModalConfirmComponent } from './_ui/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarLeftComponent,
    SidebarRightHeaderComponent,
    ForgotPasswordComponent,
    UserComponent,
    UserGroupComponent,
    LogoutComponent,
    ProfileComponent,
    MessageComponent,
    UnderwidthComponent,
    UserAddComponent,
    UserGroupAddComponent,
    UserEditComponent,
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    DataTablesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function(){
          return localStorage.getItem("access_token")
        },
        whitelistedDomains: [ env.apiDomain ],
        blacklistedRoutes: [ env.apiUrl + '/login' ]
      }
    }),

    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
