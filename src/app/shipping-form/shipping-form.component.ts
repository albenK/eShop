import { Shipping } from '../shared/models/shipping';
import { Order } from '../shared/models/order';
import { Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy,Input } from '@angular/core';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping:Shipping = {fullName:"",addressLineOne:"",addressLineTwo:"",city:""};
  @Input("shoppingCart") shoppingCart:ShoppingCart;
  private userIdSubscription:Subscription;
  private userId:string; //to know who placed the order.
  constructor(private router:Router,private orderService:OrderService,
  private authService:AuthService) { }

  ngOnInit() {
    this.userIdSubscription =  this.authService.user$.subscribe(firebaseUser => this.userId = firebaseUser.uid);
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }

  placeOrder(event:Event) {
    event.preventDefault();
    let order:Order = new Order(this.userId,this.shipping,this.shoppingCart);
    this.orderService.storeOrderInDatabase(order)
    .then(result => this.router.navigate(["/order-success",result.key]));
  }

}
