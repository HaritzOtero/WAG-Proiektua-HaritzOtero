import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGelaPageRoutingModule } from './edit-gela-routing.module';

import { EditGelaPage } from './edit-gela.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGelaPageRoutingModule
  ],
  declarations: [EditGelaPage]
})
export class EditGelaPageModule {}
