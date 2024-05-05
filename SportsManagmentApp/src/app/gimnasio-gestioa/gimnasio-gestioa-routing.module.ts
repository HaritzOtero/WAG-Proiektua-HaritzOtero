import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GimnasioGestioaPage } from './gimnasio-gestioa.page';

const routes: Routes = [
  {
    path: '',
    component: GimnasioGestioaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GimnasioGestioaPageRoutingModule {}
