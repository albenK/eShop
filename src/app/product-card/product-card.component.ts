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
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToShoppingCart(product:Product) {
    this.shoppingCartService.addToShoppingCart(product);
  }

}
