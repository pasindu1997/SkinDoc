  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancerUpdatesPage } from './cancer-updates.page';

const routes: Routes = [
  {
    path: '',
    component: CancerUpdatesPage
  },
  {
    path: 'news-single',
    loadChildren: () => import('./news-single/news-single.module').then( m => m.NewsSinglePageModule)
  },
  {
    path: 'news-second',
    loadChildren: () => import('./news-second/news-second.module').then( m => m.NewsSecondPageModule)
  },
  {
    path: 'news-third',
    loadChildren: () => import('./news-third/news-third.module').then( m => m.NewsThirdPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancerUpdatesPageRoutingModule {}
