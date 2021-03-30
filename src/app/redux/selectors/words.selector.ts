import { createSelector } from '@ngrx/store';
import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState): ReadonlyArray<AggregatedWordsRedux> => [
  ...state.words,
];

export const selectWords = createSelector(selectFeature, (state: AggregatedWordsRedux[]) => state);

export const selectWordsByGroup = (group: number) =>
  createSelector(selectFeature, (state: AggregatedWordsRedux[]) => [
    {
      ...state[0],
      paginatedResults: state[0].paginatedResults.filter((el) => el.group === group),
    },
  ]);
