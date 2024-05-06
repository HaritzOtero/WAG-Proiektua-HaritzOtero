import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGelaPage } from './edit-gela.page';

const routes: Routes = [
  {
    path: '',
    component: EditGelaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGelaPageRoutingModule {}
