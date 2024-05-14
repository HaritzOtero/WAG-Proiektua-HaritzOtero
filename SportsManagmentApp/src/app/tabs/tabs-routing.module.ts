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
        path: 'editGela',
        loadChildren: () => import('../edit-gela/edit-gela.module').then(m => m.EditGelaPageModule)
      },
      {
        path: 'editKalea',
        loadChildren: () => import('../edit-kalea/edit-kalea.module').then(m => m.EditKaleaPageModule)
      },
      {
        path: 'kaleAlokairua',
        loadChildren: () => import('../edit-kalea/edit-kalea.module').then(m => m.EditKaleaPageModule)
      },

      {
        path: 'gelaGehitu',
        loadChildren: () => import('../gela-gehitu/gela-gehitu.module').then(m => m.GelaGehituPageModule)
      },
      
      {
        path: 'kaleaGehitu',
        loadChildren: () => import('../kalea-gehitu/kalea-gehitu.module').then(m => m.KaleaGehituPageModule)
      },

      {
        path: 'nireErreserbak',
        loadChildren: () => import('../nire-erreserbak/nire-erreserbak.module').then(m => m.NireErreserbakPageModule)
      },
      {
        path: 'nireGymErreserbak',
        loadChildren: () => import('../nire-erreserbak-gym/nire-erreserbak-gym.module').then(m => m.NireErreserbakGymPageModule)
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
