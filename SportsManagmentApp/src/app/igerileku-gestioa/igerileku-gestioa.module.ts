import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IgerilekuGestioaPageRoutingModule } from './igerileku-gestioa-routing.module';

import { IgerilekuGestioaPage } from './igerileku-gestioa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IgerilekuGestioaPageRoutingModule
  ],
  declarations: [IgerilekuGestioaPage]
})
export class IgerilekuGestioaPageModule {}
