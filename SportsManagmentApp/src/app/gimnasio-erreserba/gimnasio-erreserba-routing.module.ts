import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GimnasioErreserbaPage } from './gimnasio-erreserba.page';

const routes: Routes = [
  {
    path: '',
    component: GimnasioErreserbaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GimnasioErreserbaPageRoutingModule {}
