import { Word } from '../models/word.model';
import * as auth from './reducers/auth.reducers';

export interface AppState {
  words: ReadonlyArray<Word>;
  authState: auth.State;
}
