import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppState } from 'src/app/redux/app.state';
import { selectWords } from 'src/app/redux/selectors/words.seletor';
import { Word } from 'src/app/common/models/word.model';
import { AudioChallengeState, AudioChallengeWord } from '../models/game-adio-challenge.model';
import { GAME_LENGHT, initialAudioChallengeState } from '../constants/audio-challenge.constants';

@Injectable({
  providedIn: 'root',
})
export class AudioChallengeGameService {
  private gameState = new BehaviorSubject<AudioChallengeState>(initialAudioChallengeState);

  constructor(private store: Store<AppState>) {}

  getStateChange(): Observable<AudioChallengeState> {
    return this.gameState.asObservable();
  }

  getCurrentState(): AudioChallengeState {
    return this.gameState.getValue();
  }

  setGameState(state: Partial<AudioChallengeState>) {
    const newState = { ...this.getCurrentState(), ...state };
    this.gameState.next(newState);
  }

  gameStart() {
    const newState = { ...initialAudioChallengeState };
    this.gameState.next(newState);
    this.getWords();
    const { wordsInGame } = this.getCurrentState();
    if (wordsInGame.length) {
      this.setGameState({ isGameStarted: true });
    }
  }

  gameEnd() {
    this.setGameState({ isGameEnded: true });
  }

  getWords() {
    this.store.select(selectWords).subscribe((words) => {
      this.setGameState({
        wordsInGame: words,
      });
      const [currentWord] = words;
      this.setGameState({
        currentWord: this.createAudioChallengeWord(currentWord),
      });
      return undefined;
    });
  }

  nextWord() {
    const { resultList, wordsInGame } = this.getCurrentState();

    const nextWord = wordsInGame[resultList.length];
    const currentWord = this.createAudioChallengeWord(nextWord);
    this.setGameState({
      currentWord,
      isTranslationChoosed: false,
    });
    if (resultList.length === GAME_LENGHT) {
      this.gameEnd();
    }
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
      this.getCurrentState()
        .wordsInGame.filter(filterFunction)
        .map((word: Word) => word.wordTranslate),
    ).slice(0, 4);
    return this.shuffle([...array, wordArg.wordTranslate]);
  }

  makeTurn(index: number | undefined) {
    let resultUnswer = false;
    const { resultList, currentWord, isTranslationChoosed } = this.getCurrentState();
    if (isTranslationChoosed) {
      return;
    }
    if (index) {
      resultUnswer = currentWord.wordTranslate === currentWord.translationsArray[index];
    }

    const resultListNew = [...resultList, { word: currentWord, result: resultUnswer }];

    this.setGameState({
      resultList: resultListNew,
      isTranslationChoosed: true,
    });
  }

  shuffle(arr = []) {
    const res = [...arr];
    return res.sort(() => Math.random() - 0.5);
  }

  closeGame() {
    this.setGameState(initialAudioChallengeState);
  }
}
