import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaleAlokairuaPage } from './kale-alokairua.page';

const routes: Routes = [
  {
    path: '',
    component: KaleAlokairuaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaleAlokairuaPageRoutingModule {}
