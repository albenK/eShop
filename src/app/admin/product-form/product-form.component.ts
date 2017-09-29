import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private categoriesSubscription:Subscription;
  allCategories:any[];
  public newProductForm:FormGroup;
  private formControlsConfig:Object = {
    title:["",Validators.required],
    price:[1,Validators.required],
    category:["",Validators.required],
    imageUrl:["",Validators.required]
  };
  constructor(private formBuilder:FormBuilder,
  private categoryService:CategoryService,private productService:ProductService) {
    this.newProductForm = formBuilder.group(this.formControlsConfig);
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

  addNewProduct(event){
    alert("Need to keep working on this!");
    //this.productService.addNewProductToDatabase();
  }

}
