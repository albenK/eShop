// import  material design modules.
import {MdToolbarModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdSortModule} from '@angular/material';
import {MdPaginatorModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';

import { NgModule } from '@angular/core';
/*
    ABOUT ME: the purpose of this module is to have one module that we import into 
    app.module.ts for all of our angular material modules we use throughout this app.
*/
@NgModule({
    imports: [
        MdToolbarModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdMenuModule,
        MdInputModule,
        MdSelectModule,
        MdCardModule,
        MdPaginatorModule,
        MdSortModule
    ],
    exports:[
        MdToolbarModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdMenuModule,
        MdInputModule,
        MdSelectModule,
        MdCardModule,
        MdPaginatorModule,
        MdSortModule
    ]
  })

  export class AngularMaterialModule { }