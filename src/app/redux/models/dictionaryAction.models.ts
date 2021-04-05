export enum ActionType {
  updateWords = '[Dictionary] update words',
  updateWordsSuccess = '[Dictionary] update words success',
  updateWordsFailure = '[Dictionary] update words failure',
  startGame = '[Dictionary] start game',
  restoreWord = '[Dictionary] restore word',
}

export interface IDictionaryOptions {
  userId: string;
  section: string;
  group: number;
  page: number;
  wordsPerPage: number;
}
