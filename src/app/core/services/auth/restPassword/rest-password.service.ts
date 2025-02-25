import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../../shared/interface/auth';

@Injectable({
  providedIn: 'root'
})
export class RestPasswordService {

  constructor(private http:HttpClient) { }
  verifyEmail(payload:Auth):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,payload)
  }
  verifyCode(payload:Auth):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,payload)
  }
  restpassword(payload:Auth):Observable<any>{
    return this.http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,payload)
  }
}
