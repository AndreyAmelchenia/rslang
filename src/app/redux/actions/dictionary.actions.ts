import { createAction, props } from '@ngrx/store';
import { Word } from '../../common/models/word.model';
import { ActionType } from '../models/dictionaryAction.models';

export const updateWords = createAction(ActionType.updateWords);
export const updateWordsSuccess = createAction(
  ActionType.updateWordsSuccess,
  props<{ paginatedResults: Word[]; totalCount: number; errorMessage?: string }>(),
);

export const updateWordsFailure = createAction(ActionType.updateWordsSuccess, props<any>());

export const startGameFromDictionary = createAction(
  ActionType.startGame,
  props<{ words: Word[] }>(),
);

export const restoreWord = createAction(ActionType.restoreWord, props<{ word: Word }>());
