import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {NewProduct} from "../../models/new-product";
import {NgForm} from "@angular/forms";
import { Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
/* 
  ABOUT ME: The purpose of this component is to give an Admin the ability to add a new product
  to the database. We're using Angular's template driven Forms for the product form and
  a third party package called "ng2-validation" for validating. Validation logic is within html.
*/

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private categoriesSubscription:Subscription;
  public allCategories:any[];
  @ViewChild("addProductForm") private addProductForm:NgForm; //refers to reference variable in html
  constructor(private categoryService:CategoryService,private productService:ProductService) {
  }

  ngOnInit() {
    this.categoriesSubscription = this.categoryService.getCategoriesFromDatabase()
    .subscribe((categories:any[]) => {
      this.allCategories = categories;
    });
  }

  ngOnDestroy(){
    this.categoriesSubscription.unsubscribe();
  }

  addNewProduct(event,product:NewProduct){
    event.preventDefault();
    this.productService.addNewProductToDatabase(product).then((returnData) => {
      if(returnData) {
        alert("Successfully added!"); // TODO: add small Dialog here!
        this.resetAddProductForm();
      }
    });
  }

  resetAddProductForm(){
    this.addProductForm.resetForm();
  }
}
