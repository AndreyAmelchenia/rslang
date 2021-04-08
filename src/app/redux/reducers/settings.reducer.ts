import { createReducer, on } from '@ngrx/store';
import { saveSettings } from '../actions/settings.actions';
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
  on(saveSettings, (state, { payload }) => ({ ...payload })),
);
