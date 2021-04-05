import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/redux/app.state';
import { Settings } from '../models/settings.model';
import { SessionService } from './storage/session.service';

const serverUrl = 'https://andey-rslang-back-end.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  userId: string;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private userSession: SessionService,
  ) {}

  getSettings(): Observable<Settings> {
    return this.http
      .get<Settings>(`${serverUrl}users/${this.userSession.getItem('user').userId}/settings`)
      .pipe(map((settings) => settings));
  }

  saveSettings(data: Settings): Observable<Settings> {
    return this.http
      .put<Settings>(`${serverUrl}users/${this.userSession.getItem('user').userId}/settings`, data)
      .pipe(map((settings) => settings));
  }
}
