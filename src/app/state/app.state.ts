import { Settings } from '../models/settings.model';
import { Stats } from '../models/stats.model';
import { Word } from '../models/word.model';

export interface AppState {
  words: ReadonlyArray<Word>;
  settings: Settings;
  stats: Stats;
}
