import { Word } from '../../common/models/word.model';
import { ILoginState } from './loginState.modele';

export interface AppState {
  words: ReadonlyArray<Word>;
  login: ILoginState;
}
