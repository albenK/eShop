import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';


import { SharedModule } from 'shared/shared.module';
import { AngularMaterialModule } from 'shared/angular-material/angular-material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


const ADMIN_ROUTES:Routes = [
  {
    path:"admin/products/new",
    component:ProductFormComponent,
    canActivate:[AuthGuardService,AdminAuthGuardService]
  },
  {
    path:"admin/products/:id",
    component:ProductFormComponent,
    canActivate:[AuthGuardService,AdminAuthGuardService]
  },
  {
    path:"admin/products",
    component:AdminProductsComponent, 
    canActivate:[AuthGuardService,AdminAuthGuardService]
  },
  {
    path:"admin/orders",
    component:AdminOrdersComponent,
    canActivate:[AuthGuardService,AdminAuthGuardService]
  }
];
/* 
  ABOUT ME: The purpose of this module is to hold admin related components
  and admin related services. We can import this module into AppModule.
  Helps with modularizing the app.
*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  providers:[
    AdminAuthGuardService
  ]
})
export class AdminModule { }
