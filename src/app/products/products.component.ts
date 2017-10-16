import {AuthService} from "../auth.service";
import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { Observable } from "rxjs/Observable";
import { CategoryService } from "../category.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProducts$:Observable<Product[]>;
  allCategories$:Observable<any[]>;
  constructor(private productService:ProductService,private categoryService:CategoryService) {
    this.allProducts$ = productService.getAllProductsFromDatabase();
    this.allCategories$ = categoryService.getAllCategoriesFromDatabase();
   }

  ngOnInit() {
  }

}
