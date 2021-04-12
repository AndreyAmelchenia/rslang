import { Component, Input } from '@angular/core';

import { AudioChallengeGameService } from '../../services/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game-start',
  templateUrl: './audio-challenge-game-start.component.html',
  styleUrls: ['./audio-challenge-game-start.component.scss'],
})
export class AudioChallengeGameStartComponent {
  @Input()
  wordState;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  newGame() {
    this.audioChallengeGameService.gameStart();
  }
}
