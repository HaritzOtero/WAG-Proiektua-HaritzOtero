import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NireErreserbakPage } from './nire-erreserbak.page';

const routes: Routes = [
  {
    path: '',
    component: NireErreserbakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NireErreserbakPageRoutingModule {}
