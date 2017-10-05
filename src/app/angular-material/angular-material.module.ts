// import  material design modules.
import {MdToolbarModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdTableModule} from '@angular/material';

import { NgModule } from '@angular/core';
/*
    ABOUT ME: the purpose of this module is to have one module that we import into 
    app.module.ts for all of our angular material modules we use throughout this app.
*/
@NgModule({
    imports: [
        MdToolbarModule,
        MdButtonModule,
        MdMenuModule,
        MdInputModule,
        MdSelectModule,
        MdCardModule,
        MdTableModule
    ],
    exports:[
        MdToolbarModule,
        MdButtonModule,
        MdMenuModule,
        MdInputModule,
        MdSelectModule,
        MdCardModule,
        MdTableModule
    ]
  })

  export class AngularMaterialModule { }