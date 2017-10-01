import {AngularFireDatabase,FirebaseObjectObservable} from "angularfire2/database";
import * as firebase from "firebase";
import {AppUser} from "./models/app-user";
import { Injectable } from '@angular/core';

/* 
  ABOUT ME: The purpose of this class is to provide us with certain functionalities
  that a user can perform. We inject this into the constructor of a component.
*/
@Injectable()
export class UserService {
  private userCollection:string; //represents path to user collection in db.
  constructor(private angularFireDatabase:AngularFireDatabase) {
    this.userCollection = "/Users";
   }

  updateUserInfoInDatabase(user:firebase.User){
    let userInfo:Object = {name:user.displayName,email:user.email};
    this.angularFireDatabase.object(this.userCollection+"/"+user.uid).update(userInfo);
  }

  getUserInfoFromDatabase(userId:string):FirebaseObjectObservable<AppUser>{
    return this.angularFireDatabase.object(this.userCollection+"/"+userId);
  }



}
