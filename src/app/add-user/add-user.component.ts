import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  data: any[] = [];
  private subscription: Subscription | undefined;

  
  constructor(private srv:UserService,private router: Router)
  {
    
    
}

  

  ngOnInit(): void {
    this.isFormAvailabel=false
    this.showDepartment()
    this.showDesignation()
    this.showRole()
    this.getAllData()
    this.setForm()
     // Fetch data initially and set up a polling interval
  }

  

  
  addUserForm=new FormGroup({
    user_type:new FormControl('SUPERADMIN'),
    role_type:new FormControl('',[Validators.required]),
    first_name: new FormControl('',[Validators.required]),
    last_name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    department_id:new FormControl('',[Validators.required]),
    designation_id:new FormControl('',[Validators.required]),
    contact_number: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)])



  })
formValue:any


  onUserSubmit()
  {
    
    if(this.addUserForm.valid)
    {
      this.formValue=this.addUserForm.value
      this.formValue.department_id=Number(this.formValue.department_id)
      this.formValue.contact_number=Number(this.formValue.contact_number)
      this.formValue.designation_id=Number(this.formValue.designation_id)
      this.formValue.role_type=this.formValue.role_type
      
      
      console.log(this.addUserForm.value);
      console.log(this.formValue);

      

      this.srv.sendData(this.formValue).subscribe((res)=>
      {
        console.log(res);
      })
      this.addUserForm.reset()
    
   
      
    }

    else
    {
      alert("invalid form value")
    }
  }
editFormData:any
  setForm()
  {
    
   this.editFormData=this.srv.getEditUser();
   
   this.addUserForm.patchValue(this.editFormData);
   this.isEdit1=true 
   
  }

  // onCancel()
  // {
  //   this.router.navigateByUrl('/dashboard')
  // }
  department:any
  showDepartment()
  {
    this.srv.getDepartment().subscribe((res)=>
    {
      console.log(res);
      this.department=res
    })
  }

  // onUpdate()
  // {
  //   this.srv.getDepartment().subscribe((res)=>{
  //   console.log(res);
  //   })
  // }

  designation:any
  showDesignation()
  {
    this.srv.getDesignation().subscribe((res)=>
    {
      this.designation=res
    })
  }

  roleType:any

  showRole()
  {
    this.srv.getRole().subscribe((res)=>
    {
      this.roleType=res
      console.log(res);
    })
  }

  userData:any
  data1:any

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

  isEdit:boolean=false
  // login_id:any
  item:any
  onEdit(item:any)
  {
    this.isFormAvailabel=true
    this.isEdit1=false
    console.log(item);
    this.isEdit=true
    this.item=item
    this.addUserForm.patchValue(item)
  
  }

  

  onUpDate()
  {
    
    if(this.addUserForm.valid)
    {
      this.item.first_name=this.addUserForm.value.first_name
      this.item.last_name=this.addUserForm.value.last_name
      this.item.email=this.addUserForm.value.email
      this.item.contact_number=this.addUserForm.value.contact_number
      this.item.department_id=this.addUserForm.value.department_id
      this.item.designation_id=this.addUserForm.value.designation_id
      this.item.user_type=this.addUserForm.value.user_type
      this.srv.updateUser(this.item).subscribe((res)=>
      {
        console.log(res);
      })
      
      this.addUserForm.reset()
        // Fetch every 5 seconds
     this.srv.getUsers().subscribe((response:any) => {
       this.data = response.value;
     });
      this.isEdit=false
    }

   
  }

  onAddUser()
  {
   this.isFormAvailabel=true
  }

isEdit1:boolean=false
  onUpDate1()
  {
    
    if(this.addUserForm.valid)
    {
      this.editFormData.first_name=this.addUserForm.value.first_name
      this.editFormData.last_name=this.addUserForm.value.last_name
      this.editFormData.email=this.addUserForm.value.email
      this.editFormData.contact_number=this.addUserForm.value.contact_number
      this.editFormData.department_id=this.addUserForm.value.department_id
      this.editFormData.designation_id=this.addUserForm.value.designation_id
      this.editFormData.user_type=this.addUserForm.value.user_type
      this.srv.updateUser(this.editFormData).subscribe((res)=>
      {
        console.log(res);
      })
      this.getAllData()
      this.addUserForm.reset()
      this.isEdit1=false
    }

   
  }

  isFormAvailabel:boolean=true
  onCancel()
  {
    this.isFormAvailabel=false
  }

 
}
