import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GimnasioGestioaPageRoutingModule } from './gimnasio-gestioa-routing.module';

import { GimnasioGestioaPage } from './gimnasio-gestioa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GimnasioGestioaPageRoutingModule
  ],
  declarations: [GimnasioGestioaPage]
})
export class GimnasioGestioaPageModule {}
