import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category/category.component';
import { HomesliderComponent } from '../homeslider/homeslider/homeslider.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [ProductsComponent,HomesliderComponent,CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
