import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  shoppingCart:ShoppingCart;
  private shoppingCartSubscription:Subscription;
  
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getShoppingCartFromDatabase();
    this.shoppingCartSubscription = cart$.subscribe(cart => this.shoppingCart = cart);
  }

  ngOnDestroy () {
    this.shoppingCartSubscription.unsubscribe();
  }

}
