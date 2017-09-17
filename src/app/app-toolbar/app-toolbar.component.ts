import {AuthService} from "../auth.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit {
  constructor(public authService:AuthService) { 
  }

  ngOnInit() {}

  logout(){
    this.authService.logout();
  }

}
