import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataSubject = new BehaviorSubject<any>(null);
  private dataSubject1 = new BehaviorSubject<any>(null);
 
  data$ = this.dataSubject.asObservable();
  logindata$ = this.dataSubject1.asObservable();
  
  setData(data: any) {
    this.dataSubject.next(data);
  }

  setLoginData(logindata:any)
  {
    this.dataSubject1.next(logindata)
  }

  editUser:any
  setEditUser(userData:any)
  {
    this.editUser=userData
  }

  getEditUser()
  {
    return this.editUser
  }


  constructor(private http:HttpClient) { 

  }

  onLogin(obj:any)
  {
   return this.http.post(`https://dev-api.icgms.sharajman.com/get_count_user`,obj) 
  }

  onToken(token_id:any ,data:any)
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/token/${token_id}`,data)
  }
  

  myProfile()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get-active-user-details`,{})
  }

  logout()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/logout`,{})
  }

  sendData(obj:any)
  {
    return this.http.post('https://dev-api.icgms.sharajman.com/add-user',obj)
  }

  getDepartment()
  {
    return this.http.post("https://dev-api.icgms.sharajman.com/get-departments",{})
  }

  

  getDesignation()
  {
    let data: any=localStorage.getItem("loginToken")
    let data1:any=JSON.parse(data)
    console.log(data1.access_token);

    
    return this.http.post("https://dev-api.icgms.sharajman.com/get-designation",{headers:{
      'Content-Type':'application/json',
      'authorization':`Bearer ${data.access_token}`
    }})
  }

  getRole()
  {
    let data: any=localStorage.getItem("loginToken")
    let data1:any=JSON.parse(data)
    console.log(data1.access_token);

    return this.http.post("https://dev-api.icgms.sharajman.com/get-role-type-list",
      {headers:{
        'Content-Type':'application/json',
        'authorization':`Bearer ${data.access_token}`
      }
    }
    )
  }

  getUsers()
  {
    return this.http.post("https://dev-api.icgms.sharajman.com/get-all-user-list",{
      "user_type": "SUPERADMIN"
    })
  }

  updateUser(data:any)
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/update-all-type-user_details`,data)
  }

  getDashBoardCounter()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get-dashboard-counts`,{})
  }

  getComposition()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get-composition-of-claim-initiated`,{})
  }

  getDistribute()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get-task-distribution`,{})
  }

  getMonthlyWise()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/month-wise-claims-inspections`,{})
  }

  getAverageDays()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/average-days-to-settle-claim`,{})
  }

  getTopUser()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/top-users-by-claim-activity`,{})
  }
  
  getRevenue()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get-revenue-and-new-client-reg`,{})
  }

  getProduct()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get-products`,{})
  }

  getInsurser(data:any)
  {
    return this.http.post('https://dev-api.icgms.sharajman.com/get-insurer',data)
  }

  getDynamicForm(data:any)
  {

    return this.http.post(`https://dev-api.icgms.sharajman.com/get-dynamic_form`,data)
  }

  addClaim(data:any)
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/add-claim`,data)
  }

  getAllClaim()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get_claim_list`,{})
  }


  getAllUserClaim()
  {
    return this.http.post(`https://dev-api.icgms.sharajman.com/get_all_claim_list`,{from_date: "2024-01-01",page_number: 1,product_filter: 0,record_per_page: 10,search_query: "",to_date: "2024-11-06"})
  }


 
}
