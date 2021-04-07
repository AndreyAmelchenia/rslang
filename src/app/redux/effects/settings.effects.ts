import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Settings } from 'src/app/common/models/settings.model';
import { SettingsActionsType } from '../models/settings.model';
import { SettingsService } from '../../common/services/settings.service';
import * as settingsActions from '../actions/settings.actions';

@Injectable()
export class SettingsEffects {
  saveSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActionsType.SaveSettings),
      mergeMap(({ payload }) =>
        this.settingsService
          .saveSettings(payload)
          .pipe(map((response: Settings) => settingsActions.setSettings({ response }))),
      ),
    ),
  );

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActionsType.GetSettings),
      mergeMap(() =>
        this.settingsService
          .getSettings()
          .pipe(map((response: Settings) => settingsActions.setSettings({ response }))),
      ),
    ),
  );

  constructor(private actions$: Actions, private settingsService: SettingsService) {}
}
