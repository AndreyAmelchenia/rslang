import {
  // ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { GameSavannahWord } from '../../game-savannah/game-savannah.component';

@Component({
  selector: 'app-game-savannah-statictics',
  templateUrl: './game-savannah-statictics.component.html',
  styleUrls: ['./game-savannah-statictics.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahStaticticsComponent implements OnInit {
  @Input() words: GameSavannahWord[];

  @Output() repeatGame = new EventEmitter();

  audio: HTMLAudioElement;

  audioExample: HTMLAudioElement;

  audioMeaning: HTMLAudioElement;

  play = false;

  currentWord = -1;

  subTitle = '';

  ngOnInit(): void {
    let right = 0;
    let count = 0;
    this.words.forEach((el) => {
      if (el.statistics !== undefined) {
        count += 1;
        if (el.statistics) right += 1;
      }
    });
    if (right >= this.words.length - 5) {
      this.subTitle += `Отлично! Вы знаете ${right} из ${count} слов.`;
    } else {
      this.subTitle += `Тренируйтесь еще. Вы знаете только ${right} из ${count} слов.`;
    }
  }

  playCurrentWord(i: number): void {
    if (this.currentWord === i) {
      this.currentWord = -1;
      this.stopAudio();
    } else {
      this.currentWord = i;
      if (this.play) this.stopAudio();
      this.playAudio(i);
    }
  }

  playAudio(i: number) {
    this.play = true;
    this.audio = new Audio(`https://andey-rslang-back-end.herokuapp.com/${this.words[i].audio}`);

    this.audioExample = new Audio(
      `https://andey-rslang-back-end.herokuapp.com/${this.words[i].audioExample}`,
    );

    this.audioMeaning = new Audio(
      `https://andey-rslang-back-end.herokuapp.com/${this.words[i].audioMeaning}`,
    );
    [this.audio, this.audioExample, this.audioMeaning].forEach((el, index, arr) => {
      el.addEventListener('ended', () => arr[index + 1] && arr[index + 1].play());
    });
    this.audioMeaning.addEventListener('ended', () => this.playCurrentWord(this.currentWord));
    this.audio.play();
  }

  stopAudio() {
    this.play = false;
    this.audio.pause();
    this.audioExample.pause();
    this.audioMeaning.pause();
  }

  repeat(): void {
    this.repeatGame.emit();
  }
}
