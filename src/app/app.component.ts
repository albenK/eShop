import {AuthService} from "./auth.service";
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
  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(){
    // if a firebase user exists, then redirect them to url from localStorage.
    this.authService.appUser$.subscribe((appUser:firebase.User) => {
      if(appUser){
         let redirectUrl = localStorage.getItem("redirectUrl");
         this.router.navigateByUrl(redirectUrl);
      }
    });
  }
}
