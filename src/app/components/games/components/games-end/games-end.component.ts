import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Word } from 'src/app/common/models/word.model';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { GameResult } from '../../models/games.result.model';

@Component({
  selector: 'app-games-end',
  templateUrl: './games-end.component.html',
  styleUrls: ['./games-end.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesEndComponent implements OnInit {
  @Input() words: Word[];

  @Input() gameResult: GameResult[] = [];

  @Input() countOfBadResults = 5;

  @Output() submitResult = new EventEmitter();

  displayedColumns: string[] = ['word', 'translate', 'result', 'audio'];

  dataSource;

  subTitle = '';

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.gameResult);
    this.dataSource.sort = this.sort;
    this.calcStatistics();
  }

  playAgain(): void {
    this.submitResult.emit(true);
  }

  cancel(): void {
    this.submitResult.emit(false);
  }

  playWordAudio(audio: string): void {
    const audioElement = new Audio(`${URL_BACK_SERVER.URL_BACK + audio}`);
    audioElement.play();
  }

  private calcStatistics(): void {
    let right = 0;
    this.gameResult.forEach((el) => {
      if (el.result) {
        right += 1;
      }
    });
    if (right >= this.words.length - this.countOfBadResults) {
      this.subTitle += `Отлично! Вы знаете ${right} из ${this.gameResult.length} слов.`;
    } else {
      this.subTitle += `Тренируйтесь еще. Вы знаете только ${right} из ${this.gameResult.length} слов.`;
    }
    console.log('calcStatistics end');
  }

  // @Output() repeatGame = new EventEmitter();
  // audio: HTMLAudioElement;
  // audioExample: HTMLAudioElement;
  // audioMeaning: HTMLAudioElement;
  // play = false;
  // currentWord = -1;

  // playCurrentWord(i: number): void {
  //   if (this.currentWord === i) {
  //     this.currentWord = -1;
  //     this.stopAudio();
  //   } else {
  //     this.currentWord = i;
  //     if (this.play) this.stopAudio();
  //     this.playAudio(i);
  //   }
  // }
  // playAudio(i: number) {
  //   this.play = true;
  //   this.audio = new Audio(`${URL_BACK_SERVER.URL_BACK + this.words[i].audio}`);
  //   this.audioExample = new Audio(`${URL_BACK_SERVER.URL_BACK + this.words[i].audioExample}`);
  //   this.audioMeaning = new Audio(`${URL_BACK_SERVER.URL_BACK + this.words[i].audioMeaning}`);
  //   [this.audio, this.audioExample, this.audioMeaning].forEach((el, index, arr) => {
  //     el.addEventListener('ended', () => arr[index + 1] && arr[index + 1].play());
  //   });
  //   this.audioMeaning.addEventListener('ended', () => this.playCurrentWord(this.currentWord));
  //   this.audio.play();
  // }
  // stopAudio() {
  //   this.play = false;
  //   this.audio.pause();
  //   this.audioExample.pause();
  //   this.audioMeaning.pause();
  // }
  // repeat(): void {
  //   this.repeatGame.emit();
  // }
}
