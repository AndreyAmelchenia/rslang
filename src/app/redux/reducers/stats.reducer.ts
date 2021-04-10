import { createReducer, on } from '@ngrx/store';
import { setStatistics, resetStatistics } from '../actions/stats.actions';
import { IStats } from '../../common/models/stats.model';

export const statsFeatureKey = 'stats';

export const initialState: IStats = {
  shortTerm: {
    date: Date.now(),
    audio: { learned: 0, tries: 0, right: 0, series: 0 },
    myGame: { learned: 0, tries: 0, right: 0, series: 0 },
    savanna: { learned: 0, tries: 0, right: 0, series: 0 },
    sprint: { learned: 0, tries: 0, right: 0, series: 0 },
  },
  longTerm: [],
};

export const statsReducer = createReducer(
  initialState,
  on(setStatistics, (state, { shortTerm, longTerm }) => ({ shortTerm, longTerm })),
  on(resetStatistics, () => initialState),
);
