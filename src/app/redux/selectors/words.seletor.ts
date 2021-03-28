import { createSelector } from '@ngrx/store';
import { Word } from 'src/app/models/word.model';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.words;

export const selectWords = createSelector(selectFeature, (state: Word[]) => state);
