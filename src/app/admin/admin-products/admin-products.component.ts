import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import {DataSource} from '@angular/cdk/collections';
import {MdSort} from '@angular/material';
import {MdPaginator} from '@angular/material';
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
  mdTableDisplayedColumns:string[] = ["title","price","edit"]; //for md-table
  mdTableDataSource: MdTableDataSource | null; //for md-table
  @ViewChild("userSearchInput") private userSearchInput:ElementRef;
  @ViewChild(MdSort) sort:MdSort; //refers to md-table thats to be sorted.
  @ViewChild(MdPaginator) paginator:MdPaginator;
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.mdTableDataSource = new MdTableDataSource(this.productService,this.paginator,this.sort);
    this.userSearchSubscription = Observable.fromEvent(this.userSearchInput.nativeElement,"keyup").debounceTime(150)
    .distinctUntilChanged().subscribe(() => {
      if(!this.mdTableDataSource) {return;}
      this.mdTableDataSource.setFilter(this.userSearchInput.nativeElement.value);
    });
  }

  ngOnDestroy(){
    this.userSearchSubscription.unsubscribe(); //prevent memory leaks!
  }

}
/* TODO: Maybe think of a better way to filter. This may be inneficient..???*/

class MdTableDataSource extends DataSource<any> {
  filterChange:BehaviorSubject<string> = new BehaviorSubject("");
  getUserSearch():string {return this.filterChange.value;}
  setFilter(userSearchString:string){ this.filterChange.next(userSearchString);}
  productsSubscription:Subscription;
  public allProducts:Product[] = [];
  constructor(private productService:ProductService,private paginator:MdPaginator,
    private tableSort:MdSort){
    super();
    this.productsSubscription = productService.getAllProductsFromDatabase().subscribe((products) => {
      this.allProducts = products;
    });
  }

  /* connect is called automatically by md-table*/
  connect():Observable<Product[]>{
    const displayDataChanges = [
      this.tableSort.mdSortChange,
      this.paginator.page
    ];
    // this is kind of a hack,but it works for now...
    return Observable.merge(...displayDataChanges).switchMap(() => {
      return this.filterChange.asObservable();
    }).map((userInput:string) => {
        return this.getSortedData().filter((eachProduct:Product) => {
          //user can search by title or price
          const searchString = (eachProduct.title+eachProduct.price).toLowerCase();
          const userSearch = userInput.toLowerCase();
          return searchString.indexOf(userSearch) != -1; //return products whose title or price match userSearch.
      })
    });
    
  }

  disconnect() {
    this.productsSubscription.unsubscribe();
  }

  getSortedData():Product[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const data = this.allProducts.slice();
    if(!this.tableSort.active || this.tableSort.direction == "") return data;
    //sets results per page and sorts it based on title or price.
    return data.splice(startIndex, this.paginator.pageSize).sort((a:Product,b:Product) => {
      let productA:number|string = "";
      let productB:number|string = "";
      //check which heading user clicked on. (Title or Price)?
      switch(this.tableSort.active){ // this.tableSort.active is what user clicked on.
        case "title":[productA,productB] = [a.title,b.title];break;
        case "price":[productA,productB] = [a.price,b.price];break;
        default: 0;
      }

      let valueA = isNaN(+productA) ? productA : +productA;
      let valueB = isNaN(+productB) ? productB : +productB;
      return (valueA < valueB ? -1 : 1) * (this.tableSort.direction == 'asc' ? 1 : -1);
    });
  }

}
