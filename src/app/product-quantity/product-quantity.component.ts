import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input("product") product:Product|ShoppingCartItem;
  @Input("shoppingCart") shoppingCart:ShoppingCart;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToShoppingCart() {
    this.shoppingCartService.addToShoppingCartInDatabase(this.product);
  }

  removeOneFromShoppingCart() {
    this.shoppingCartService.removeOneFromShoppingCartInDatabase(this.product);
  }

}
