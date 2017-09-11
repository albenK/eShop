import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout(){
    //TODO: implement logout.
    alert("Need to implement log out"); //remove later!
  }

}
