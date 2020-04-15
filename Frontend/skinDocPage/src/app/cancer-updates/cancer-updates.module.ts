import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancerUpdatesPageRoutingModule } from './cancer-updates-routing.module';

import { CancerUpdatesPage } from './cancer-updates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancerUpdatesPageRoutingModule
  ],
  declarations: [CancerUpdatesPage]
})
export class CancerUpdatesPageModule {}
