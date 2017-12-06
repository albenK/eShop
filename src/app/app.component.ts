import {UserService} from "./shared/services/user.service";
import {AuthService} from "./shared/services/auth.service";
import {OnInit} from "@angular/core";
import * as firebase from "firebase";
import {Router} from "@angular/router";
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService:UserService,private authService:AuthService,private router:Router){}

  ngOnInit(){
    /* if a firebase user exists, then redirect them to url from localStorage.
        AngularFireAuth sign in with redirect Google promise doesn't resolve, so we
        have to do it this way. This is a bit of a hack!
    */
    this.authService.user$.subscribe((firebaseUser:firebase.User) => {
      if(!firebaseUser) return;//if user is not signed in, then dont do anything.
      this.userService.updateUserInfoInDatabase(firebaseUser);
      const redirectUrl:string = localStorage.getItem("redirectUrl");
      if(!redirectUrl) return; //if there is no redirectUrl, then don't do anything.
      localStorage.removeItem("redirectUrl");
      this.router.navigateByUrl(redirectUrl);
    });
  }
}
