// cart.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartnumber=new BehaviorSubject(0)
  constructor(private http:HttpClient) { }
ngOnInit(): void {
  this.getProductFromCart().subscribe({
    next:(res)=>{
      this.cartnumber.next(res.numOfCartItems)
    
    }
  })
  
}
  getHeaders(): HttpHeaders {
    return new HttpHeaders().set('token', localStorage.getItem('userToken') || '');
  }

  addProductToCart(id:string):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
     
    );
  }

  getProductFromCart():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.getHeaders()
    });
  }

  updateProductFromCart(id:string, count:number):Observable<any>{
    return this.http.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
     
    );
  }


removeItemFromCart(id: string): Observable<any> {
  return this.http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
  
  });
}

  clearAllProdcutInCart():Observable<any>{
    return this.http.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
     
    });
  }
}