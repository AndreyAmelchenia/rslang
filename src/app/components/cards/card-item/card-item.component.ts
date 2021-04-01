import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from 'src/app/common/models/word.model';
import { LoadDifficultyWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() word: Word;

  @Input() color: number[];

  audio: HTMLAudioElement;

  audioExample: HTMLAudioElement;

  audioMeaning: HTMLAudioElement;

  play = false;

  constructor(private store: Store<AppState>) {}

  colorRGB(color: number[]): string {
    return `rgba(${[...color, 0.3].join()})`;
  }

  addDifficultyWord(wordId: string, difficulty: 'easy' | 'hard' | 'deleted', newWord: boolean) {
    this.store.dispatch(LoadDifficultyWords({ wordId, difficulty, newWord }));
  }

  playAudio() {
    this.stopAndStart();
    this.audio = new Audio(`https://andey-rslang-back-end.herokuapp.com/${this.word.audio}`);

    this.audioExample = new Audio(
      `https://andey-rslang-back-end.herokuapp.com/${this.word.audioExample}`,
    );

    this.audioMeaning = new Audio(
      `https://andey-rslang-back-end.herokuapp.com/${this.word.audioMeaning}`,
    );
    this.audio.play();
    [this.audio, this.audioExample, this.audioMeaning].forEach((el, index, arr) => {
      el.addEventListener('ended', () => arr[index + 1] && arr[index + 1].play());
    });
    this.audioMeaning.onended = () => setTimeout(() => this.stopAndStart());
  }

  stopAudio() {
    this.stopAndStart();
    this.audio.pause();
    this.audioExample.pause();
    this.audioMeaning.pause();
  }

  stopAndStart() {
    this.play = !this.play;
  }
}
