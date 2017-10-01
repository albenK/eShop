// import  material design modules.
import {MdSidenavModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdCardModule} from '@angular/material';

import { NgModule } from '@angular/core';
/*
    ABOUT ME: the purpose of this module is to have one module that we import into 
    app.module.ts for all of our angular material modules we use throughout this app.
*/
@NgModule({
    imports: [
        MdSidenavModule,
        MdToolbarModule,
        MdButtonModule,
        MdMenuModule,
        MdInputModule,
        MdSelectModule,
        MdCardModule
    ],
    exports:[
        MdSidenavModule,
        MdToolbarModule,
        MdButtonModule,
        MdMenuModule,
        MdInputModule,
        MdSelectModule,
        MdCardModule
    ]
  })

  export class AngularMaterialModule { }