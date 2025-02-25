import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class TranslaateService {

  constructor(private http:TranslateService ,@Inject(PLATFORM_ID) private Id:object) { 
    http.setDefaultLang('en')
   
    if(isPlatformBrowser(Id)){
    this.change()
    }
  }
   change(){
    let savedlang=localStorage.getItem('lang')||'';
    this.http.use(savedlang)
    if(savedlang=='en'){
      document.documentElement.dir='ltr';

    }else{
      document.documentElement.dir='rtl'
    }
    
  }
}
