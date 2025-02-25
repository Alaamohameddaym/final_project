import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { deprecate } from 'node:util';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProductService } from '../../../core/services/products/product.service';
import { WhislistService } from '../../../core/services/wishlist/whislist.service';
import { product } from '../../../shared/interface/prouduct/product';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [NgFor,CurrencyPipe,FilterPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  searchValue:string='';
  productlist:product[]=[]
constructor(private http:ProductService,private cart:CartService ,private toster:ToastrService,private wish:WhislistService){}
ngOnInit(): void {
 this.getAllProducts()
  
}

getAllProducts(){
  this.http.getProduct().subscribe({
    next:(res)=>{

      this.productlist=res.data;
      console.log(res.data)
    }
  })
}
addProduct(id:string){
 
this.cart.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log(res)
    this.cart.cartnumber.next(res.numOfCartItems)
    this.toster.success(res.message,'',{
      progressBar:true,
      progressAnimation:'increasing'
    })
  }

})
}


addProducttowish(id:string){
 
  this.wish.getData(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.cart.cartnumber.next(res.numOfCartItems)
      this.toster.success(res.message,'',{
        progressBar:true,
        progressAnimation:'increasing'
      })
    }
  
  })
  }

}
