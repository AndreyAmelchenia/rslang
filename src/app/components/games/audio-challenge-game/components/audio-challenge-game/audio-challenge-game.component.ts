import { Component, OnInit } from '@angular/core';
import { AudioChallengeGameStateService } from '../../services/audio-challenge-game-status.service';

import { AudioChallengeGameService } from '../../services/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game',
  templateUrl: './audio-challenge-game.component.html',
  styleUrls: ['./audio-challenge-game.component.scss'],
})
export class AudioChallengeGameComponent implements OnInit {
  currentWord;

  gameState;

  turnEnded;

  constructor(
    private audioChallengeGameService: AudioChallengeGameService,
    private audioChallengeGameStateService: AudioChallengeGameStateService,
  ) {}

  ngOnInit(): void {
    this.currentWord = this.audioChallengeGameService.gameState.currentWord;
    this.gameState = this.audioChallengeGameStateService.getStateChange();
    this.turnEnded = this.gameState.isTranslationChoosed;
    console.log(this.gameState, 'dddddddddddddddddd');
  }

  newGame() {
    this.audioChallengeGameService.getWords();
    this.currentWord = this.audioChallengeGameService.gameState.currentWord;
  }

  nextWord() {
    this.audioChallengeGameService.nextWord();
    this.currentWord = this.audioChallengeGameService.gameState.currentWord;
    this.makeTurn();
  }

  makeTurn() {
    this.audioChallengeGameService.gameState.isTranslationChoosed = !this.audioChallengeGameService
      .gameState.isTranslationChoosed;
  }
}
