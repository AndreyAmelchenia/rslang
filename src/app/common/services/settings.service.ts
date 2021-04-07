import { getSettings, resetSettings } from 'src/app/redux/actions/settings.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AppState } from 'src/app/redux/app.state';
import { Settings } from '../models/settings.model';
import { SessionService } from './storage/session.service';

const { URL_BACK } = URL_BACK_SERVER;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  userId: string;

  constructor(
    private http: HttpClient,
    private userSession: SessionService,
    private store: Store<AppState>,
  ) {}

  getSettings(): Observable<Settings> {
    return this.http
      .get<Settings>(`${URL_BACK}users/${this.userSession.getItem('user').userId}/settings`)
      .pipe(map((settings) => settings));
  }

  saveSettings(data: Settings): Observable<Settings> {
    return this.http
      .put<Settings>(`${URL_BACK}users/${this.userSession.getItem('user').userId}/settings`, data)
      .pipe(map((settings) => settings));
  }

  getSettingsFromServer() {
    this.store.dispatch(getSettings());
  }

  resetSettings() {
    this.store.dispatch(resetSettings());
  }
}
