import { Observable } from "rxjs/Observable";
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { CategoryService } from "../category.service";
import { MdSelectChange } from "@angular/material";
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  private productsSubscription:Subscription;
  private allProducts:Product[] = [];//We never want to alter this array!!
  filteredProducts:Product[] = this.allProducts; //used for filtering...
  allCategories$:Observable<any[]>; //we use the async pipe in HTML file.
  isLoading:boolean = true; // to display md-spinner.
  userSelectedCategory:string = "all";//represents category user has selected. We use ngModel in HTML file.
  constructor(private productService:ProductService,private categoryService:CategoryService) {
    this.allCategories$ = categoryService.getAllCategoriesFromDatabase();
  }

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProductsFromDatabase()
    .subscribe((products:Product[]) => {
      this.allProducts = products.slice();
      this.filterProductsBasedOnCategory();
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  filterProductsBasedOnCategory() {
    this.isLoading = true;
    this.filteredProducts = (this.userSelectedCategory === "all")?(this.allProducts)
    :(this.allProducts.filter(eachProduct => eachProduct.category === this.userSelectedCategory));
    this.isLoading = false;
  }

}
