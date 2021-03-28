import { AggregatedWords } from '../common/models/aggregatedWords.model';
import { Settings } from '../common/models/settings.model';

export interface AppState {
  words: ReadonlyArray<AggregatedWords>;
  expectation: boolean;
  settings: Settings;
}
