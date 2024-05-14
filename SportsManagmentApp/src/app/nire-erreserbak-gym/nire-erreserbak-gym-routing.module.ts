import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NireErreserbakGymPage } from './nire-erreserbak-gym.page';

const routes: Routes = [
  {
    path: '',
    component: NireErreserbakGymPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NireErreserbakGymPageRoutingModule {}
