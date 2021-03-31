import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from 'src/app/common/models/word.model';
import { AddDifficultyWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() word: Word;

  @Input() color: number[];

  constructor(private store: Store<AppState>) {}

  colorRGB(color: number[]): string {
    return `rgba(${[...color, 0.3].join()})`;
  }

  addDifficultyWord(wordId: string, difficulty: 'easy' | 'hard' | 'deleted', newWord: boolean) {
    this.store.dispatch(AddDifficultyWords({ wordId, difficulty, newWord }));
  }
}
