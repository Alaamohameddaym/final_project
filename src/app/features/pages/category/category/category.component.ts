import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../core/services/category/category.service';
import { category } from '../../../../shared/interface/category';

@Component({
  selector: 'app-category',
  standalone:true,
  imports: [NgFor,CarouselModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
constructor(private category:CategoryService){}
list:category[]=[]

ngOnInit(): void {
  this.getcategories()
  
}
getcategories(){
  this.category.getAllCategory().subscribe({
    next:(res)=>{
      this.list=res.data
    }
  })
}


customOptions: OwlOptions = {
  rtl:true,
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
}
