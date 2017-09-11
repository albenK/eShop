import { NgModule } from '@angular/core';

// import  material design modules.
import {MdSidenavModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
/*
    ABOUT ME: the purpose of this module is to have one module that we import into 
    app.module.ts for all of our angular material modules we use throughout this app.
*/
@NgModule({
    imports: [
        MdSidenavModule,
        MdToolbarModule,
        MdButtonModule,
        MdMenuModule
    ],
    exports:[
        MdSidenavModule,
        MdToolbarModule,
        MdButtonModule,
        MdMenuModule
    ]
  })

  export class AngularMaterialModule { }