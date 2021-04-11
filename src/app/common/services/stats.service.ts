import {
  getStatistics,
  resetStatistics,
  saveStatistics,
} from 'src/app/redux/actions/stats.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AppState } from 'src/app/redux/app.state';
import { selectStats } from 'src/app/redux/selectors/stats.selector';
import { SessionService } from './storage/session.service';
import { IDay, IGame, IResponse, IStats } from '../models/stats.model';

const { URL_BACK } = URL_BACK_SERVER;

const addLastGameResults = (
  learned: number,
  currentDate: number,
  longTermStats: IDay[],
): IDay[] => {
  const lastItem: IDay = longTermStats[longTermStats.length - 1];

  if (
    new Date(currentDate).toDateString() ===
    new Date(longTermStats[longTermStats.length - 1].date).toDateString()
  ) {
    const arr = longTermStats.slice(0, -1);
    arr.push({
      date: lastItem.date,
      learned: lastItem.learned + learned,
    });
    return arr;
  }
  const arr = longTermStats.slice();
  arr.push({ date: currentDate, learned });
  return arr;
};

const addShortResults = (data: IStats, stats: IGame): IGame => {
  return {
    learned: data.shortTerm.myGame.learned + stats.learned,
    tries: data.shortTerm.myGame.tries + stats.tries,
    right: data.shortTerm.myGame.learned + stats.right,
    series:
      data.shortTerm.myGame.series < stats.series ? stats.series : data.shortTerm.myGame.series,
  };
};

@Injectable({ providedIn: 'root' })
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

  setLastGameStats(stats: IGame, game: string) {
    let data: IStats;
    this.store.select(selectStats).subscribe((statistics) => {
      data = statistics;
    });

    this.store.dispatch(
      saveStatistics({
        shortTerm: {
          ...data.shortTerm,
          [game]: addShortResults(data, stats),
        },
        longTerm: addLastGameResults(stats.learned, data.shortTerm.date, data.longTerm),
      }),
    );
  }

  saveAudioStats(stats: IGame) {
    this.setLastGameStats(stats, 'audio');
  }

  saveMyGameStats(stats: IGame) {
    this.setLastGameStats(stats, 'myGame');
  }

  saveSavannaStats(stats: IGame) {
    this.setLastGameStats(stats, 'savanna');
  }

  saveSprintStats(stats: IGame) {
    this.setLastGameStats(stats, 'sprint');
  }
}
