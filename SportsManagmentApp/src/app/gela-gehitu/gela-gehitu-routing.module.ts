import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GelaGehituPage } from './gela-gehitu.page';

const routes: Routes = [
  {
    path: '',
    component: GelaGehituPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GelaGehituPageRoutingModule {}
