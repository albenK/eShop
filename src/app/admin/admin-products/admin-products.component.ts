import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {Sort} from "@angular/material";
import {MdPaginator} from '@angular/material';
import {PageEvent} from "@angular/material";
import {Product} from "../../models/product";
import {ProductService} from "../../product.service";
import { Component, ViewChild,ElementRef,OnInit,OnDestroy } from '@angular/core';
/* 
  ABOUT ME: The purpose of this component is to allow an admin to view all of
  the products within the database and enable them to edit any of them.
*/
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private userSearchSubscription:Subscription;
  private productsSubscription:Subscription;
  private initialPageEvent:PageEvent = {length:0,pageIndex:0,pageSize:5};
  allProducts:Product[] = []; // initial array. We never want to alter this array!!
  filteredProducts:Product[] = this.allProducts; //we will alter filteredProducts for filtering and such!
  @ViewChild("userSearchInput") private userSearchInput:ElementRef;
  @ViewChild(MdPaginator) paginator:MdPaginator;
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProductsFromDatabase().subscribe((products:Product[]) => {
      this.allProducts = products.slice();
      this.filteredProducts = products.slice();
      this.initialPageEvent.length = this.allProducts.length;
      this.filterBasedOnPage(this.initialPageEvent);
    });

    this.userSearchSubscription = Observable.fromEvent(this.userSearchInput.nativeElement,"keyup")
    .distinctUntilChanged().debounceTime(150).subscribe((event:KeyboardEvent) => {
      const userSearch:string = this.userSearchInput.nativeElement.value.toLowerCase();
      if(userSearch != "") this.filterBasedOnSearch(userSearch);
      else this.filterBasedOnPage(this.initialPageEvent);
    });
  }

  ngOnDestroy(){
    //prevent memory leaks!
    this.productsSubscription.unsubscribe();
    this.userSearchSubscription.unsubscribe(); 
  }

  //---- For product search ----
  private filterBasedOnSearch(userInput:string) {
    this.filteredProducts = this.allProducts;
    const tempProducts:Product[] = this.filteredProducts;
    this.filteredProducts = tempProducts.filter((eachProduct:Product) => {
      const searchString:string = (eachProduct.title+eachProduct.price).toLowerCase();
      return searchString.indexOf(userInput) != -1;
    });
  }

  //---- For pagination interaction ----
  filterBasedOnPage(pageEvent:PageEvent) {
    this.filteredProducts = this.allProducts;
    const startAtIndex = pageEvent.pageSize * pageEvent.pageIndex;
    const endAtIndex = startAtIndex + (pageEvent.pageSize - 1);
    this.filteredProducts = this.filteredProducts.filter((eachProduct:Product,index:number) => {
      return index >= startAtIndex && index <= endAtIndex;
    });
  }

  //---- For sorting interaction ----
  sortData(sort:Sort){
    const data:Product[] = this.filteredProducts;
    if(!sort.active || sort.direction == ""){
      //this.filteredProducts = data;
      return;
    }
    this.filteredProducts = data.sort((a:Product,b:Product) => {
      let isAsc:boolean = sort.direction == "asc";
      switch(sort.active){
        case "title": return this.compare(a.title,b.title,isAsc);
        case "price": return this.compare(a.price,b.price,isAsc);
        default:return 0;
      }
    });
  }

  private compare(productA:string|number,productB:string|number,isAsc:boolean):number {
    return (productA < productB ? -1 : 1) * (isAsc ? 1 : -1);
  }
}