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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarLeftComponent,
    SidebarRightHeaderComponent,
    ForgotPasswordComponent,
    UserComponent,
    UserGroupComponent
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
