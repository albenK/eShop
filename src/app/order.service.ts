import * as firebase from "firebase";
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from "./models/order";
import { ShoppingCartService } from "./shopping-cart.service";
import { Injectable } from '@angular/core';

/* 
  ABOUT ME: The purpose of this service is to help us with things that relate to
  a user's order.
*/
@Injectable()
export class OrderService {
  private ordersCollection:string; //refers to firebase database path.
  constructor(private angularFireDatabase:AngularFireDatabase,
  private shoppingCartService:ShoppingCartService) {
    this.ordersCollection = "/Orders";
   }

  storeOrderInDatabase(order:Order):firebase.Promise<any> {
    return this.angularFireDatabase.list(this.ordersCollection).push(order)
    .then((reference) => {
      this.shoppingCartService.clearShoppingCart();
      return reference;
    });
  }

}
