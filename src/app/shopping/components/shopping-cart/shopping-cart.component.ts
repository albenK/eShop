import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart$:Observable<ShoppingCart>;
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    this.shoppingCart$ = await this.shoppingCartService.getShoppingCartFromDatabase();
  }

  clearShoppingCart() {
    this.shoppingCartService.clearShoppingCart();
  }
}
