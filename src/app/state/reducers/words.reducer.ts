import { createReducer, on } from '@ngrx/store';
import { retrievedWordsList } from '../actions/words.actions';
import { Word } from '../../models/word.model';

export const wordsFeatureKey = 'words';

export const initialState: ReadonlyArray<Word> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedWordsList, (state, { Words }) => [...Words]),
);
