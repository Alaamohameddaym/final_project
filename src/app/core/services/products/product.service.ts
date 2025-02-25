import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProduct():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  getSpacificDetails(id:any):Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
}
