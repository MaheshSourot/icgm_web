import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showrole',
  templateUrl: './showrole.component.html',
  styleUrl: './showrole.component.css'
})
export class ShowroleComponent {

  showUser:any
  loginFormData:any
  loginData:any


  constructor( private srv:UserService,private router:Router)
{
  this.srv.data$.subscribe((data) => {
    console.log(data);
    if(data)
      { // Will receive 'Data from Component A' if sent
    this.showUser=data.role
    console.log(this.showUser);
    
      }
  });

  this.srv.logindata$.subscribe((loginData)=>
  {
    this.loginFormData=loginData
    console.log(this.loginFormData);
  })

  
  
 }

 UserForm=new FormGroup(
  {
    role_id:new FormControl('',[Validators.required]),
  }
)

token_id:any
 onUserSubmit()
 {
  if(this.UserForm.valid)
  {
    this.token_id=this.UserForm.value.role_id
    console.log(this.loginFormData);
    
    console.log(this.token_id);
    this.srv.onToken(this.token_id,this.loginFormData).subscribe((response:any)=>
      {
        
        
        console.log(response);
         this.loginData=response
         localStorage.setItem("loginToken",JSON.stringify(this.loginData))
         
         if(response.role==="SUPERADMIN")
         {
            this.router.navigateByUrl('/charts')
         }

         else if(response.role==="CUSTOMER")
         {
          this.router.navigateByUrl('/viewlist')
         }
      })
   
      
       
        
      }
    this.UserForm.reset()
  }
 }

