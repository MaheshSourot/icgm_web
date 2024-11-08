import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrl: './viewlist.component.css'
})
export class ViewlistComponent {

  getTableData:any
  constructor(private srv:UserService)
  {
   this.srv.getAllClaim().subscribe((res:any)=>
    {
      this.getTableData=res.value
     }
  )

  this.srv.getAllUserClaim().subscribe((response:any)=>
  {
    console.log(response);
  })
  
  }

  

}
