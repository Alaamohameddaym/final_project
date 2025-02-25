import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { CategoriesproductService } from '../../../core/services/categroy product/categoriesproduct.service';
import { product } from '../../../shared/interface/prouduct/product';

@Component({
  selector: 'app-categories',
  standalone:true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  productlist:any[]=[]
  constructor(private show:CategoriesproductService){}
  ngOnInit(): void {
 this.getProducts()
  }

  getProducts() {
    this.show.getAllCategories().subscribe({
      next:(res:any) => {
        this.productlist = res.data;
        console.log(this.productlist)
      },
      error: (err:any) => {
        console.error('Error fetching cart:', err);
      }
    });
  }


}
