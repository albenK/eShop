import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../../shared/models/order';
import { Component,OnInit, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {
  private ordersSubscription:Subscription;
  orders:Order[] = [];
  constructor(private orderService:OrderService) {
  
  }

  ngOnInit() {
    this.ordersSubscription = this.orderService.getAllOrders()
      .subscribe(allOrders => this.orders = allOrders);
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
}
