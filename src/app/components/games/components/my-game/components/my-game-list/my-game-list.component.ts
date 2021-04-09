import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Word } from 'src/app/common/models/word.model';
import { AppState } from 'src/app/redux/app.state';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { StatisticGame } from '../../game-statistic.model';

import { MyGameService } from '../../services/my-game.service';
import { DialogTotalGameComponent } from '../dialog-total-game/dialog-total-game.component';
@Component({
  selector: 'app-my-game-list',
  templateUrl: './my-game-list.component.html',
  styleUrls: ['./my-game-list.component.scss'],
})
export class MyGameListComponent implements OnInit {
  words: Word[];

  solvedWords = new Set<Word>();

  unsolvedWords = new Set<Word>();

  changedGameList: Word[] = [];

  myGamesArray: Word[] = [];

  imagesArray: Word[] = [];

  wordsArray: Word[] = [];

  skipped = 0;

  wordsPerPage = 5;

  wordsPerPageDivinedCountIndex = 4;

  wordsCount = 0;

  amount = 20;

  countImageArrayLength = 0;

  score = 0;

  scorePerDividedWord = 10;

  tryCount = 0;

  maxTryCount = 4;

  dragPictureId: string;

  dropPictureId: string;

  sound = new Audio();

  scoreAudio = 'assets/sounds/score.mp3';

  tryAudio = 'assets/sounds/try.mp3';

  disabled = true;

  statistic: StatisticGame;

  countGoodAnswer = 0;

  bestSeries = [];

  countAllTries = 0;

  constructor(
    private myGameService: MyGameService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>,
  ) {
    this.store.select(selectGameList()).subscribe((gameList) => {
      this.words = gameList;
    });
  }

  ngOnInit() {
    this.tryCount = 0;
    this.solvedWords = new Set<Word>();
    this.unsolvedWords = new Set<Word>();
    this.onNewWords();
    this.onChangeWords();
  }

  onChangeWords() {
    this.countImageArrayLength = 0;
    this.imagesArray = [];
    this.wordsArray = [];
    this.myGamesArray = this.changedGameList.slice(this.skipped, this.skipped + this.wordsPerPage);
    this.imagesArray.push(...this.myGamesArray);
    this.wordsArray.push(...this.myGamesArray);
    this.skipped += this.wordsPerPage;
    this.wordsArray.sort(() => Math.random() - 0.5);
    if (this.myGamesArray.length === 0) {
      this.onNewWords();
    }
  }

  onNewWords() {
    const randomWords = this.words.sort(() => Math.random() - 0.5);
    this.changedGameList = randomWords.slice(this.wordsCount, this.wordsCount + this.amount);
    this.wordsCount += this.amount;
    if (this.changedGameList.length === 0) {
      this.getStatistic();
      this.openDialog();
    }
  }

  drop(event, dropPictureId: string) {
    this.dropPictureId = dropPictureId;

    if (this.dragPictureId !== dropPictureId) {
      this.unsolvedWords.add(event.item.data);
      this.playSoundTry();
      this.tryCount += 1;
      this.countAllTries += 1;
      this.countGoodAnswer = 0;
      if (this.tryCount > this.maxTryCount) {
        this.tryCount = 5;
        this.getStatistic();
        this.openDialog();
      }
    } else {
      const elem = event.container.element.nativeElement.querySelector('.inside');
      elem.appendChild(event.item.element.nativeElement);
      this.solvedWords.add(event.item.data.word);
      this.playSoundScore();
      this.countImageArrayLength += 1;
      this.score += this.scorePerDividedWord;
      this.checkCountImageArrayLength();
      this.countGoodAnswer += 1;
      this.countAllTries += 1;
      this.bestSeries.push(this.countGoodAnswer);
    }
  }

  checkCountImageArrayLength() {
    if (this.countImageArrayLength > this.wordsPerPageDivinedCountIndex) {
      this.onChangeWords();
    }
  }

  started(event, dragPictureId: string) {
    this.dragPictureId = dragPictureId;
  }

  noReturnPredicate() {
    return false;
  }

  playSoundScore() {
    this.sound.src = 'assets/sounds/score.mp3';
    this.sound.load();
    this.sound.play();
  }

  playSoundTry() {
    this.sound.src = 'assets/sounds/try.mp3';
    this.sound.load();
    this.sound.play();
  }

  getStatistic() {
    // eslint-disable-next-line no-return-assign
    return (this.statistic = new StatisticGame(
      this.solvedWords.size,
      this.countAllTries,
      this.solvedWords.size,
      this.getMaxOfBestAnsers(this.bestSeries),
    ));
  }

  getMaxOfBestAnsers(bestSeries) {
    return Math.max.apply(null, bestSeries);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogTotalGameComponent, {
      width: '80%',
      height: '80%',
      data: {
        score: this.score,
        try: this.tryCount,
        unsolved: [...this.unsolvedWords],
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe();
  }
}
