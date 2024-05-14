import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'edit-gela',
    loadChildren: () => import('./edit-gela/edit-gela.module').then( m => m.EditGelaPageModule)
  },
  {
    path: 'edit-kalea',
    loadChildren: () => import('./edit-kalea/edit-kalea.module').then( m => m.EditKaleaPageModule)
  },  {
    path: 'kalea-gehitu',
    loadChildren: () => import('./kalea-gehitu/kalea-gehitu.module').then( m => m.KaleaGehituPageModule)
  },
  {
    path: 'nire-erreserbak',
    loadChildren: () => import('./nire-erreserbak/nire-erreserbak.module').then( m => m.NireErreserbakPageModule)
  },
  {
    path: 'nire-erreserbak-gym',
    loadChildren: () => import('./nire-erreserbak-gym/nire-erreserbak-gym.module').then( m => m.NireErreserbakGymPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
