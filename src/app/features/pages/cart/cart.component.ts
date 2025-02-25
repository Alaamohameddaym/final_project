import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Data, Product } from '../../../shared/interface/procuds cart/products';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems!: Data;
  productlist: Product[] = [];
  
  constructor(private cart: CartService ,private router:Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.cart.getProductFromCart().subscribe({
      next: (res) => {
        this.cartItems = res.data;
      this.cart.cartnumber.next(res.numOfCartItems)

        this.productlist = res.data.products;
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  updateItemCount(id: string, count: number) {
    if (count < 1){
      this.removeItem(id);
    }
    
    this.cart.updateProductFromCart(id, count).subscribe({
      next: (res) => {
        this.cartItems = res.data;
      this.cart.cartnumber.next(res.numOfCartItems)

        this.productlist = res.data.products;
      },
      error: (err) => {
        console.error('Error updating cart:', err);
      }
    });
  }

  removeItem(id: string) {
    this.cart.removeItemFromCart(id).subscribe({
      next: (res) => {
      this.cart.cartnumber.next(res.numOfCartItems)
        this.cartItems = res.data;
        this.productlist = res.data.products;
      },
      
  })
}
clearALL() {
  this.cart.clearAllProdcutInCart().subscribe(() => {
    this.cart.cartnumber.next(0);
    this.router.navigate(['/home']);
  });
}



 
 
}