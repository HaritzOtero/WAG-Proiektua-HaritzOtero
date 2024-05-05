import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KaleAlokairuaPageRoutingModule } from './kale-alokairua-routing.module';

import { KaleAlokairuaPage } from './kale-alokairua.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KaleAlokairuaPageRoutingModule
  ],
  declarations: [KaleAlokairuaPage]
})
export class KaleAlokairuaPageModule {}
