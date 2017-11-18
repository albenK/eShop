//AngularFire imports.
import{AngularFireModule} from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {environment} from "../environments/environment.prod";
import {CustomFormsModule} from "ng2-validation";

//Angular imports needed to setup app module.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule,Routes} from "@angular/router";

//import services used by our app.
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {CategoryService} from "./category.service";
import {ProductService} from "./product.service";
import {ShoppingCartService} from "./shopping-cart.service";
import { OrderService } from "./order.service";

//import Route Guards used by our app.
import {AuthGuardService} from "./auth-guard.service";
import {AdminAuthGuardService} from "./admin-auth-guard.service";

//import custom AngularMaterialModule
import {AngularMaterialModule} from "./angular-material/angular-material.module";

//import all components used by our app.
import { AppComponent } from './app.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

//set up our routes.
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
    AdminProductsComponent,
    ProductFormComponent,
    AdminOrdersComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularMaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
