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

  responseEndGame: {} = {};

  countWords = 0;

  countTrue = 0;

  countTrueSeries: number[] = [];

  countDown;

  counter = 5;

  audio = new Audio('assets/sounds/tick.mp3');

  end = false;

  play = true;

  start = false;

  constructor(
    private gamesSprintService: GamesSprintService,
    public generatorShuffleArrayService: GeneratorShuffleArrayService,
    private elem: ElementRef,
    private router: Router,
    private location: Location,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.select(selectGameList()).subscribe((words) => {
      this.words = words;
      this.setDifferentWordAndTranslation();
    });
  }

  ngOnDestroy() {
    console.log('onDestroy');
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
    console.log('onStart');
    this.start = true;
  }

  playAudio() {
    this.audio.load();
    this.audio.play();
  }

  pauseAudio() {
    this.audio.play().then(() => {
      console.log('4');
      this.audio.pause();
      this.audio.currentTime = 0;
    });
  }

  setWord() {
    this.wordsInCard = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
      (number) => this.words[number],
    );
    this.wordsNew = this.words.filter((word) => !this.wordsInCard.includes(word));
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
    this.translations = this.setRandomWord(this.wordsNew.length, wordsQuantityPerCard).map(
      (number) => this.wordsNew[number],
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
      this.countTrueSeries.push(this.countTrue);
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
    console.log('Stop');
    this.pauseAudio();
    this.play = false;
    this.end = true;
    this.countDown.unsubscribe();
    this.responseEndGame = {
      game: 'Sprint',
      bestSeries: Math.max(...this.countTrueSeries),
    };
  }

  goBack(): void {
    this.location.back();
  }
}
