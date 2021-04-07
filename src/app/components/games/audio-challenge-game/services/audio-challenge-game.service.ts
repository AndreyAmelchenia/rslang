import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/redux/app.state';
import { selectWords } from 'src/app/redux/selectors/words.seletor';
import { Word } from 'src/app/common/models/word.model';
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

  gameStart() {
    this.gameState = initialAudioChallengeState;
  }

  getWords() {
    this.store.select(selectWords).subscribe((words) => {
      this.gameState.wordsInGame = [...words];
      const [currentWord] = words;
      this.gameState.currentWord = this.createAudioChallengeWord(currentWord);
      return undefined;
    });
  }

  nextWord() {
    this.gameState.resultList = [
      ...this.gameState.resultList,
      { word: this.gameState.currentWord, result: true },
    ];
    const nextWord = this.gameState.wordsInGame[this.gameState.resultList.length];
    this.gameState.currentWord = this.createAudioChallengeWord(nextWord);
  }

  createAudioChallengeWord(word: Word): AudioChallengeWord {
    const translationsArray = this.createTranslationTask(word);
    return { ...word, translationsArray };
  }

  createTranslationTask(wordArg: Word): string[] {
    const { _id: id } = wordArg;
    const filterFunction = (word: Word) => {
      const { _id: wordId } = word;
      return wordId !== id;
    };
    const array = this.shuffle(
      this.gameState.wordsInGame.filter(filterFunction).map((word: Word) => word.wordTranslate),
    ).slice(0, 4);
    return this.shuffle([...array, wordArg.wordTranslate]);
  }

  makeTurn() {
    this.gameState.isTranslationChoosed = !this.gameState.isTranslationChoosed;
  }

  shuffle(arr = []) {
    const res = [...arr];
    return res.sort(() => Math.random() - 0.5);
  }
}
