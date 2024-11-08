import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private serv:UserService, private router:Router, private toast:ToastrService)
  {

  }
  
  loginForm=new FormGroup(
    {
      email:new FormControl('',[Validators.required, Validators.email]),
    
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    }
  )

loginData:any

token_id:any
login()
{
  if(this.loginForm.valid)
  {
    // console.log(this.loginForm.value);
    this.serv.onLogin(this.loginForm.value).subscribe((res:any)=>
    {
      if(res.no_of_role===1)
      {
    
      console.log(res);
      this.token_id=res.role_id
      console.log(this.token_id);
      this.router.navigateByUrl('/charts')

      this.toast.success(
        "Login Success",
         
      );
    
      console.log(this.loginForm.value);
      this.serv.onToken(this.token_id,this.loginForm.value).subscribe((response)=>
    {
      
      console.log(response);
      this.loginData=response
      localStorage.setItem("loginToken",JSON.stringify(this.loginData))
    })
      this.loginForm.reset()
      
      }
      else
      {
        // this.token_id= res.role[1].role_id
      
        this.serv.setData(res);
        this.serv.setLoginData(this.loginForm.value)
        this.router.navigateByUrl('/showrole')


      }
    //   this.toast.success(
    //     "Login Success",
         
    //   );
    
    //   console.log(this.loginForm.value);
    //   this.serv.onToken(this.token_id,this.loginForm.value).subscribe((response)=>
    // {
      
    //   console.log(response);
    //   this.loginData=response
    //   localStorage.setItem("loginToken",JSON.stringify(this.loginData))
    // })
    //   this.loginForm.reset()
      
      //this.router.navigateByUrl('/dashboard')
      // this.router.navigateByUrl('/charts')
      
   } )
  
  
    


    // this.serv.onToken(this.loginForm.value,this.token_id).subscribe((response)=>
    // {
    //   console.log(response);
    //   this.loginData=response
    //   localStorage.setItem("loginToken",JSON.stringify(this.loginData))
    // })
  }

}
}
