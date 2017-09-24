import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {AppUser} from "./models/app-user";
import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";

/* 
  ABOUT ME: The purpose of this class is to prevent a user that's not an admin 
  from accessing a route. We need this protection for certain routes because
  ONLY admins should be able to access those routes.
*/
@Injectable()
export class AdminAuthGuardService implements CanActivate{
  constructor(private authService:AuthService,private userService:UserService,private router:Router) { }
  /*
    canActivate() method is called automatically by angular if this
    class is within the "canActivate" array property of a route. 
    If this method returns true, then angular will activate that route for the user.
  */ 
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{
    return this.authService.getAppUser$().map((appUser:AppUser) => {
      //this is redundant, but we need to redirect user to home, if they're not an admin.
      if(appUser.isAdmin){
        return appUser.isAdmin;
      }
      this.router.navigate(["/"]);
      return false;
    });
  }

}
