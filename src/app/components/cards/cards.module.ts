import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CardsListComponent } from './cards-list/cards-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CardsTabComponent } from './cards-tab/cards-tab.component';
import { CardItemComponent } from './card-item/card-item.component';

@NgModule({
  declarations: [CardsListComponent, CardsTabComponent, CardItemComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
})
export class CardsModule {}
