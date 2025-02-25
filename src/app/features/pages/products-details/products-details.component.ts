import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProductService } from '../../../core/services/products/product.service';
import { product } from '../../../shared/interface/prouduct/product';

@Component({
  selector: 'app-products-details',
  standalone:true,
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent {
  id:any;
  productdetails!:product;
  constructor(active:ActivatedRoute,private http:ProductService,private cart:CartService,private toster:ToastrService){
    active.params.subscribe(res=>{
      this.id=res['id']
    })
  }
ngOnInit(): void {
  this.getspacificdetails()
  
}
  getspacificdetails(){
    this.http.getSpacificDetails(this.id).subscribe({
      next:(res)=>{
      this.cart.cartnumber.next(res.numOfCartItems)

        this.productdetails=res.data
      }
    })
  }
  
  addProduct(id:string){
 
    this.cart.addProductToCart(id).subscribe({
      next:(res)=>{
      this.cart.cartnumber.next(res.numOfCartItems)
        console.log(res)
        this.toster.success(res.message,'',{
          progressBar:true,
          progressAnimation:'increasing'
        })
      }
    
    })
    }

}
