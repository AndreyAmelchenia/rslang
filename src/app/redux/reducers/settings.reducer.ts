import { createReducer, on } from '@ngrx/store';
import { setSettings, resetSettings } from '../actions/settings.actions';
import { Settings } from '../../common/models/settings.model';

export const settingsFeatureKey = 'settings';

export const initialState: Settings = {
  wordsPerDay: 10,
  optional: {
    displayTranslation: true,
    displayHandlingButtons: true,
  },
};

export const settingsReducer = createReducer(
  initialState,
  on(setSettings, (state, { response }) => ({ ...response })),
  on(resetSettings, () => initialState),
);
