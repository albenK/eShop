import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ProductsComponent } from './shopping/components/products/products.component';

import { AppCoreModule } from './core/core.module';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';



const APP_ROUTES:Routes = [
  {path:"",component:ProductsComponent},
  {path:"login",component:LoginComponent},
  {path:"**",redirectTo:"page-not-found"},
  {path:"page-not-found",component:PageNotFoundComponent}
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(APP_ROUTES),
    AppCoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
