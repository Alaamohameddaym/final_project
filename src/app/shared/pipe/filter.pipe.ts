import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interface/prouduct/product';

@Pipe({
  name: 'filter',
  standalone:true
})
export class FilterPipe implements PipeTransform {

  transform(products:product[],searchValue:string): product[] {
    return products.filter((product)=>{
      return product.title.includes(searchValue);
    });
  }

}
