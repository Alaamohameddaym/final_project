import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../../core/services/cart/cart.service';
import { PaymentService } from '../../../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  standalone:true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  productId!:string
   constructor(private payment:PaymentService ,private cart:CartService){}
  form:FormGroup=new FormGroup({
    details:new FormControl('', [Validators.required]),
    phone:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required])
  })
ngOnInit(): void {
this.getdata()
  
}
  getdata(){
    this.cart.getProductFromCart().subscribe({
      next:(res)=>{
        this.productId=res.data._id
      }
    })
  }
  submit(){
    this.payment.checkout(this.productId,this.form.value).subscribe({
      next:(res)=>{
        console.log(res)
        window.location.href=res.session.url
      }
    })
  }

}
