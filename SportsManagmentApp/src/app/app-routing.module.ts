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
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
