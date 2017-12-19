import {Subscription} from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import {AuthService} from "shared/services/auth.service";
import {AppUser} from "shared/models/app-user";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { ShoppingCart } from "shared/models/shopping-cart";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit,OnDestroy {
  private appUserSubscription:Subscription;
  appUser:AppUser;
  shoppingCart$:Observable<ShoppingCart>;
  authStatusDisplay:string; // if signed in, then equal to Log out, otherwise Login
  constructor(private router:Router,private authService:AuthService,private shoppingCartService:ShoppingCartService) { 
  }

  async ngOnInit() {
    const LOGIN:string = "Login";
    const LOGOUT:string = "Logout";
    this.shoppingCart$ = await this.shoppingCartService.getShoppingCartFromDatabase();
    this.appUserSubscription = this.authService.getAppUser$().subscribe((user:AppUser) => {
      this.appUser = user;
      this.authStatusDisplay = (this.appUser)?(LOGOUT):(LOGIN);
    });
  }

  /*we dont need to unsubscribe because we only have a single instance of our toolbar,
    but it's good practice...*/
  ngOnDestroy(){
    this.appUserSubscription.unsubscribe();
  }

  changeAuthState() {
    if(this.appUser) { //if user is signed in already.
      this.authService.logout();
      return;
    }
    this.router.navigate(["/login"]);
  }

}
