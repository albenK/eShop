import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import { OrderService } from "../order.service";
import { AuthService } from "../auth.service";
import { Order } from "../models/order";
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$:Observable<Order[]>;
  constructor(private authService:AuthService,private orderService:OrderService) {}


  ngOnInit() {
    this.orders$ = this.authService.user$
      .switchMap(firebaseUser => this.orderService.getOrdersByUserId(firebaseUser.uid));
  }

}
