import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from '../shopping/components/products/products.component';

import { SharedModule } from 'shared/shared.module';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


/* 
  ABOUT ME: The purpose of this module is to hold the core components of this app.
  Core components for example are, AppToolbarComponent,LoginComponent,etc..
  We import this module into AppModule. Helps with modularizing the app.
*/
@NgModule({
  imports: [
    RouterModule.forChild([]),
    SharedModule
  ],
  declarations: [
    AppToolbarComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  exports:[
    AppToolbarComponent
  ]
})
export class AppCoreModule { }
