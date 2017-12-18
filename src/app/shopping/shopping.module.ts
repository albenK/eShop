import { ProductsComponent } from './components/products/products.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

import { SharedModule } from 'shared/shared.module';
import { AngularMaterialModule } from 'shared/angular-material/angular-material.module';

import { AuthGuardService } from 'shared/services/auth-guard.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';




const SHOPPING_ROUTES:Routes = [
  {path:"products",component:ProductsComponent},
  {path:"shopping-cart",component:ShoppingCartComponent},
  {path:"my/orders",component:MyOrdersComponent, canActivate:[AuthGuardService]},
  {path:"check-out",component:CheckOutComponent, canActivate:[AuthGuardService]},
  {path:"order-success/:id",component:OrderSuccessComponent,canActivate:[AuthGuardService]},
];
/* 
  ABOUT ME: The purpose of this module is to hold shopping related components
  and shopping related services. We can import this module into AppModule.
  Helps with modularizing the app.
*/
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(SHOPPING_ROUTES)
  ],
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { }
