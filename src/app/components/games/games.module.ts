import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
import { GameSavannahComponent } from './pages/game-savannah/game-savannah.component';

@NgModule({
  declarations: [GamesListComponent, GamesItemComponent, GameSavannahComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    GamesRoutingModule,
  ],
  exports: [GamesListComponent, GamesItemComponent],
})
export class GamesModule {}
