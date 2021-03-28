import { createSelector } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.words;

export const selectWords = createSelector(selectFeature, (state: AggregatedWords[]) => state);
