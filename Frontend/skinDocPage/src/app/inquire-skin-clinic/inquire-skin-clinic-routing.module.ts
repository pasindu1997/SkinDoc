import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquireSkinClinicPage } from './inquire-skin-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: InquireSkinClinicPage
  },  {
    path: 'rates',
    loadChildren: () => import('./rates/rates.module').then( m => m.RatesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquireSkinClinicPageRoutingModule {}
