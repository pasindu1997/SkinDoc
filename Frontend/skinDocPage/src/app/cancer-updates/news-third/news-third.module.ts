import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsThirdPageRoutingModule } from './news-third-routing.module';

import { NewsThirdPage } from './news-third.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsThirdPageRoutingModule
  ],
  declarations: [NewsThirdPage]
})
export class NewsThirdPageModule {}
