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
  private userSearch:string= "";
  private startAtIndex:number;
  private endAtIndex:number;
  allProducts:Product[] = []; // initial array. We never want to alter this array!!
  filteredProducts:Product[] = this.allProducts; //we will alter filteredProducts for filtering and such!
  @ViewChild("userSearchInput") private userSearchInput:ElementRef;
  @ViewChild(MdPaginator) paginator:MdPaginator;
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProductsFromDatabase().subscribe((products:Product[]) => {
      this.allProducts = products.slice();
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
    //filter based on user search
    const tempProducts:Product[] = this.allProducts.filter((eachProduct:Product) => {
      //user can search by title or price, so we concatenate those.
      const searchString:string = (eachProduct.title+eachProduct.price).toLowerCase();
      return searchString.indexOf(this.userSearch) != -1;
    });
    //set up indeces to grab the correct number of products based on page.
    this.startAtIndex = this.paginator.pageIndex * this.paginator.pageSize;
    this.endAtIndex = this.startAtIndex + (this.paginator.pageSize - 1);
    
    //filter based on indeces..
    this.filteredProducts = tempProducts.filter((eachProduct:Product,index:number) => {
      return index >= this.startAtIndex && index <= this.endAtIndex;
    });
  }

  //---- For sorting based on Title or Price ----
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