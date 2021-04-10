import { getStatistics, resetStatistics } from 'src/app/redux/actions/stats.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AppState } from 'src/app/redux/app.state';
import { SessionService } from './storage/session.service';
import { IResponse, IStats } from '../models/stats.model';

const { URL_BACK } = URL_BACK_SERVER;

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  userId: string;

  constructor(
    private http: HttpClient,
    private userSession: SessionService,
    private store: Store<AppState>,
  ) {}

  getStatistics(): Observable<IStats> {
    return this.http
      .get<IResponse>(`${URL_BACK}users/${this.userSession.getItem('user').userId}/statistics`)
      .pipe(map((stats) => JSON.parse(stats.optional.data)));
  }

  saveStatistics(data: IStats): Observable<IStats> {
    return this.http
      .put<IResponse>(`${URL_BACK}users/${this.userSession.getItem('user').userId}/statistics`, {
        learnedWords: 0,
        optional: {
          data: JSON.stringify(data),
        },
      })
      .pipe(map((stats) => JSON.parse(stats.optional.data)));
  }

  getStatisticsFromServer() {
    this.store.dispatch(getStatistics());
  }

  resetStatistics() {
    this.store.dispatch(resetStatistics());
  }
}
