import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Payment } from '../../../shared/interface/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  checkout(id:string,datafrom:Payment):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{

      shippingAddress:datafrom

    }
    ,{
      headers:{
        token:localStorage.getItem('userToken')!
      }
      
    })
  }
}
