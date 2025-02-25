import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  getAllbrands():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  
  getAllbrandsdetails(id:string):Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }

}
