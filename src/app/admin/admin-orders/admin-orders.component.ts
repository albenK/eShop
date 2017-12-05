import { OrderService } from '../../order.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../models/order';
import { Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$:Observable<Order[]>; // we use async pipe in html file.
  constructor(private orderService:OrderService) {
  
  }

  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }
}
