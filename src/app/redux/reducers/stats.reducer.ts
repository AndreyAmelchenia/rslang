import { createReducer, on } from '@ngrx/store';
import { setStats } from '../actions/stats.actions';
import { Stats } from '../../common/models/stats.model';

export const statsFeatureKey = 'stats';

export const initialState: Stats = {
  totalLearned: 1100,
  totalRightPercent: 87,
  longestSeries: {
    savanna: 10,
    audio: 15,
    sprint: 3,
    myGame: 0,
  },
  dailyStatus: {
    learned: 20,
    rightPercent: 66,
  },
};

export const statsReducer = createReducer(
  initialState,
  on(setStats, (state, { payload }) => ({ ...payload })),
);
