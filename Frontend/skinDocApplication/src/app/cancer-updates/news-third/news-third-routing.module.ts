import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsThirdPage } from './news-third.page';

const routes: Routes = [
  {
    path: '',
    component: NewsThirdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsThirdPageRoutingModule {}
