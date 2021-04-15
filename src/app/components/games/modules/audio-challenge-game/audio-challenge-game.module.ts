import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { AudioChallengeItemComponent } from './components/audio-challenge-item/audio-challenge-item.component';
import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';
import { AudioChallengeGameRoutingModule } from './audio-challenge-game-routing.module';
import { AudioChallengeGameManageComponent } from './components/audio-challenge-game-manage/audio-challenge-game-manage.component';
import { AudioChallengeGameStartComponent } from './components/audio-challenge-game-start/audio-challenge-game-start.component';
import { AudioChallengeGameEndComponent } from './components/audio-challenge-game-end/audio-challenge-game-end.component';
import { FullScreenForGamesComponent } from '../../components/full-screen-for-games/full-screen-for-games.component';

@NgModule({
  declarations: [
    AudioChallengeItemComponent,
    AudioChallengeGameComponent,
    AudioChallengeGameManageComponent,
    AudioChallengeGameStartComponent,
    AudioChallengeGameEndComponent,
    FullScreenForGamesComponent,
  ],
  imports: [CommonModule, AudioChallengeGameRoutingModule, SharedModule, MatSortModule],
})
export class AudioChallengeGameModule {}
