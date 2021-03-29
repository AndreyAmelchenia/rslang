import { createSelector } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState): ReadonlyArray<AggregatedWords> => state.words;

export const selectWords = createSelector(selectFeature, (state: AggregatedWords[]) => state);

export const selectWordsByGroup = (group: number) =>
  createSelector(selectFeature, (state: AggregatedWords[]) => [
    {
      ...state[0],
      paginatedResults: state[0].paginatedResults.filter((el) => el.group === group),
    },
  ]);
