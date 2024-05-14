import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NireErreserbakGymPageRoutingModule } from './nire-erreserbak-gym-routing.module';

import { NireErreserbakGymPage } from './nire-erreserbak-gym.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NireErreserbakGymPageRoutingModule
  ],
  declarations: [NireErreserbakGymPage]
})
export class NireErreserbakGymPageModule {}
