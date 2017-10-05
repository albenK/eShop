import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
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
  private userSearchObservable:Subscription;
  public allProducts:Product[];
  mdTableDisplayedColumns:string[] = ["title","price"]; //for md-table
  mdTableDataSource: MdTableDataSource | null; //for md-table
  @ViewChild("userSearch") private userSearch:ElementRef;
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.mdTableDataSource = new MdTableDataSource(this.productService);
    this.userSearchObservable = Observable.fromEvent(this.userSearch.nativeElement,"keyup").debounceTime(150)
    .distinctUntilChanged().subscribe(() => {
      if(!this.mdTableDataSource) {return;}
      this.mdTableDataSource.setFilter(this.userSearch.nativeElement.value);
    });
  }

  ngOnDestroy(){
    this.userSearchObservable.unsubscribe(); //prevent memory leaks!
  }

}
/* TODO: Maybe think of a better way to filter. This may be inneficient..???*/

class MdTableDataSource extends DataSource<any> {
  filterChange:BehaviorSubject<string> = new BehaviorSubject("");
  getUserSearch():string {return this.filterChange.value;}
  setFilter(newFilter:string){ this.filterChange.next(newFilter);}
  constructor(private productService:ProductService){
    super();
  }

  /* connect is called automatically by md-table*/
  connect():Observable<Product[]>{
    return this.filterChange.asObservable().switchMap(() => {
      return this.productService.getAllProductsFromDatabase().map((products:Product[]) => {
        return products.slice().filter((eachProduct:Product) => {
          let searchString:string = (eachProduct.title+eachProduct.price).toLowerCase(); //user can search by title or price
          let userSearch = this.getUserSearch().toLowerCase();
          return searchString.indexOf(userSearch) != -1; // return items that have title or the price 
        });
      });
    });
  }

  disconnect() {}
}
