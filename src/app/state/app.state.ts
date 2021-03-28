import { Settings } from '../models/settings.model';
import { Word } from '../models/word.model';

export interface AppState {
  words: ReadonlyArray<Word>;
  settings: Settings;
}
