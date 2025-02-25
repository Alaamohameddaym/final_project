import { Routes } from '@angular/router';
import { authguardGuard } from './core/guard/authgard/authguard.guard';
import { checkGuard } from './core/guard/checkpoint/check.guard';

import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';


export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[checkGuard],children:[
        {path:'login',loadComponent:()=>import('./features/auth/login/login.component').then((x)=>x.LoginComponent),title:'login'},

        {path:'signup',loadComponent:()=>import('./features/auth/register/register.component').then((x)=>x.RegisterComponent),title:'signup'},

        {path:'restPassword',loadComponent:()=>import('./features/auth/restPassword/rest-password/rest-password.component').then((x)=>x.RestPasswordComponent),title:'forget Password'}

    ]}
    ,{path:'',component:MainLayoutComponent,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',loadComponent:()=>import('./features/pages/home/home.component').then((x)=>x.HomeComponent),title:'home'},
        {path:'productdetails/:id',loadComponent:()=>import('./features/pages/products-details/products-details.component').then((x)=>x.ProductsDetailsComponent),title:'product details',data: { renderMode: 'server' }},
        {path:'cart',canActivate:[authguardGuard],loadComponent:()=>import('./features/pages/cart/cart.component').then((x)=>x.CartComponent),title:'cart'},
        {path:'categroies',loadComponent:()=>import('./features/pages/categories/categories.component').then((x)=>x.CategoriesComponent),title:'categories'},
        {path:'product',loadComponent:()=>import('./features/pages/products/products.component').then((x)=>x.ProductsComponent),title:'product'},
        {path:'checkout',loadComponent:()=>import('./features/pages/checkout/checkout/checkout.component').then((x)=>x.CheckoutComponent),title:'checkout'},
        {path:'wish',loadComponent:()=>import('./features/pages/wishlist/wishlist/wishlist.component').then((x)=>x.WishlistComponent),title:'wishlist'},
        {path:'allorders',loadComponent:()=>import('./features/pages/allorders/allorders/allorders.component').then((x)=>x.AllordersComponent),title:'allorders'},
        {path:'brands',loadComponent:()=>import('./features/pages/brands/brands.component').then((x)=>x.BrandsComponent),title:'brands'},
        {path:'notFound',loadComponent:()=>import('./features/pages/not-found/not-found.component').then((x)=>x.NotFoundComponent),title:'notfound'}

    ]}
];
