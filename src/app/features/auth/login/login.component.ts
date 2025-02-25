import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Auth } from '../../../shared/interface/auth';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showMessage:string=''
  isloading:boolean=false;
   constructor(private auth:AuthService, private router:Router){}
 
   LoginForm = new FormGroup({

     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [Validators.required])
     
   });
 
   submit(){
     this.isloading=true
     if(this.LoginForm.valid){
       this.auth.login(this.LoginForm.value as Auth).subscribe({
         next:(res)=>{
           this.isloading=false
           if(res.message=='success'){
              this.router.navigate(['/home'])
              localStorage.setItem('userToken', res.token)
              this.auth.decodeData();
           }
           console.log(res)
         },
         error:(err)=>{
           this.isloading=false
           this.showMessage=err.error.message
           console.log(err.error)
         }
   
       })
     }
     }
    
}
