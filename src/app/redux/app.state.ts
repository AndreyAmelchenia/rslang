import { AggregatedWordsRedux } from '../common/models/aggregatedWords.model';
import { Settings } from '../common/models/settings.model';

export interface AppState {
  words: ReadonlyArray<AggregatedWordsRedux>;
  expectation: boolean;
  settings: Settings;
}
