import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IgerilekuGestioaPage } from './igerileku-gestioa.page';

const routes: Routes = [
  {
    path: '',
    component: IgerilekuGestioaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IgerilekuGestioaPageRoutingModule {}
