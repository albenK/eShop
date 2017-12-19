import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import { OrderService } from "shared/services/order.service";
import { AuthService } from "shared/services/auth.service";
import { Order } from "shared/models/order";
import { Component, OnInit, OnDestroy } from '@angular/core';




@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {
  private ordersSubscription:Subscription;
  orders:Order[] = [];
  constructor(private authService:AuthService,private orderService:OrderService) {}


  ngOnInit() {
    this.ordersSubscription = this.authService.user$
      .switchMap(firebaseUser => {
        return (firebaseUser)?(this.orderService.getOrdersByUserId(firebaseUser.uid))
          :(Observable.of([]));
      }).subscribe(orders => this.orders = orders);
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }

}
