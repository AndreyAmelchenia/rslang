import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CardsTabComponent } from './cards-tab/cards-tab.component';

@NgModule({
  declarations: [CardsListComponent, CardsTabComponent],
  imports: [CommonModule, SharedModule],
})
export class CardsModule {}
