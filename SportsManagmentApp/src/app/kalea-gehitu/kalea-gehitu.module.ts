import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KaleaGehituPageRoutingModule } from './kalea-gehitu-routing.module';

import { KaleaGehituPage } from './kalea-gehitu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KaleaGehituPageRoutingModule
  ],
  declarations: [KaleaGehituPage]
})
export class KaleaGehituPageModule {}
