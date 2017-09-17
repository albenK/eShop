import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  appUser$:Observable<firebase.User>;
  constructor(private angularFireAuth:AngularFireAuth) {
    this.appUser$ = angularFireAuth.authState;
   }

  login(){
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.angularFireAuth.auth.signOut();
  }

}
