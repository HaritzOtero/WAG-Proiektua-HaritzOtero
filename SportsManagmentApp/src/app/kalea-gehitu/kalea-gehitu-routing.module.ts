import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaleaGehituPage } from './kalea-gehitu.page';

const routes: Routes = [
  {
    path: '',
    component: KaleaGehituPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaleaGehituPageRoutingModule {}
