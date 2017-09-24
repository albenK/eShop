import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import * as firebase from "firebase";
import {AppUser} from "./models/app-user";
import {UserService} from "./user.service";
import {Router,ActivatedRoute} from "@angular/router";
import { Injectable } from '@angular/core';
/*
  ABOUT ME: The purpose of this class is so that we have one service that's injected
  into the constructor of a component where we need to login, or logout the user.
*/
@Injectable()
export class AuthService {
  user$:Observable<firebase.User>;
  constructor(private angularFireAuth:AngularFireAuth,private router:Router,private activatedRoute:ActivatedRoute
  ,private userService:UserService) {
    this.user$ = angularFireAuth.authState;
   }

  login(){
    // get the first queryParams key we passed into the url from our AuthGuard class.
    let paramKey = this.activatedRoute.snapshot.queryParamMap.keys[0];
    //get the value of the redirect url from the key. if it's null, then set to home.
    let redirectUrl = this.activatedRoute.snapshot.queryParamMap.get(paramKey) || "/";
    localStorage.setItem("redirectUrl",redirectUrl);
    /* signInWithRedirect() returns a promise, but for some reason
    this promise never resolves, so we cannot do ".then()".
    In app.component.ts we redirect the user based on redirectUrl. */
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.angularFireAuth.auth.signOut().then(() =>{
      this.router.navigate(["/"]); //route user to home page after they logout.
    });
  }

  getAppUser$():Observable<AppUser>{
    return this.user$.switchMap((firebaseUser:firebase.User) => {
      if (firebaseUser) return this.userService.getUserInfoFromDatabase(firebaseUser.uid);
      return Observable.of(null); // if user isn't logged in, return observable of null.
    });
  }

}
