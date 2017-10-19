import { Product } from '../models/product';
import { Component, Input,OnInit } from '@angular/core';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product:Product;
  @Input("addToCartDisabled") addToCartDisabled:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
