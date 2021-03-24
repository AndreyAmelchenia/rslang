import { Component } from '@angular/core';
import {Store} from "@ngrx/store";

import { StartNewGame } from './state';
import {AppState} from "../../../app.state";

@Component({
  selector: 'app-audio-challenge-game',
  templateUrl: './audio-challenge-game.component.html',
  styleUrls: ['./audio-challenge-game.component.scss'],
})
export class AudioChallengeGameComponent {

  // eslint-disable-next-line prettier/prettier
  constructor(private store: Store<AppState>) {}

  newGame() {
    this.store.dispatch(new StartNewGame(null));
  }
}
