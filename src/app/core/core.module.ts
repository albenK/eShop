import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from '../shopping/components/products/products.component';

import { AngularMaterialModule } from 'shared/angular-material/angular-material.module';

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
    CommonModule,
    RouterModule.forChild([]),
    AngularMaterialModule
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
