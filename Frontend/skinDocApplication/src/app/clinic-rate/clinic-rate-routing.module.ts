import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicRatePage } from './clinic-rate.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicRatePage
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicRatePageRoutingModule {}
