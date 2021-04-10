import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsService } from 'src/app/common/services/stats.service';
import {
  setStatistics,
  resetStatistics,
  saveStatistics,
} from 'src/app/redux/actions/stats.actions';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private store: Store<AppState>, private statsService: StatsService) {}

  setStats() {
    this.store.dispatch(
      setStatistics({
        shortTerm: {
          date: Date.now(),
          audio: { learned: 20, tries: 25, right: 20, series: 10 },
          myGame: { learned: 20, tries: 25, right: 20, series: 10 },
          savanna: { learned: 20, tries: 25, right: 20, series: 10 },
          sprint: { learned: 20, tries: 25, right: 20, series: 10 },
        },
        longTerm: [
          { date: new Date(2021, 2, 1), learned: 10 },
          { date: new Date(2021, 2, 2), learned: 15 },
          { date: new Date(2021, 2, 3), learned: 25 },
          { date: new Date(2021, 2, 4), learned: 18 },
          { date: new Date(2021, 2, 7), learned: 30 },
          { date: new Date(2021, 2, 10), learned: 1 },
          { date: new Date(2021, 2, 11), learned: 10 },
          { date: new Date(2021, 2, 15), learned: 10 },
          { date: new Date(2021, 2, 16), learned: 10 },
          { date: new Date(2021, 2, 18), learned: 15 },
          { date: new Date(2021, 2, 19), learned: 10 },
          { date: new Date(2021, 2, 20), learned: 20 },
          { date: new Date(2021, 2, 21), learned: 22 },
          { date: new Date(2021, 2, 22), learned: 17 },
          { date: new Date(2021, 2, 25), learned: 26 },
          { date: new Date(2021, 2, 28), learned: 10 },
          { date: new Date(2021, 3, 1), learned: 9 },
          { date: new Date(2021, 3, 2), learned: 5 },
          { date: new Date(2021, 3, 3), learned: 18 },
          { date: new Date(2021, 3, 4), learned: 20 },
          { date: new Date(2021, 3, 5), learned: 10 },
          { date: new Date(2021, 3, 6), learned: 14 },
          { date: new Date(2021, 3, 7), learned: 13 },
        ],
      }),
    );
  }

  saveStats() {
    this.store.dispatch(
      saveStatistics({
        shortTerm: {
          date: Date.now(),
          audio: { learned: 20, tries: 25, right: 20, series: 10 },
          myGame: { learned: 20, tries: 25, right: 15, series: 12 },
          savanna: { learned: 20, tries: 26, right: 18, series: 6 },
          sprint: { learned: 20, tries: 58, right: 11, series: 9 },
        },
        longTerm: [
          { date: new Date(2021, 2, 1), learned: 10 },
          { date: new Date(2021, 2, 2), learned: 15 },
          { date: new Date(2021, 2, 3), learned: 25 },
          { date: new Date(2021, 2, 4), learned: 18 },
          { date: new Date(2021, 2, 7), learned: 30 },
          { date: new Date(2021, 2, 10), learned: 1 },
          { date: new Date(2021, 2, 11), learned: 10 },
          { date: new Date(2021, 2, 15), learned: 10 },
          { date: new Date(2021, 2, 16), learned: 10 },
          { date: new Date(2021, 2, 18), learned: 15 },
        ],
      }),
    );
  }

  resetStats() {
    this.store.dispatch(resetStatistics());
  }

  getStats() {
    this.statsService.getStatisticsFromServer();
  }
}
