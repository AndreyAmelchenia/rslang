import { createReducer, on } from '@ngrx/store';
import { setSettings } from '../actions/settings.actions';
import { Settings } from '../../models/settings.model';

export const settingsFeatureKey = 'settings';

export const initialState: Settings = { displayTranslation: true, displayHandlingButtons: false };

export const settingsReducer = createReducer(
  initialState,
  on(setSettings, (state, { payload }) => ({ ...payload })),
);
