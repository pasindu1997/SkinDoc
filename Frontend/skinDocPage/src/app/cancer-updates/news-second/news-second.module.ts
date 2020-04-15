import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsSecondPageRoutingModule } from './news-second-routing.module';

import { NewsSecondPage } from './news-second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsSecondPageRoutingModule
  ],
  declarations: [NewsSecondPage]
})
export class NewsSecondPageModule {}
