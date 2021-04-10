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

// export interface GameStatistic extends Word {
//   learned: number;
//   trues: number;
//   right: number;
//   series: number;
// }

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

  openStatistics = false;

  paused = true;

  words: GameSavannahWord[];

  currentWord: string;

  currentWordId: number;

  answers: string[];

  animationTime = 5;

  gameSavannahStatistic = {
    learned: 0,
    trues: 0,
    right: 0,
    series: 0,
  };

  currentSeries = 0;

  constructor(private gameSavannahService: GameSavannahService, private http: HttpClient) {
    this.http
      .get('assets/data/words.json')
      .subscribe((res: Word[]) => this.setWords(this.shufle(res)));
    this.resetStatistics();
  }

  ngOnInit(): void {
    this.subscription = this.gameSavannahService.data.subscribe((data) => {
      this.gameSavannahStatus = data;
    });
  }

  ngOnDestroy(): void {
    this.restartGame();
    this.clearTimer();
    this.subscription.unsubscribe();
    this.words.forEach((el) => {
      if (el.statistics !== undefined) {
        this.gameSavannahStatistic.learned += 1;
      }
    });
    console.log('Game Savannah Statistic: ', this.gameSavannahStatistic);
  }

  resetStatistics(): void {
    ['learned', 'trues', 'right', 'series'].forEach((key) => {
      this.gameSavannahStatistic[key] = 0;
    });
    this.currentSeries = 0;
  }

  clearTimer(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }

  changeGameSavannahStatus(data: GameSavannahStatus): void {
    this.gameSavannahService.updateGameStatus(data);
    this.restartGame();
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
    this.openStatistics = false;
    this.setWords(this.shufle(this.words));
    const timerId = setTimeout(() => {
      this.startGame();
      this.paused = false;
      clearTimeout(timerId);
    }, 0);
  }

  playWord(id: number): void {
    this.clearTimer();
    if (id >= this.words.length || this.gameSavannahStatus.errors >= 5) {
      this.openStatistics = true;
      this.play = false;
    } else {
      this.paused = false;
      this.currentWordId = id;
      this.currentWord = this.words[id][this.langKey()];
      this.answers = this.setAnswersWrods(id);
      this.timerId = setTimeout(() => {
        this.checkAnswer('');
      }, (this.animationTime + 2) * 1000);
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

  getAnswer(): string {
    return this.words[this.currentWordId][this.answersKey()];
  }

  checkAnswer(answer: string) {
    if (this.timerId) {
      this.paused = true;
      this.gameSavannahStatistic.trues += 1;
      if (answer !== this.getAnswer()) {
        this.words[this.currentWordId].statistics = false;
        this.gameSavannahStatus.errors += 1;
        this.currentSeries = 0;
      } else {
        this.words[this.currentWordId].statistics = true;
        this.gameSavannahStatus.currentCounts += 1;
        this.gameSavannahStatistic.right += 1;
        this.currentSeries += 1;
        if (this.currentSeries >= this.gameSavannahStatistic.series) {
          this.gameSavannahStatistic.series = this.currentSeries;
        }
        console.log(
          'this.currentSeries, this.gameSavannahStatistic.series',
          this.currentSeries,
          this.gameSavannahStatistic.series,
        );
      }
      this.updateStatus();
      const timerId = setTimeout(() => {
        this.playWord(this.currentWordId + 1);
        clearTimeout(timerId);
      }, (this.animationTime + 5) * 100);
    }
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
    const res = [...arr];
    let j;
    for (let i = res.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      [res[j], res[i]] = [res[i], res[j]];
    }
    return res;
  }
}
