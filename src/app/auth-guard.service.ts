import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {Router,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";

/* 
  ABOUT ME: The purpose of this class is to prevent a user from accessing a route, if they're
  not signed in.
*/
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthService,private router:Router) { }

/*
  canActivate() method is called automatically by angular if this
  class is within the "canActivate" array property of a route. 
  If this method returns true, then angular will activate that route for the user.
*/ 
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{ 
    return this.authService.appUser$.map((appUser:firebase.User) =>{
      if(appUser) {return true;} //if a firebase user exists, then return true.
      this.router.navigate(["/login"],{queryParams:{redirectUrl:state.url}}); //otherwise route to login with current url and return false.
      return false;
    });
  }

}
