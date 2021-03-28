import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Word } from '../../models/word.model';

export const selectWordState = createFeatureSelector<AppState, ReadonlyArray<Word>>('words');

export const selectWords = createSelector(selectWordState, (words: ReadonlyArray<Word>) => words);
