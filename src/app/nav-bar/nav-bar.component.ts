import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router, private srv: UserService,private toast:ToastrService)
  {}
  logoutData()
  {
    this.srv.logout().subscribe((logData:any)=>
    {
      console.log(logData);
      if(logData.status==="success")
      {
       
        this.toast.success(
          logData.data,
           
        );
        this.router.navigateByUrl('/login')
      }

    })
  }
 
}
