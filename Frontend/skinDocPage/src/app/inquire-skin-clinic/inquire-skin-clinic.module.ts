import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquireSkinClinicPageRoutingModule } from './inquire-skin-clinic-routing.module';

import { InquireSkinClinicPage } from './inquire-skin-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquireSkinClinicPageRoutingModule
  ],
  declarations: [InquireSkinClinicPage]
})
export class InquireSkinClinicPageModule {}
