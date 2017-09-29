import {AngularFireDatabase,FirebaseListObservable} from "angularfire2/database";
import { Injectable } from '@angular/core';


@Injectable()
export class CategoryService {
  private categoryCollection:string;
  constructor(private angularFireDatabase:AngularFireDatabase) {
    this.categoryCollection = "/Categories/";
   }

  getCategoriesFromDatabase():FirebaseListObservable<any[]> {
    return this.angularFireDatabase.list(this.categoryCollection,{
      query:{ // this is just to sort the names alphabetically.
        orderByChild:"name"
      }
    });
  }
}
