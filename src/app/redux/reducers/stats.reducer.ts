import { createReducer, on } from '@ngrx/store';
import { setStats } from '../actions/stats.actions';
import { IStats } from '../../common/models/stats.model';

export const statsFeatureKey = 'stats';

export const initialState: IStats = {
  shortTerm: {
    audio: { learned: 20, tries: 25, right: 20, series: 10 },
    myGame: { learned: 20, tries: 25, right: 20, series: 10 },
    savanna: { learned: 20, tries: 25, right: 20, series: 10 },
    sprint: { learned: 20, tries: 25, right: 20, series: 10 },
  },
  longTerm: [
    { date: new Date(2021, 2, 1), learned: 10 },
    { date: new Date(2021, 2, 2), learned: 15 },
    { date: new Date(2021, 2, 3), learned: 25 },
    { date: new Date(2021, 2, 4), learned: 18 },
    { date: new Date(2021, 2, 7), learned: 30 },
    { date: new Date(2021, 2, 10), learned: 1 },
    { date: new Date(2021, 2, 11), learned: 10 },
    { date: new Date(2021, 2, 15), learned: 10 },
    { date: new Date(2021, 2, 16), learned: 10 },
    { date: new Date(2021, 2, 18), learned: 15 },
    { date: new Date(2021, 2, 19), learned: 10 },
    { date: new Date(2021, 2, 20), learned: 20 },
    { date: new Date(2021, 2, 21), learned: 22 },
    { date: new Date(2021, 2, 22), learned: 17 },
    { date: new Date(2021, 2, 25), learned: 26 },
    { date: new Date(2021, 2, 28), learned: 10 },
    { date: new Date(2021, 3, 1), learned: 9 },
    { date: new Date(2021, 3, 2), learned: 5 },
    { date: new Date(2021, 3, 3), learned: 18 },
    { date: new Date(2021, 3, 4), learned: 20 },
    { date: new Date(2021, 3, 5), learned: 10 },
    { date: new Date(2021, 3, 6), learned: 14 },
    { date: new Date(2021, 3, 7), learned: 13 },
  ],
};

export const statsReducer = createReducer(
  initialState,
  on(setStats, (state, { payload }) => ({ ...payload })),
);
