import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<null | JwtPayload>=new BehaviorSubject<null | JwtPayload>(null);

  constructor(private http:HttpClient,@Inject(PLATFORM_ID) Id:object,private route:Router){ 
    if(isPlatformBrowser(Id)){
      if(localStorage.getItem('userToken') != null){
        this.decodeData()
      }

    }
  }

  register(data:Auth):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
  }
  login(data:Auth):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,data)
  }

  decodeData(){
    const data=localStorage.getItem('userToken')!;
    const decoded = jwtDecode(data);
    this.userData.next(decoded)
    console.log(decoded)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.route.navigate(['/login'])
  }
}
