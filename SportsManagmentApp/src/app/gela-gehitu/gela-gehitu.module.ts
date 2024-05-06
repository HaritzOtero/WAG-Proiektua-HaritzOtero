import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GelaGehituPageRoutingModule } from './gela-gehitu-routing.module';

import { GelaGehituPage } from './gela-gehitu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GelaGehituPageRoutingModule
  ],
  declarations: [GelaGehituPage]
})
export class GelaGehituPageModule {}
