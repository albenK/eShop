import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";
import { Component, OnInit, OnDestroy} from '@angular/core';



@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit,OnDestroy {
  private appUserSubscription:Subscription;
  private shoppingCartSubscription:Subscription;
  appUser:AppUser;
  totalNumberOfItemsInShoppingCart:number = 0;
  constructor(private authService:AuthService,private shoppingCartService:ShoppingCartService) { 
  }

  async ngOnInit() {
    this.appUserSubscription = this.authService.getAppUser$().subscribe((user:AppUser) => {
      this.appUser = user;
    });

    const shoppingCart$ = await this.shoppingCartService.getShoppingCartFromDatabase();
    this.shoppingCartSubscription = shoppingCart$.subscribe((cart:ShoppingCart) => {
      this.totalNumberOfItemsInShoppingCart = 0;
      for(let eachProductId in cart.Items) 
        this.totalNumberOfItemsInShoppingCart += cart.Items[eachProductId].quantity;
    });
  }

  /*we dont need to unsubscribe because we only have a single instance of our toolbar,
    but it's good practice...*/
  ngOnDestroy(){
    this.appUserSubscription.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }

}
