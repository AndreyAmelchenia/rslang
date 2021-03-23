import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CardsListComponent } from './cards-list/cards-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CardsListComponent],
  imports: [CommonModule, SharedModule, MatCardModule, FormsModule],
  exports: [CardsListComponent],
})
export class CardsModule {}
