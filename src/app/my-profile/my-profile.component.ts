import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  constructor(private serv: UserService)
  {
    this.getData()
  }
  myProfileData:any
  getData() {
    this.serv.myProfile().subscribe((data: any)=>{
      this.myProfileData=data
      console.log(this.myProfileData);
    })
  }

  


}
