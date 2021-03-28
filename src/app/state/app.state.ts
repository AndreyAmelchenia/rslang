import { Word } from '../models/word.model';
import { ILoginState } from '../redux/models/loginState.modele';

export interface AppState {
  words: ReadonlyArray<Word>;
  login: ILoginState;
}
