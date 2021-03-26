import { Component } from '@angular/core';
import {Store} from "@ngrx/store";

import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-audio-challenge-game',
  templateUrl: './audio-challenge-game.component.html',
  styleUrls: ['./audio-challenge-game.component.scss'],
})
export class AudioChallengeGameComponent {

  constructor(private store: Store<AppState>) {}

  newGame() {

  }
}
