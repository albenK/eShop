import * as firebase from "firebase";
import {AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from "angularfire2/database";
import {Product} from "./models/product";
import { FirebaseListFactoryOpts } from "angularfire2/database/interfaces";
import { Injectable } from '@angular/core';


@Injectable()
export class ProductService {
  private productsCollection:string; // this refers to firebase database path.
  constructor(private angularFireDatabase:AngularFireDatabase) {
    this.productsCollection = "/Products";
   }

  addNewProductToDatabase(product:Product):firebase.Promise<void> {
    return this.angularFireDatabase.list(this.productsCollection+"/").push(product);
  }

  getAllProductsFromDatabase():FirebaseListObservable<Product[]> {
    return this.angularFireDatabase.list(this.productsCollection);
  }

  getProductByIdFromDatabase(productId:string):FirebaseObjectObservable<Product> {
    return this.angularFireDatabase.object(this.productsCollection+"/"+productId);
  }

  // getProductsByCategory(categoryKey:string):FirebaseListObservable<Product[]> {
  //   const theQuery:FirebaseListFactoryOpts = {query:{orderByChild:"category",equalTo:categoryKey}};
  //   return this.angularFireDatabase.list(this.productsCollection+"/",theQuery);
  // }

  updateProductInDatabase(productId:string,updatedProduct:Product):firebase.Promise<void> {
    return this.angularFireDatabase.object(this.productsCollection+"/"+productId).update(updatedProduct);
  }

  deleteProductInDatabase(productId:string):firebase.Promise<void>{
    return this.angularFireDatabase.object(this.productsCollection+"/"+productId).remove();
  }


}
