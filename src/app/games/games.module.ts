import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';
import { AudioChallengeItemComponent } from './components/audio-challenge-item/audio-challenge-item.component';

@NgModule({
  declarations: [GameComponent, AudioChallengeGameComponent, AudioChallengeItemComponent],
  imports: [CommonModule],
  exports: [GameComponent],
})
export class GamesModule {}
