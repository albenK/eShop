import {AngularFireDatabase} from "angularfire2/database";
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private productsCollection:string; // this refers to firebase database path.
  constructor(private angularFireDatabase:AngularFireDatabase) {
    this.productsCollection = "/Products";
   }

  addNewProductToDatabase(){
    //this.angularFireDatabase.list(this.productsCollection);

  }

}
