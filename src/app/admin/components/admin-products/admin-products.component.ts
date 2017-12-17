import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {Sort} from "@angular/material";
import {MdPaginator} from '@angular/material';
import {PageEvent} from "@angular/material";
import {Product} from "../../../shared/models/product";
import {ProductService} from "../../../shared/services/product.service";
import { ProductsFilterHelper } from "../../../shared/services/products-filter-helper";
import { Component, ViewChild,ElementRef,OnInit,OnDestroy } from '@angular/core';

/* 
  ABOUT ME: The purpose of this component is to allow an admin to create a product and
  view all of the products within the database and enable them to edit any of them.
*/
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private userSearchSubscription:Subscription;
  private productsSubscription:Subscription;
  private userSearch:string= "";
  private startAtIndex:number;
  private endAtIndex:number;
  private productsFilterHelper:ProductsFilterHelper;
  allProducts:Product[] = []; // initial array. We never want to alter this array!!
  filteredProducts:Product[] = this.allProducts; //we will alter filteredProducts for filtering and such!
  @ViewChild("userSearchInput") private userSearchInput:ElementRef;
  @ViewChild(MdPaginator) paginator:MdPaginator;
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productsFilterHelper = new ProductsFilterHelper(this.paginator);
    this.productsSubscription = this.productService.getAllProductsFromDatabase().subscribe((products:Product[]) => {
      this.allProducts = products.slice();
      this.productsFilterHelper.initializeAllProducts(this.allProducts);
      this.filterProducts();
    });

    this.userSearchSubscription = Observable.fromEvent(this.userSearchInput.nativeElement,"keyup")
    .distinctUntilChanged().debounceTime(150).subscribe((event:KeyboardEvent) => {
      this.userSearch = this.userSearchInput.nativeElement.value.toLowerCase();
      this.filterProducts();
    });
  }

  ngOnDestroy(){
    //prevent memory leaks!
    this.productsSubscription.unsubscribe();
    this.userSearchSubscription.unsubscribe(); 
  }

  filterProducts() {
    this.filteredProducts = this.productsFilterHelper.getFilteredProducts(this.userSearch);
  }

  //---- For sorting based on Title or Price ----
  sortData(sort:Sort){
    if(!sort.active || sort.direction == "") return;
    const data:Product[] = this.filteredProducts;
    this.filteredProducts = this.productsFilterHelper.getSortedProducts(sort,data);
  }

  
}