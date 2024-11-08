import { Component, inject, input, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormGroup,FormControl,Validators,FormBuilder,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calen',
  templateUrl: './calen.component.html',
  styleUrl: './calen.component.css'
})
export class CalenComponent implements OnInit{
  form: FormGroup;
  formConfig: any[] = [];
  
  constructor(private srv:UserService,private fb:FormBuilder, private toast:ToastrService)
  {
    this.form = this.fb.group({});
    
    this.getProductsDetails()
    // this.getDyamicFormData()
    
    
  }

  ngOnInit(): void {
    
  }


  Obj:any
  productId:any[]=[]
 
  getProductsDetails()
  {
    this.srv.getProduct().subscribe((res:any)=>
    {
      console.log(res);
      this.Obj=res
      res.map((Obj:any)=>
      {
        this.productId.push(Obj.id)
        console.log("product_id",this.productId);
      })
    })
  }

 
  productId1:any

  Obj2:any
  insurance_id:any=[]
  onCategorySelected(data:any)
  {
    this.productId1=data.value
    console.log(this.productId1);
    console.log("hello");
    this.srv.getInsurser({'product_id':this.productId1}).subscribe((res:any)=>
    {
      console.log(res);
      this.Obj2=res
      
      res.map((Obj2:any)=>
        {
          this.insurance_id.push(Obj2.id)
          console.log("insurance",this.insurance_id);
        })
       
    })
  }

  insur_id:any
  Obj3:any={}
  title:any=''
  formData:any
  onFormChange(data:any)
  {
    this.insur_id=data.value
    console.log(this.insur_id);
    this.srv.getDynamicForm({"product_id":this.productId1,"insurer_id":this.insur_id,"step": 0}).subscribe((res:any)=>
    {
      if(res)
      {  
      this.Obj3=res
      console.log(res);
      this.title=res.data[0].step_title
      this.formConfig =res.data[0].data
      console.log(this.formConfig);
      if(this.formConfig.length>0)
      {
      this.formConfig.unshift({
        "label": "Customer Email",
        "name": "customer_email",
        "type": "text",
        "placeholder": "Enter Your  Email",
        "validations": [
            {
                "name": "required",
                "validator": "Validators.required",
                "message": "Customer Email is required"
            }]
  },
  {
    "label": "Customer Mobile",
    "name": "customer_mobile_no",
    "type": "text",
    "placeholder": "Enter Your  Contact",
    "validations": [
        {
            "name": "required",
            "validator": "Validators.required",
            "message": "Customer Mobile No is required"
        }]
},

{
  "label": "Policy Number",
  "name": "policy_number",
  "type": "text",
  "placeholder": "customer policy number",
  "validations": [
      {
          "name": "required",
          "validator": "Validators.required",
          "message": "Policy Number is required"
      }]
},

{
  "label": "Policy From",
  "name": "policy_from",
  "type": "date",
  "placeholder": "dd-mm-yy",
  "validations": [
      {
          "name": "required",
          "validator": "Validators.required",
          "message": "Policy From Date is required"
      }]
},

{
  "label": "Policy To",
  "name": "policy_to",
  "type": "date",
  "placeholder": "dd-mm-yy",
  "validations": [
      {
          "name": "required",
          "validator": "Validators.required",
          "message": "Policy To Date is required"
      }]
},

      

)}

      }



    

   
      this.createForm();
    })
  }



  createForm() {
    this.formConfig.forEach(field => {
      const validations:any[] = [];
      if (field.validations) {
        field.validations.forEach((validation: any) => {
          if (validation.name === 'required') {
            validations.push(Validators.required);
          }
          if (validation.name === 'minLength') {
            validations.push(Validators.minLength(validation.value));
          }
          if (validation.name === 'maxLength') {
            validations.push(Validators.maxLength(validation.value));
          }
          // Add other validation cases as needed
        });
      }
      this.form.addControl(field.name, this.fb.control('', validations));
    });
  }



  
  
 

  onSubmit()
  {
    if(this.form.valid)
    {
      console.log(this.Obj3);
      console.log(this.form.value);
      this.form.value['form_id']=this.Obj3.form_id
      this.form.value['product_id']=this.productId1
      this.form.value['insurer_id']=this.insur_id
      console.log(this.form.value);
      this.srv.addClaim(this.form.value).subscribe((response:any)=>
      {
        console.log(response);
        this.toast.success(
          response.message
          
           
        );
      
      })
      this.form.reset()
    }

    else
    {
      this.form.markAllAsTouched()
    }
  }


  onEdit()
  {
    
  }


  
}
