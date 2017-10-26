import { ProductService } from "../product.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Product } from "../models/product";
import { Subscription } from "rxjs/Subscription";
import { FilterEvent } from "./models/filter-event";
import { ShoppingCart } from "../models/shopping-cart";
import { Component, OnInit,OnDestroy } from '@angular/core';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  private productsSubscription:Subscription;
  private shoppingCartSubscription:Subscription;
  private allProducts:Product[] = [];//We never want to alter this array!!
  filteredProducts:Product[] = this.allProducts; //used for filtering...
  isLoading:boolean = true; // to display md-spinner.
  shoppingCart:ShoppingCart;
  constructor(private productService:ProductService,private shoppingCartService:ShoppingCartService) {
  }

  async ngOnInit() {
    //we await until we get the shopping cart, THEN get all products.
    this.shoppingCartSubscription = (await this.shoppingCartService.getShoppingCartFromDatabase())
    .subscribe(cart => this.shoppingCart = cart);
    //get all products and filter them.
    this.productsSubscription = this.productService.getAllProductsFromDatabase()
    .subscribe((products:Product[]) => {
      this.allProducts = products.slice();
      const filterEvent:FilterEvent = {filterBy:"categories",valueToFilterBy:"all"};
      this.filterProducts(filterEvent);
    });
  }

  ngOnDestroy() {
    this.shoppingCartSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }

  filterProducts(filterEvent:FilterEvent) {
    this.isLoading = true;
    this.filteredProducts = (filterEvent.valueToFilterBy === "all")?(this.allProducts)
    :(this.allProducts.filter(eachProduct => eachProduct.category === filterEvent.valueToFilterBy));
    this.isLoading = false;
  }
  

}
