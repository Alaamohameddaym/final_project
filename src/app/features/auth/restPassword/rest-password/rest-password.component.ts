import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RestPasswordService } from '../../../../core/services/auth/restPassword/rest-password.service';

@Component({
  selector: 'app-rest-password',
  standalone:true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './rest-password.component.html',
  styleUrl: './rest-password.component.scss'
})
export class RestPasswordComponent {
step:number=1;
constructor(private http:RestPasswordService,private toster:ToastrService,private auth:AuthService,private route:Router){}
sendemail:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})
submitemail(){
  this.http.verifyEmail(this.sendemail.value).subscribe({
    next:(res)=>{
      if(res.statusMsg=="success"){
        console.log(res.message)
        this.toster.success(res.message)
        this.step=2
        
      }
    }
  })

}
sendcode:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
})
submitcode(){
  this.http.verifyCode(this.sendcode.value).subscribe({
    next:(res)=>{
      if(res.status=="Success"){
        this.toster.success(res.status)
        this.step=3
        
      }
    }

  })

}

restpassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required])
})

submitpassword(){
this.http.restpassword(this.restpassword.value).subscribe({
  next:(res)=>{
    if(res.token){
      localStorage.setItem('userToken',res.token)
      this.auth.decodeData()
      this.route.navigate(['/home'])

    }
  }
})
}
}
