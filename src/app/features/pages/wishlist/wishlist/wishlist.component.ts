import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { WhislistService } from '../../../../core/services/wishlist/whislist.service';
import { Data, Product2 } from '../../../../shared/interface/procuds cart/products';

@Component({
  selector: 'app-wishlist',
  standalone:true,
  imports: [NgFor,NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  cartItems!: Data;
  productlist: any[] = [];
  constructor(private cart:WhislistService ,private cart1:CartService){}

ngOnInit(): void {
  this.getProducts()
  
}
  getProducts() {
    this.cart.showdata().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cartItems = res.data;
        this.productlist = res.data;
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  addProduct(id:string,index: number){
    this.cart1.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.cart1.cartnumber.next(res.numOfCartItems)
        this.removeFromWishlist(id,index)
      }
    
    })
    }


    removeFromWishlist(id: string, index: number) {
      this.cart.removeItemFromCart(id).subscribe({
        next: (res) => {
          // Remove item from local array
          this.productlist.splice(index, 1);
          // Update cart items data
          this.cartItems = res.data;
        },
        error: (err) => {
          console.error('Error removing from wishlist:', err);
        }
      });
    }
  }

