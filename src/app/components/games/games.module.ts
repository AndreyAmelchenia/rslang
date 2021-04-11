import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamesSprintModule } from './modules/games-sprint/games-sprint.module';

import { AudioChallengeGameModule } from './audio-challenge-game/audio-challenge-game.module';

@NgModule({
  declarations: [GamesListComponent, GamesItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GamesSprintModule,
    GamesRoutingModule,
    SharedModule,
    AudioChallengeGameModule,
  ],
  exports: [GamesListComponent, GamesItemComponent],
})
export class GamesModule {}
