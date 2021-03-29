import { createAction, props } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';

export enum ArticlesActions {
  LoadWords = '[Words Page] Load Words',
  RetrievedWordSuccess = '[Word List/API] Retrieve Words Success',
  BackWord = '[Back Word] Back Word',
  ArticlesLoadedError = '[Articles Page] Articles Loaded Error',
}

export const retrievedWordsList = createAction(
  ArticlesActions.RetrievedWordSuccess,
  props<{ Words: AggregatedWords[] }>(),
);

export const LoadWords = createAction(
  ArticlesActions.LoadWords,
  props<{ group: number; page: number; wordsPerPage: number }>(),
);

export const BackWord = createAction(ArticlesActions.BackWord);
