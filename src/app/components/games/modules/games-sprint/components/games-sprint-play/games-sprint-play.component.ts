import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Word } from 'src/app/common/models/word.model';
import { GeneratorShuffleArrayService } from 'src/app/common/services/generator-shuffle-array.service';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { CssConstants } from '../../../../../../shared/constants/css-constants';
import { DataConstants } from '../../../../../../shared/constants/data-constants';
import { GamesSprintService } from '../../services/games-sprint.service';

const wordsQuantityPerCard = 1;

@Component({
  selector: 'app-games-sprint-play',
  templateUrl: './games-sprint-play.component.html',
  styleUrls: ['./games-sprint-play.component.scss'],
  providers: [GamesSprintService],
})
export class GamesSprintPlayComponent implements OnInit, OnDestroy {
  cols = CssConstants.materialColumnsNumberMiddle;

  rowHeight = CssConstants.materialRowHeightSmall;

  words$: Observable<Word[]>;

  words: Word[] = [];

  wordsAll: Word[] = [];

  wordsCorrect: string[] = [];

  wordsInCorrect: string[] = [];

  wordsUniquePlayed = new Set();

  wordsInCard: Word[] = [];

  wordsNew: Word[] = [];

  translations: Word[] = [];

  word: Word;

  wordInCard: Word;

  translation: Word;

  mistake: boolean;

  score = 0;

  deltaInScore = DataConstants.deltaInScore;

  responseEndGame: {} = {};

  countTries = 0;

  countTrue = 0;

  countTrueSeries: number[] = [];

  countDown;

  counter = 20;

  audio = new Audio('assets/sounds/tick.mp3');

  end = false;

  play = true;

  start = false;

  constructor(
    private gamesSprintService: GamesSprintService,
    public generatorShuffleArrayService: GeneratorShuffleArrayService,
    private elem: ElementRef,
    private location: Location,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.select(selectGameList()).subscribe((words) => {
      this.wordsAll = words;
      this.words = this.wordsAll.slice();
      this.setDifferentWordAndTranslation();
    });
  }

  ngOnDestroy() {
    this.score = 0;
    this.deltaInScore = 10;
    this.play = false;
    this.end = true;
    if(this.countDown) {
      this.countDown.unsubscribe();
   }
  }

  onStart() {
    this.countDown = this.gamesSprintService.getCounter(DataConstants.tick).subscribe(() => {
      this.playAudio();
      // eslint-disable-next-line no-return-assign
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.counter > 0 ? (this.counter -= 1) : this.stopGame();
    });
    this.start = true;
  }

  playAudio() {
    this.audio.load();
    this.audio.play();
  }

  pauseAudio() {
    this.audio.play().then(() => {
      this.audio.pause();
      this.audio.currentTime = 0;
    });
  }

  setWord() {
    if(this.words.length < 3) {
      this.words = this.wordsAll.slice();
    }
    this.wordsInCard = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
      (number) => this.words[number],
    );
    this.words = this.words.filter((word) => !this.wordsInCard.includes(word));
    if (this.wordsInCard.length === 1) {
      [this.wordInCard] = this.wordsInCard;
    }
  }

  setSameWordAndTranslation() {
    this.setWord();
    this.translations = this.wordsInCard;
    if (this.translations.length === 1) {
      [this.translation] = this.translations;
    }
  }

  setDifferentWordAndTranslation() {
    this.setWord();
    this.translations = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
      (number) => this.words[number],
    );
    if (this.translations.length === 1) {
      [this.translation] = this.translations;
    }
  }

  setRandomWord(length: number, number: number): number[] {
    return this.generatorShuffleArrayService.getRandomNumbers(length, number);
  }

  onAgree(ifAgree) {
    this.mistake = this.gamesSprintService.compareWordAndTranslation(
      this.wordInCard,
      this.translation,
    );
    if (ifAgree) {
      this.mistake = !this.mistake;
    }
    this.countTries += 1;
    this.wordsUniquePlayed.add(this.wordInCard);
    if (!this.mistake) {
      this.wordsCorrect.push(this.wordInCard.word);
      this.countTrue += 1;
      this.countScore();
      this.elem.nativeElement.querySelectorAll('.score')[0].style.color = CssConstants.colorGreen;
    } else {
      this.wordsInCorrect.push(this.wordInCard.word);
      this.countTrueSeries.push(this.countTrue);
      this.countTrue = 0;
      this.elem.nativeElement.querySelectorAll('.score')[0].style.color = CssConstants.colorRed;
      this.deltaInScore = DataConstants.deltaInScore;
    }
    const randomNumbers = this.setRandomWord(
      DataConstants.wordsPerMinute,
      DataConstants.trueWordsPerMinute,
    );
    if (randomNumbers.includes(this.countTries)) {
      this.setSameWordAndTranslation();
    } else {
      this.setDifferentWordAndTranslation();
    }
  }

  countScore() {
    if ((this.countTrue + 2) % 3 === 0 && this.countTrue !== 1) {
      this.deltaInScore *= 2;
    }
    this.score += this.deltaInScore;
  }

  stopGame() {
    this.pauseAudio();
    this.play = false;
    this.end = true;
    this.countDown.unsubscribe();
    this.responseEndGame = {
      learned: this.wordsUniquePlayed.size,
      tries: this.countTries,
      right: this.countTrueSeries.reduce((accum, value) => accum + value, 0),
      bestSeries: Math.max(...this.countTrueSeries),
      correct: this.wordsCorrect,
      incorrect: this.wordsInCorrect,
    };
  }

  goBack(): void {
    this.location.back();
  }
}
