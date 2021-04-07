import { createAction, props } from '@ngrx/store';
import { IStats } from '../../common/models/stats.model';

export const setStats = createAction(
  '[User Page/Stats] Set Statistics',
  props<{ payload: IStats }>(),
);
