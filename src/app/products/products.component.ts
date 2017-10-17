import { Observable } from "rxjs/Observable";
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { CategoryService } from "../category.service";
import { MdSelectChange } from "@angular/material";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProducts$:Observable<Product[]>;
  allCategories$:Observable<any[]>;
  category:string = "all";//represents category user has selected. We use ngModel in HTML.
  constructor(private productService:ProductService,private categoryService:CategoryService) {
    this.allProducts$ = productService.getAllProductsFromDatabase();
    this.allCategories$ = categoryService.getAllCategoriesFromDatabase();
   }

  ngOnInit() {
  }

  onCategoryChange() {
    if(this.category === "all") {
      this.allProducts$ = this.productService.getAllProductsFromDatabase();
      return;
    }
    this.allProducts$ = this.productService.getProductsByCategory(this.category);
  }

}
