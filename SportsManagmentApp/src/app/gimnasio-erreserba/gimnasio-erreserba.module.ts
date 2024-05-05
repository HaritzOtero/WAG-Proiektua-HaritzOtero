import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GimnasioErreserbaPageRoutingModule } from './gimnasio-erreserba-routing.module';

import { GimnasioErreserbaPage } from './gimnasio-erreserba.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GimnasioErreserbaPageRoutingModule
  ],
  declarations: [GimnasioErreserbaPage]
})
export class GimnasioErreserbaPageModule {}
