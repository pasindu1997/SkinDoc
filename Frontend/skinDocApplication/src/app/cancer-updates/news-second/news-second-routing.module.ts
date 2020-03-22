import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsSecondPage } from './news-second.page';

const routes: Routes = [
  {
    path: '',
    component: NewsSecondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsSecondPageRoutingModule {}
