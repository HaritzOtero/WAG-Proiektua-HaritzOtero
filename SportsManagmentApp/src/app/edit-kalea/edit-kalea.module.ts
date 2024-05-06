import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditKaleaPageRoutingModule } from './edit-kalea-routing.module';

import { EditKaleaPage } from './edit-kalea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditKaleaPageRoutingModule
  ],
  declarations: [EditKaleaPage]
})
export class EditKaleaPageModule {}
