import { Component, OnInit } from '@angular/core';

import { AudioChallengeGameService } from '../../services/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game',
  templateUrl: './audio-challenge-game.component.html',
  styleUrls: ['./audio-challenge-game.component.scss'],
})
export class AudioChallengeGameComponent implements OnInit {
  currentWord;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  ngOnInit(): void {
    this.currentWord = this.audioChallengeGameService.gameState.currentWord;
  }

  newGame() {
    this.audioChallengeGameService.getWords();
    this.currentWord = this.audioChallengeGameService.gameState.currentWord;
  }

  nextWord() {
    this.audioChallengeGameService.nextWord();
    this.currentWord = this.audioChallengeGameService.gameState.currentWord;
  }
}
