import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhislistService {
  cartnumber: any;

  constructor(private http:HttpClient) { }

  getData(id:string):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ productId: id });
  }
  showdata():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
  }
  removeItemFromCart(id: string): Observable<any> {
    return this.http.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    
    });
  }
}
