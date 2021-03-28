import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { selectWords } from 'src/app/state/selectors/words.selectors';
import { Word } from 'src/app/models/word.model';

interface IGameState {
  wordsInGame: Word[];
  wordsGameStatistic: [];
  currentWord: any;
}

@Injectable({
  providedIn: 'root',
})
export class AudioChallengeGameService {
  gameState: IGameState = { wordsInGame: [], wordsGameStatistic: [], currentWord: {} };

  constructor(private store: Store<AppState>) {}

  getWords() {
    this.store.select(selectWords).subscribe((words) => {
      this.gameState.wordsInGame = [...words];
      return undefined;
    });
  }

  shuffle(arr = []) {
    const res = [...arr];
    console.log(res);
    return res.sort(() => Math.random() - 0.5);
  }
}
