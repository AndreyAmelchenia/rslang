import { createAction, props } from '@ngrx/store';
import { Settings } from '../../models/settings.model';

export const setSettings = createAction(
  '[User Page/Settings] Set Settings',
  props<{ payload: Settings }>(),
);
