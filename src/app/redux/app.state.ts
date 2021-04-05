import { AggregatedWordsRedux } from '../common/models/aggregatedWords.model';
import { Settings } from '../common/models/settings.model';
import { Stats } from '../common/models/stats.model';

export interface AppState {
  words: ReadonlyArray<AggregatedWordsRedux>;
  expectation: boolean;
  settings: Settings;
  stats: Stats;
}
