import { createSelector } from '@ngrx/store';
import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { Word } from 'src/app/common/models/word.model';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState): ReadonlyArray<AggregatedWordsRedux> => [
  ...state.words,
];

export const selectFeatureWords = (state: AppState): ReadonlyArray<Word> => [
  ...state.words[0].paginatedResults,
];

export const selectWords = createSelector(selectFeature, (state: AggregatedWordsRedux[]) => state);

export const selectWordsByGroup = (group: number) =>
  createSelector(selectFeature, (state: AggregatedWordsRedux[]) => [
    {
      ...state[0],
      paginatedResults: state[0].paginatedResults.filter(
        (el) => el.group === group && el.userWord?.difficulty !== 'deleted',
      ),
    },
  ]);

export const selectBoolLengthWordsByGroup = (group: number, page: number, wordsPerPage: number) =>
  createSelector(
    selectFeatureWords,
    (words: Word[]) =>
      words.filter((el) => el.group === group).length === (page + 1) * wordsPerPage,
  );
