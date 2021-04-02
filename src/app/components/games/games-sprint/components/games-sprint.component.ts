import { Component, OnInit } from '@angular/core';
// import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Word } from 'src/app/common/models/word.model';
import { GeneratorShuffleArrayService } from 'src/app/common/services/generator-shuffle-array.service';
import { CssConstants } from 'src/app/shared/constants/css-constants';
import { GamesSprintService } from '../services/games-sprint.service';

const wordsQuantityPerCard = 1;

@Component({
  selector: 'app-games-sprint',
  templateUrl: './games-sprint.component.html',
  styleUrls: ['./games-sprint.component.scss'],
  providers: [GamesSprintService],
})
export class GamesSprintComponent implements OnInit {
  //  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  // @Input() value = 5;

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

  constructor(
    private gamesSprintService: GamesSprintService,
    public generatorShuffleArrayService: GeneratorShuffleArrayService,
  ) {}

  ngOnInit() {
    this.words$ = this.gamesSprintService.getWords();
    this.words$.subscribe((words) => {
      this.words = words;
      this.wordsInCard = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
        (number) => this.words[number],
      );
      this.wordsNew = this.words.filter((word) => !this.wordsInCard.includes(word));
      console.log(this.wordsNew);
      this.translations = this.setRandomWord(this.wordsNew.length, wordsQuantityPerCard).map(
        (number) => this.wordsNew[number],
      );
      if (this.wordsInCard.length === 1) {
        [this.wordInCard] = this.wordsInCard;
      }
      console.log(this.wordInCard);
      if (this.translations.length === 1) {
        [this.translation] = this.translations;
      }
      console.log(this.translation);
    });
  }

  setRandomWord(length, number): number[] {
    return this.generatorShuffleArrayService.getRandomNumbers(length, number);
  }

  receive(data) {
    console.log(data.reaction, data.word, data.translation);
    // this.cartService.addBook(book);
  }

  /*
      receive(reaction: boolean, word, translation) {
      console.log(reaction, word, translation);
     // this.cartService.addBook(book);
    }*/
}
