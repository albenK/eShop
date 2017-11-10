import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shopping-cart.service';
import { Order } from '../models/order';
import { Shipping } from '../models/shipping';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  shipping:Shipping = {fullName:"",addressLineOne:"",addressLineTwo:"",city:""};
  shoppingCart:ShoppingCart;
  private shoppingCartSubscription:Subscription;
  private userIdSubscription:Subscription;
  private userId:string;
  constructor(private router:Router,private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,private authService:AuthService) { }

  async ngOnInit() {
    let cart = await this.shoppingCartService.getShoppingCartFromDatabase();
    this.shoppingCartSubscription = cart.subscribe(cart => this.shoppingCart = cart);
    this.userIdSubscription =  this.authService.user$.subscribe(firebaseUser => this.userId = firebaseUser.uid);
  }

  ngOnDestroy () {
    this.shoppingCartSubscription.unsubscribe();
    this.userIdSubscription.unsubscribe();
  }
  
  placeOrder(event:Event) {
    event.preventDefault();
    let order:Order = new Order(this.userId,this.shipping,this.shoppingCart);
    this.orderService.storeOrderInDatabase(order)
    .then(result => this.router.navigate(["/order-success",result.key]));
  }

}
