import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from '../../../common/models/word.model';
import { LoadDifficultyWords } from '../../../redux/actions/words.actions';
import { AppState } from '../../../redux/app.state';

@Component({
  selector: 'app-dictionary-item',
  templateUrl: './dictionary-item.component.html',
  styleUrls: ['./dictionary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryItemComponent {
  @Input() word: Word;

  @Input() color: number[];

  audio: HTMLAudioElement;

  audioExample: HTMLAudioElement;

  audioMeaning: HTMLAudioElement;

  play = false;

  constructor(private store: Store<AppState>) {}

  colorRGB(a = 0.3): string {
    return `rgba(${[...this.color, a].join()})`;
  }

  addDifficultyWord(wordId: string, difficulty: 'easy' | 'hard' | 'deleted', newWord: boolean) {
    this.store.dispatch(LoadDifficultyWords({ wordId, difficulty, newWord }));
  }

  playAudio() {
    this.play = true;
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
  }

  stopAudio() {
    this.play = false;
    this.audio.pause();
    this.audioExample.pause();
    this.audioMeaning.pause();
  }
}
