import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicRatePageRoutingModule } from './clinic-rate-routing.module';

import { ClinicRatePage } from './clinic-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicRatePageRoutingModule
  ],
  declarations: [ClinicRatePage]
})
export class ClinicRatePageModule {}
