import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from 'src/app/common/models/word.model';
import { Subscription } from 'rxjs';
import { GameSavannahLangs } from '../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../models/game-savannah-status.model';
import { GameSavannahService } from '../services/game-savannah.service';

export interface GameSavannahWord extends Word {
  statistics?: boolean;
}

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

  statictics = false;

  paused = true;

  words: GameSavannahWord[];

  currentWord: string;

  currentWordId: number;

  answers: string[];

  animationTime = 5;

  constructor(private gameSavannahService: GameSavannahService, private http: HttpClient) {
    this.http
      .get('assets/data/words.json')
      .subscribe((res: Word[]) => this.setWords(this.shufle(res)));
  }

  ngOnInit(): void {
    this.subscription = this.gameSavannahService.data.subscribe((data) => {
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
    this.gameSavannahStatus.wordsCount = this.words.length;
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
    this.play = true;
    this.playWord(0);
  }

  restartGame(): void {
    this.gameSavannahStatus.errors = 0;
    this.gameSavannahStatus.progressError = '0%';
    this.gameSavannahStatus.currentCounts = 0;
    this.gameSavannahStatus.progressAll = '0%';
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
    this.play = false;
    this.statictics = false;
    this.paused = true;
    const timerId = setTimeout(() => {
      this.startGame();
      this.paused = false;
      clearTimeout(timerId);
    }, 10);
  }

  playWord(id: number): void {
    this.clearTimer();
    if (id >= this.words.length || this.gameSavannahStatus.errors >= 5) {
      this.statictics = true;
      this.play = false;
    } else {
      this.paused = false;
      this.currentWordId = id;
      this.currentWord = this.words[id][this.langKey()];
      this.answers = this.setAnswersWrods(id);
      this.timerId = setTimeout(() => {
        this.checkAnswer('');
      }, this.animationTime * 1000);
    }
  }

  setAnswersWrods(id: number): string[] {
    const res = [this.words[id][this.answersKey()]];
    while (res.length < 4) {
      const ind = this.getRandomInt(this.words.length);
      if (ind !== id && !res.some((el) => el === this.words[ind][this.answersKey()])) {
        res.push(this.words[ind][this.answersKey()]);
      }
    }
    return this.shufle(res);
  }

  checkAnswer(answer: string) {
    this.paused = true;
    if (answer !== this.words[this.currentWordId][this.answersKey()]) {
      this.words[this.currentWordId].statistics = false;
      this.gameSavannahStatus.errors += 1;
    } else {
      this.words[this.currentWordId].statistics = true;
      this.gameSavannahStatus.currentCounts += 1;
    }
    this.updateStatus();
    const timerId = setTimeout(() => {
      this.playWord(this.currentWordId + 1);
      clearTimeout(timerId);
    }, 700);
  }

  updateStatus() {
    this.gameSavannahStatus.progressError = `${
      (this.gameSavannahStatus.errors / this.gameSavannahStatus.wordsCount) * 100
    }%`;
    this.gameSavannahStatus.progressAll = `${
      ((this.gameSavannahStatus.errors + this.gameSavannahStatus.currentCounts) /
        this.gameSavannahStatus.wordsCount) *
      100
    }%`;
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
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
