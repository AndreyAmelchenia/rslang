import { createAction, props } from '@ngrx/store';
import { Stats } from '../../common/models/stats.model';

export const setStats = createAction(
  '[User Page/Stats] Set Statistics',
  props<{ payload: Stats }>(),
);
