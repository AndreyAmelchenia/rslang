import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { CardsListComponent } from './cards-list/cards-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CardsListComponent],
  imports: [CommonModule, SharedModule, SwiperModule],
  exports: [CardsListComponent, SharedModule],
})
export class CardsModule {}
