import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Word } from 'src/app/common/models/word.model';
import { WORDS } from '../../../../../dictionary/words';

import { MyGameService } from '../../services/my-game.service';

@Component({
  selector: 'app-my-game-list',
  templateUrl: './my-game-list.component.html',
  styleUrls: ['./my-game-list.component.scss'],
})
export class MyGameListComponent implements OnInit {
  words: Word[] = WORDS;

  solvedWords: Word[] = [];

  unsolvedWords: Word[] = [];

  changedGameList: Word[] = [];

  myGamesArray: Word[] = [];

  imagesArray: Word[] = [];

  wordsArray: Word[] = [];

  skipped = 0;

  wordsCount = 0;

  amount = 10;

  countImageArrayLength = 0;

  score = 0;

  dragPictureId: string;

  constructor(private myGameService: MyGameService, private router: Router) {}

  ngOnInit() {
    this.onNewWords();
    this.onChangeWords();
  }

  onChangeWords() {
    this.countImageArrayLength = 0;
    this.imagesArray = [];
    this.wordsArray = [];
    this.myGamesArray = this.changedGameList.slice(this.skipped, this.skipped + 5);
    this.imagesArray.push(...this.myGamesArray);
    this.wordsArray.push(...this.myGamesArray);
    this.skipped += 5;

    this.wordsArray.sort(() => Math.random() - 0.5);

    if (this.myGamesArray.length === 0) {
      this.onNewWords();
      if (this.changedGameList.length !== 0) {
        this.onChangeWords();
      }
    }
  }

  onNewWords() {
    const randomWords = this.words.sort(() => Math.random() - 0.5);
    this.changedGameList = randomWords.slice(this.wordsCount, this.wordsCount + this.amount);
    this.wordsCount += this.amount;
    if (this.changedGameList.length === 0) {
      alert('Well done!');
      this.router.navigate(['/my-game']);
    }
  }

  drop(event: CdkDragDrop<Word>) {
    const dropWordId = event.item.data._id;

    console.log(this.countImageArrayLength);
    if (this.countImageArrayLength === 4) {
      this.onChangeWords();
    } else if (event.previousContainer === event.container) {
      moveItemInArray(this.myGamesArray, event.previousIndex, event.currentIndex);
    } else if (dropWordId === this.dragPictureId) {
      const elem = event.container.element.nativeElement.querySelector('.inside');
      elem.appendChild(event.item.element.nativeElement);
      this.countImageArrayLength += 1;
    }
  }

  started(event, dragPictureId: string) {
    this.dragPictureId = dragPictureId;
  }

  noReturnPredicate() {
    return false;
  }

  enterPredicate(drag: CdkDrag<Word>, drop: CdkDropList<Word>) {
    return drag.data._id === drop.data._id;
  }
}
