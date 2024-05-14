import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NireErreserbakPageRoutingModule } from './nire-erreserbak-routing.module';

import { NireErreserbakPage } from './nire-erreserbak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NireErreserbakPageRoutingModule
  ],
  declarations: [NireErreserbakPage]
})
export class NireErreserbakPageModule {}
