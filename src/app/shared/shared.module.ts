import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OrderService } from 'shared/services/order.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { CustomFormsModule } from 'ng2-validation';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/* 
  ABOUT ME: The purpose of this module is to hold shared components,
  shared services and shared modules so that we can import this module 
  into other modules that need these components, services and modules. 
  Helps with modularizing the app.
*/
@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AngularMaterialModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers:[
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  exports:[
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AngularMaterialModule,
    ProductCardComponent,
    ProductQuantityComponent
  ]
})
export class SharedModule { }
