import { Component, OnInit } from '@angular/core';

import { AudioChallengeGameService } from '../../services/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game',
  templateUrl: './audio-challenge-game.component.html',
  styleUrls: ['./audio-challenge-game.component.scss'],
})
export class AudioChallengeGameComponent implements OnInit {
  wordState;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  ngOnInit(): void {
    this.wordState = this.audioChallengeGameService.getStateChange();
  }

  newGame() {
    this.audioChallengeGameService.gameStart();
  }
}
