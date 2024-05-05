import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'gimnasioErreserba',
        loadChildren: () => import('../gimnasio-erreserba/gimnasio-erreserba.module').then(m => m.GimnasioErreserbaPageModule)
      },

      {
        path: 'gimnasioGestioa',
        loadChildren: () => import('../gimnasio-gestioa/gimnasio-gestioa.module').then(m => m.GimnasioGestioaPageModule)
      },

      {
        path: 'igerilekuGestioa',
        loadChildren: () => import('../igerileku-gestioa/igerileku-gestioa.module').then(m => m.IgerilekuGestioaPageModule)
      },

      {
        path: 'kaleAlokairua',
        loadChildren: () => import('../kale-alokairua/kale-alokairua.module').then(m => m.KaleAlokairuaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
