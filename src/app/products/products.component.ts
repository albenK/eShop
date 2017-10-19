
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { Subscription } from "rxjs/Subscription";
import { FilterEvent } from "./models/filter-event";
import { Component, OnInit,OnDestroy } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  private productsSubscription:Subscription;
  private allProducts:Product[] = [];//We never want to alter this array!!
  filteredProducts:Product[] = this.allProducts; //used for filtering...
  isLoading:boolean = true; // to display md-spinner.
  
  constructor(private productService:ProductService) {
  }

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProductsFromDatabase()
    .subscribe((products:Product[]) => {
      this.allProducts = products.slice();
      const filterEvent:FilterEvent = {filterBy:"categories",valueToFilterBy:"all"};
      this.filterProducts(filterEvent);
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  filterProducts(filterEvent:FilterEvent) {
    this.isLoading = true;
    this.filteredProducts = (filterEvent.valueToFilterBy === "all")?(this.allProducts)
    :(this.allProducts.filter(eachProduct => eachProduct.category === filterEvent.valueToFilterBy));
    this.isLoading = false;
  }
  

}
