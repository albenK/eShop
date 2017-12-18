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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* 
  ABOUT ME: The purpose of this module is to hold shared components
  and shared services so that we can import this module into other modules
  that need these components and services. Helps with modularizing the app.
*/
@NgModule({
  imports: [
    CommonModule,
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
    ProductCardComponent,
    ProductQuantityComponent,
    AngularMaterialModule
  ],
})
export class SharedModule { }
