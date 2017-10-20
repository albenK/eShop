import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/take';
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {Product} from "../../models/product";
import {NgForm} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";
import { Component, OnInit,ViewChild} from '@angular/core';
/* 
  ABOUT ME: The purpose of this component is to give an Admin the ability to add/edit a product
  in the database. We're using Angular's template driven Forms for the product form and
  a third party package called "ng2-validation" for validating. Validation logic is within the
  html file.
*/

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public idFromUrl:string; // product id from the url.
  public categories$:Observable<any[]>; // we use the aysnc pipe in html file to unwrap this observable.
  public submitButtonDisplay:string; // if user is editing product, we change this.
  public formDisplayName:string;
  public product:Product = {$key:"",title:"",price:null,category:"",imageUrl:""};
  @ViewChild("addProductForm") private addProductForm:NgForm; //refers to reference variable in html
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
  private categoryService:CategoryService,private productService:ProductService) {
    this.formDisplayName = "Add Product";
    this.submitButtonDisplay = "Add Product";
  }
  
  ngOnInit() {
    this.checkIfEditingOrAddingProduct();
    this.categories$ = this.categoryService.getAllCategoriesFromDatabase();
  }

  checkIfEditingOrAddingProduct() {
    this.idFromUrl = this.activatedRoute.snapshot.paramMap.get("id"); //get id param from url
    if(this.idFromUrl){ 
      //take(1) only gets the first value emmited, then automatically unsubscribes!
      this.productService.getProductByIdFromDatabase(this.idFromUrl).take(1).subscribe((product:Product) => {
        this.product = product;
        this.formDisplayName = "Edit Product";
        this.submitButtonDisplay = "Confirm";
      });
    } 
  }

  onSubmit(event,product:Product){
    event.preventDefault();
    // if idFromUrl exists, then we know user is trying to edit product.
    if(this.idFromUrl) this.productService.updateProductInDatabase(this.idFromUrl,product);
    else this.productService.addNewProductToDatabase(product);
    this.router.navigate(["/admin/products"]);
  }

  resetAddProductForm(){ //resets all form controls!
    this.addProductForm.resetForm();
  }

  deleteProduct(){
    if(!confirm("Are you sure you want to delete this product?")) return;
    //TODO: implement Angular-Materia; modal here!!
    this.productService.deleteProductInDatabase(this.idFromUrl);
    this.router.navigate(["/admin/products"]);
  }
}
