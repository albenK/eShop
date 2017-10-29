import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  private shoppingCartCollection:string; //refers to path in firebase db.
  constructor(private angularFireDatabase:AngularFireDatabase) {
    this.shoppingCartCollection = "/ShoppingCarts";
  }

  //async means we  HAVE to return a promise
  async getShoppingCartFromDatabase():Promise<Observable<ShoppingCart>> {
    const cartId:string = await this.getOrCreateShoppingCartId();
    return this.angularFireDatabase.object(this.shoppingCartCollection+"/"+cartId)
    .map(cart => new ShoppingCart(cart.Items,cart.dateCreated));
  }

  async addToShoppingCartInDatabase(product:Product):Promise<void> {
    this.updateItemQuantity(product,1);
  }

  async removeOneFromShoppingCartInDatabase(product:Product):Promise<void> {
    this.updateItemQuantity(product,-1);
  }

  async clearShoppingCart():Promise<void> {
    let cartId = await this.getOrCreateShoppingCartId();
    this.angularFireDatabase.object(this.shoppingCartCollection+"/"+cartId+"/Items").remove();
  }

  private createNewShoppingCartInDatabase():firebase.Promise<Object> {
    const newShoppingCart = {dateCreated:new Date().getTime()};
    return this.angularFireDatabase.list(this.shoppingCartCollection).push(newShoppingCart);
  }
  
  //async means we  HAVE to return a promise
  private async getOrCreateShoppingCartId():Promise<string> {
    let shoppingCartId:string = localStorage.getItem("shoppingCartId");
    if(shoppingCartId) return shoppingCartId;
    /*  if there is no shopping cart id in localStorage
        then we want to create one in db and set the id of that to localStorage
    */
    /*we await until this promise is done and get its resolve data.
      Since promises are async operations, await tells it to execute first AND THEN
      run the rest of the code.*/
    let result:Object = await this.createNewShoppingCartInDatabase();
    localStorage.setItem("shoppingCartId",result["key"]);
    return result["key"];
  }

  private getItemReference(cartId:string,productId:string):FirebaseObjectObservable<ShoppingCartItem> {
    return this.angularFireDatabase.object(this.shoppingCartCollection+"/"+cartId+"/Items/"+productId);
  }

  /*async means we return a Promise. We pass in the product that the user wants to
  update the quantity of. addOrRemove can be 1 or -1. 1 means user wants to add one. -1 means 
  remove one.
  */
  private async updateItemQuantity(product:Product,addOrRemove:number):Promise<void> {
    //we await until this promise is done and get the value.
    let cartId:string = await this.getOrCreateShoppingCartId();
    let item$:FirebaseObjectObservable<ShoppingCartItem> = this.getItemReference(cartId,product.$key);
    /* take(1) gets only the first emmited value and unsubscribes. We then update
     the items in the shopping cart*/
    item$.take(1).subscribe((item) => {
      let quantity = (item.quantity || 0) + addOrRemove;
      if(quantity === 0) item$.remove();
      else item$.update({
        title:product.title,
        price:product.price,
        imageUrl:product.imageUrl,
        quantity:quantity
      });
    });
  }

}
