import { Settings } from '../common/models/settings.model';
import { Word } from '../common/models/word.model';

export interface AppState {
  words: ReadonlyArray<Word>;
  expectation: boolean;
  settings: Settings;
}
