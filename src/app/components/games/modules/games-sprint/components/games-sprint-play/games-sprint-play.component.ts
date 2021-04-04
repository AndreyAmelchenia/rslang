import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Word } from 'src/app/common/models/word.model';
import { GeneratorShuffleArrayService } from 'src/app/common/services/generator-shuffle-array.service';
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

  wordsInCard: Word[] = [];

  wordsNew: Word[] = [];

  translations: Word[] = [];

  word: Word;

  wordInCard: Word;

  translation: Word;

  mistake: boolean;

  score = 0;

  deltaInScore = DataConstants.deltaInScore;

  response: {} = {};

  countWords = 0;

  countTrue = 0;

  countDown;

  counter = 60;

  audio = new Audio();

  end = false;

  play = true;

  start = false;

  constructor(
    private gamesSprintService: GamesSprintService,
    public generatorShuffleArrayService: GeneratorShuffleArrayService,
    private elem: ElementRef,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.gamesSprintService.getWords().subscribe((words) => {
      this.words = words;
      this.setWordAndTranslation();
    });
  }

  ngOnDestroy() {
    this.countDown = null;
    this.score = 0;
    this.deltaInScore = 10;
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
    this.audio.src = 'assets/sounds/tick.mp3';
    this.audio.load();
    this.audio.play();
  }

  setSameWordAndTranslation() {
    this.wordsInCard = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
      (number) => this.words[number],
    );
    this.wordsNew = this.words.filter((word) => !this.wordsInCard.includes(word));
    this.translations = this.wordsInCard;
    if (this.wordsInCard.length === 1) {
      [this.wordInCard] = this.wordsInCard;
    }
    if (this.translations.length === 1) {
      [this.translation] = this.translations;
    }
  }

  setWordAndTranslation() {
    this.wordsInCard = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
      (number) => this.words[number],
    );
    this.wordsNew = this.words.filter((word) => !this.wordsInCard.includes(word));
    this.translations = this.setRandomWord(this.wordsNew.length, wordsQuantityPerCard).map(
      (number) => this.wordsNew[number],
    );
    if (this.wordsInCard.length === 1) {
      [this.wordInCard] = this.wordsInCard;
    }
    if (this.translations.length === 1) {
      [this.translation] = this.translations;
    }
  }

  setRandomWord(length: number, number: number): number[] {
    return this.generatorShuffleArrayService.getRandomNumbers(length, number);
  }

  onAgree() {
    this.mistake = !this.gamesSprintService.compareWordAndTranslation(
      this.wordInCard,
      this.translation,
    );
    this.response = {
      _id: this.wordInCard._id,
      mistake: this.mistake,
      game: 'Sprint',
    };
    this.countWords += 1;
    if (!this.mistake) {
      this.countTrue += 1;
      this.countScore();
      this.elem.nativeElement.querySelectorAll('.score')[0].style.color = CssConstants.colorGreen;
    } else {
      this.countTrue = 0;
      this.elem.nativeElement.querySelectorAll('.score')[0].style.color = CssConstants.colorRed;
      this.deltaInScore = DataConstants.deltaInScore;
    }
    const randomNumbers = this.setRandomWord(
      DataConstants.wordsPerMinute,
      DataConstants.trueWordsPerMinute,
    );
    if (randomNumbers.includes(this.countWords)) {
      this.setSameWordAndTranslation();
    } else {
      this.setWordAndTranslation();
    }
  }

  onDisagree() {
    this.mistake = this.gamesSprintService.compareWordAndTranslation(
      this.wordInCard,
      this.translation,
    );
    this.response = {
      _id: this.wordInCard._id,
      mistake: this.mistake,
      game: 'Sprint',
    };
    this.countWords += 1;

    if (!this.mistake) {
      this.countTrue += 1;
      this.elem.nativeElement.querySelectorAll('.score')[0].style.color = CssConstants.colorGreen;
      this.countScore();
    } else {
      this.countTrue = 0;
      this.elem.nativeElement.querySelectorAll('.score')[0].style.color = CssConstants.colorRed;
      this.deltaInScore = DataConstants.deltaInScore;
    }
    const randomNumbers = this.setRandomWord(
      DataConstants.wordsPerMinute,
      DataConstants.trueWordsPerMinute,
    );
    if (randomNumbers.includes(this.countWords)) {
      this.setSameWordAndTranslation();
    } else {
      this.setWordAndTranslation();
    }
  }

  countScore() {
    if ((this.countTrue + 2) % 3 === 0 && this.countTrue !== 1) {
      this.deltaInScore *= 2;
    }
    this.score += this.deltaInScore;
  }

  stopGame() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.play = false;
    this.end = true;
  }

  goBack(): void {
    this.location.back();
  }
}
