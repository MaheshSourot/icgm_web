import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router:Router, private srv:UserService)
  {
    this.getAllData()
  }

  onAddUser()
  {
    this.router.navigateByUrl('/add-user')
  }

  userData:any
  data:any
 
  
  getAllData()
  {
    this.srv.getUsers().subscribe((res)=>
    {
      console.log(res)
      this.userData=res 
      this.data=this.userData.value
      this.data.pop()
      console.log(this.data); 
     
    }
  )
  }

  onEdit(item:any)
  {

    console.log(item);
    this.srv.setEditUser(item)
    this.router.navigateByUrl('/add-user')
    // this.change.addUserForm.patchValue(item)
    // this.srv.updateUser(this.change.addUserForm.value)
  }


}
