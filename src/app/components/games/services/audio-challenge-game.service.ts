import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/redux/app.state';
import { selectWords } from 'src/app/redux/selectors/words.selectors';
import { AudioChallengeState, AudioChallengeWord } from '../models/game-adio-challenge.model';

const initialAudioChallengeWord: AudioChallengeWord = {
  _id: '',
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
  translationsArray: [],
};

const initialAudioChallengeState: AudioChallengeState = {
  wordsInGame: [],
  resultList: [],
  isGameStarted: true,
  currentWord: initialAudioChallengeWord,
  audio: new Audio(),
  isTranslationChoosed: false,
  maxRightAnswers: 0,
  previousMaxAnswers: 0,
  isGameEnded: false,
  isSoundOn: false,
};

@Injectable({
  providedIn: 'root',
})
export class AudioChallengeGameService {
  gameState: AudioChallengeState = initialAudioChallengeState;

  constructor(private store: Store<AppState>) {}

  getWords() {
    this.store.select(selectWords).subscribe((words) => {
      this.gameState.wordsInGame = [...words];
      const [currentWord] = words;
      this.gameState.currentWord = { ...this.gameState.currentWord, ...currentWord };
      return undefined;
    });
  }

  nextWord() {
    this.gameState.resultList = [
      ...this.gameState.resultList,
      { word: this.gameState.currentWord, result: true },
    ];
    this.gameState.currentWord = {
      ...this.gameState.wordsInGame[this.gameState.resultList.length],
      translationsArray: [],
    };
  }

  gameStart() {}

  shuffle(arr = []) {
    const res = [...arr];
    return res.sort(() => Math.random() - 0.5);
  }
}
