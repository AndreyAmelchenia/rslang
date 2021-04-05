import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
import { GameSavannahModule } from './modules/game-savannah/game-savannah.module';
import { GameSavannahService } from './modules/game-savannah/services/game-savannah.service';

@NgModule({
  declarations: [GamesListComponent, GamesItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    GamesRoutingModule,
    GameSavannahModule,
  ],
  exports: [GamesListComponent, GamesItemComponent],
  providers: [GameSavannahService],
})
export class GamesModule {}
