import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Component, Input,OnInit } from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product:Product;
  @Input("shoppingCart") shoppingCart:ShoppingCart;
  @Input("showActionButtons") showActionButtons:boolean = false;
  isHoveredOverCard:boolean = false;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToShoppingCart() {
    this.shoppingCartService.addToShoppingCartInDatabase(this.product);
  }


}
