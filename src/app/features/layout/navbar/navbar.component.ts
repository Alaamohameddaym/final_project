import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { TranslaateService } from '../../../core/services/translate/translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  cartnumbr: any;
  isLogin: boolean = false;

  constructor(
    public autho: AuthService,
    private cart: CartService,
    private translateService: TranslaateService,
    private translate: TranslateService  // Add this
  ) {}

  ngOnInit(): void {

    this.cart.cartnumber.subscribe({
     next:(res)=>{
       this.cartnumbr=res;
 
     }
    })
 
    this.autho?.userData.subscribe({
     next:(res)=>{
       if(res != null){
         this.isLogin=true
       }else{
         this.isLogin=false
       }
     }
    })
   }
  changelang(x: string) {
    localStorage.setItem('lang', x);
    this.translateService.change();
    this.translate.use(x);
  }
}