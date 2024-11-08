import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient,withInterceptors, } from '@angular/common/http';
import { authInterceptor } from './service/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsComponent } from './charts/charts.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {provideToastr} from "ngx-toastr";
import { CalenComponent } from './calen/calen.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { ShowroleComponent } from './showrole/showrole.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddUserComponent,
    NavBarComponent,
    UserDetailComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    ChartsComponent,
    CalenComponent,
    ViewlistComponent,
    ShowroleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    NgxDaterangepickerMd,
    BrowserAnimationsModule, // Required animations module
     // ToastrModule added
    
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]),

    ),
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
