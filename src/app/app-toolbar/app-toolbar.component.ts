import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";
import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit,OnDestroy {
  appUserSubscription:Subscription;
  appUser:AppUser;
  constructor(public authService:AuthService) { 
  }

  ngOnInit() {
    this.appUserSubscription = this.authService.getAppUser$().subscribe((user:AppUser) => {
      this.appUser = user;
    });
  }
  ngOnDestroy(){
    this.appUserSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }

}
