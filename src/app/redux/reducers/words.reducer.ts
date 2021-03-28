import { createReducer, on } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';
import { retrievedWordsList } from '../actions/words.actions';

export const wordsFeatureKey = 'words';

export const initialState: ReadonlyArray<AggregatedWords> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedWordsList, (state, { Words }) => [...Words]),
);
