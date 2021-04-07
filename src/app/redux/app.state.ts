import { AggregatedWordsRedux, ICurrentWords } from '../common/models/aggregatedWords.model';
import { Settings } from '../common/models/settings.model';
import { Stats } from '../common/models/stats.model';
import { ILoginState } from './models/loginState.models';

export interface AppState {
  words: ReadonlyArray<AggregatedWordsRedux>;
  expectation: boolean;
  login: ILoginState;
  dictionary: ICurrentWords;
  settings: Settings;
  stats: Stats;
}
