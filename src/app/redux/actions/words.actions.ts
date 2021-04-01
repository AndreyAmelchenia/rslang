import { createAction, props } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';

export enum ArticlesActions {
  LoadWords = '[Words Page] Load Words',
  RetrievedWordSuccess = '[Word List/API] Retrieve Words Success',
  BackWord = '[Back Word] Back Word',
  AddDifficulty = '[Add difficulty] Add difficulty',
  LoadDifficulty = '[Load difficulty] Add difficulty to back',
}

export const retrievedWordsList = createAction(
  ArticlesActions.RetrievedWordSuccess,
  props<{ Words: AggregatedWords[] }>(),
);

export const LoadWords = createAction(
  ArticlesActions.LoadWords,
  props<{ group: number; page: number; wordsPerPage: number }>(),
);

export const AddDifficultyWords = createAction(
  ArticlesActions.AddDifficulty,
  props<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }>(),
);

export const LoadDifficultyWords = createAction(
  ArticlesActions.LoadDifficulty,
  props<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }>(),
);
export const BackWord = createAction(ArticlesActions.BackWord);
