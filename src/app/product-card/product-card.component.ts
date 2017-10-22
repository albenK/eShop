import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Component, Input,OnInit } from '@angular/core';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product:Product;
  @Input("shoppingCart") shoppingCart:any;
  @Input("showActionButtons") showActionButtons:boolean = false;
  
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToShoppingCart(product:Product) {
    this.shoppingCartService.addToShoppingCart(product);
  }
  // for displaying the quantity of items in shopping cart.
  getQuantity():number {
    if(!this.shoppingCart || !this.shoppingCart.Items) return 0;
    let item = this.shoppingCart.Items[this.product.$key];
    return (item)?(item.quantity):(0);
  }

}
