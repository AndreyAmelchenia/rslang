import { createAction, props } from '@ngrx/store';
import { Word } from '../../models/word.model';

export const retrievedWordsList = createAction(
  '[Word List/API] Retrieve Words Success',
  props<{ Words: Word[] }>(),
);
