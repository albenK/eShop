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
  @Input("showActionButtons") showActionButtons:boolean = false;
  @Input("shoppingCart") shoppingCart;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToShoppingCart(product:Product) {
    this.shoppingCartService.addToShoppingCart(product);
  }

  getQuantityOfItemInShoppingCart():number {
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.Items[this.product.$key];
    return (item)?(item.quantity):(0);
  }

}
