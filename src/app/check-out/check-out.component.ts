import { CheckOutForm } from './models/check-out-form';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  checkOutForm:CheckOutForm = {fullName:"",addressLineOne:"",addressLineTwo:"",city:""};
  constructor() { }

  ngOnInit() {
  }

  placeOrder(event:Event) {
  event.preventDefault();
  console.log(this.checkOutForm);
  }

}
