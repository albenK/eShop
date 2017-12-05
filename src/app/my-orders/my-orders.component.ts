import { OrderService } from "../order.service";
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth.service";


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$:Observable<any>;
  constructor(private authService:AuthService,private orderService:OrderService) {}


  ngOnInit() {
  
  }

}
