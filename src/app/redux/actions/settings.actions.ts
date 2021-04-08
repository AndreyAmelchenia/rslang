import { createAction, props } from '@ngrx/store';
import { SettingsActionsType } from '../models/settings.model';
import { Settings } from '../../common/models/settings.model';

export const saveSettings = createAction(
  SettingsActionsType.SaveSettings,
  props<{ payload: Settings }>(),
);

export const setSettings = createAction(
  SettingsActionsType.SetSettings,
  props<{ response: Settings }>(),
);
