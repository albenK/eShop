import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import { OrderService } from "../shared/services/order.service";
import { AuthService } from "../shared/services/auth.service";
import { Order } from "../shared/models/order";
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
