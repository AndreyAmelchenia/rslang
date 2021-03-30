import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
import { AudioChallengeItemComponent } from './components/audio-challenge-item/audio-challenge-item.component';
import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';

@NgModule({
  declarations: [
    GamesListComponent,
    GamesItemComponent,
    AudioChallengeItemComponent,
    AudioChallengeGameComponent,
  ],
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
