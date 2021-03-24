import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';

@NgModule({
  declarations: [GameComponent, AudioChallengeGameComponent],
  imports: [CommonModule],
  exports: [GameComponent],
})
export class GamesModule {}
