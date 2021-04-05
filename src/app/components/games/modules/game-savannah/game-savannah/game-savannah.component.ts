import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from 'src/app/common/models/word.model';
import { Subscription } from 'rxjs';
import { GameSavannahLangs } from '../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../models/game-savannah-status.model';
import { GameSavannahService } from '../services/game-savannah.service';

@Component({
  selector: 'app-game-savannah',
  templateUrl: './game-savannah.component.html',
  styleUrls: ['./game-savannah.component.scss'],
})
export class GameSavannahComponent implements OnDestroy, OnInit {
  private timerId: ReturnType<typeof setTimeout>;

  subscription!: Subscription;

  gameSavannahStatus: GameSavannahStatus = {
    errors: 0,
    sound: true,
    currentLang: GameSavannahLangs.en,
  };

  play = false;

  words: Word[];

  currentWord: string;

  currentWordId: number;

  answers: string[];

  constructor(private gameSavannahService: GameSavannahService, private http: HttpClient) {
    this.http
      .get('assets/data/words.json')
      .subscribe((res: Word[]) => this.setWords(this.shufle(res)));
  }

  ngOnInit(): void {
    this.gameSavannahService.data.subscribe((data) => {
      // eslint-disable-next-line no-console
      console.log(data);
      this.gameSavannahStatus = data;
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.subscription.unsubscribe();
  }

  clearTimer(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }

  changeGameSavannahStatus(data: GameSavannahStatus): void {
    this.gameSavannahService.updateGameStatus(data);
  }

  startGame(): void {
    this.play = true;
    this.playWord(0);
    // eslint-disable-next-line no-console
    console.log(this.words);
  }

  playWord(id: number): void {
    this.clearTimer();
    // if (id >= this.words.length - 1) {
    //   console.log('end');
    // }
    this.currentWordId = id;
    this.currentWord = this.words[id][this.langKey()];
    this.answers = this.setAnswersWrods(id);
    this.timerId = setTimeout(() => {
      this.checkAnswer('');
    }, 10000);
  }

  setAnswersWrods(id: number): string[] {
    const res = [this.words[id][this.answersKey()]];
    while (res.length < 4) {
      const ind = this.getRandomInt(this.words.length);
      if (ind !== id && !res.some((el) => el === this.words[ind][this.answersKey()])) {
        res.push(this.words[ind][this.answersKey()]);
      }
    }
    return res;
  }

  checkAnswer(answer: string) {
    if (answer !== this.words[this.currentWordId][this.answersKey()]) {
      this.gameSavannahStatus.errors += 1;
      this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
    }
    this.playWord(this.currentWordId + 1);
  }

  setWords(words: Word[]): void {
    this.words = words;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private langKey(): string {
    return this.gameSavannahStatus.currentLang === 'en' ? 'word' : 'wordTranslate';
  }

  private answersKey(): string {
    return this.gameSavannahStatus.currentLang === 'ru' ? 'word' : 'wordTranslate';
  }

  private shufle(arr: any[]): any[] {
    let j;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
}
