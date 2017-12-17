import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment.prod';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from 'app/admin/admin.module';

const routes:Routes = [
  {path:"",component:ProductsComponent},
  {path:"products",component:ProductsComponent},
  {path:"shopping-cart",component:ShoppingCartComponent},
  {path:"login",component:LoginComponent},

  {path:"my/orders",component:MyOrdersComponent, canActivate:[AuthGuardService]},
  {path:"check-out",component:CheckOutComponent, canActivate:[AuthGuardService]},
  {path:"order-success/:id",component:OrderSuccessComponent,canActivate:[AuthGuardService]},

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
  },
  
  {path:"**",redirectTo:"page-not-found"},
  {path:"page-not-found",component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AppToolbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    AdminModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
