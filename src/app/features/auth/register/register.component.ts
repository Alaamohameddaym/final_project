import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Auth } from '../../../shared/interface/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

 showMessage:string=''
 isloading:boolean=false;
  constructor(private auth:AuthService, private router:Router){}

  RegisterForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(10)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern(/^[A-Z]\w{6}$/)]),
    rePassword: new FormControl('', [Validators.required])
  },{validators:this.confirm});

  confirm(group:AbstractControl){
    const password=group.get('password')?.value;
    const rePassword=group.get('rePassword')?.value;
    if(password===rePassword){
      return null
    }else{
      return {mismatch:true}
    }

    
  }    
    
  submit(){
    console.log('Name Errors:', this.RegisterForm.get('name')?.errors);
    this.isloading=true
    console.log(this.RegisterForm.value)
   if(this.RegisterForm.invalid){
    this.RegisterForm.markAllAsTouched();
    this.isloading=false;
   }else{
    this.auth.register(this.RegisterForm.value as Auth).subscribe({
      next:(res)=>{
        this.isloading=false
        if(res.message=='success'){
           this.router.navigate(['/login'])
          
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