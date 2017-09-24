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

  constructor(private angularFireDatabase:AngularFireDatabase) { }

  updateUserInfoInDatabase(user:firebase.User){
    let userInfo:Object = {name:user.displayName,email:user.email};
    this.angularFireDatabase.object("/users/"+user.uid).update(userInfo);
  }

  getUserInfoFromDatabase(userId:string):FirebaseObjectObservable<AppUser>{
    return this.angularFireDatabase.object("/users/"+userId);
  }



}
