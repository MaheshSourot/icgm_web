import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChartsComponent } from './charts/charts.component';
import { CalenComponent } from './calen/calen.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { ShowroleComponent } from './showrole/showrole.component';

const routes: Routes = [
 {
  path:'login',
  component:LoginComponent
 },
 {
  path:'calen',
  component:CalenComponent
 },
 {
  path:'charts',
  component:ChartsComponent
 },
 {
  path:'change-password',
  component:ChangePasswordComponent

 },
 {
  path:'viewlist',
  component:ViewlistComponent
 },

 {
  path:'showrole',
  component:ShowroleComponent
 },
 {
  path:'my-profile',
  component: MyProfileComponent
 },
 {
  path:'dashboard',
  component: DashboardComponent
 },
 {
  path:'',
  redirectTo:'login',
  pathMatch:'full'
 },
 {
  path:'add-user',
  component:AddUserComponent
 },
 {
  path:'user-detail',
  component:UserDetailComponent
 }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
