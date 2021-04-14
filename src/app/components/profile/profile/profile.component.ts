import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setStatistics } from 'src/app/redux/actions/stats.actions';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private store: Store<AppState>) {}

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
          { date: new Date(2021, 2, 1).valueOf(), learned: 10 },
          { date: new Date(2021, 2, 2).valueOf(), learned: 15 },
          { date: new Date(2021, 2, 3).valueOf(), learned: 25 },
          { date: new Date(2021, 2, 4).valueOf(), learned: 18 },
          { date: new Date(2021, 2, 7).valueOf(), learned: 30 },
          { date: new Date(2021, 2, 10).valueOf(), learned: 1 },
          { date: new Date(2021, 2, 11).valueOf(), learned: 10 },
          { date: new Date(2021, 2, 15).valueOf(), learned: 10 },
          { date: new Date(2021, 2, 16).valueOf(), learned: 10 },
          { date: new Date(2021, 2, 18).valueOf(), learned: 15 },
          { date: new Date(2021, 2, 19).valueOf(), learned: 10 },
          { date: new Date(2021, 2, 20).valueOf(), learned: 20 },
          { date: new Date(2021, 2, 21).valueOf(), learned: 22 },
          { date: new Date(2021, 2, 22).valueOf(), learned: 17 },
          { date: new Date(2021, 2, 25).valueOf(), learned: 26 },
          { date: new Date(2021, 2, 28).valueOf(), learned: 10 },
          { date: new Date(2021, 3, 1).valueOf(), learned: 9 },
          { date: new Date(2021, 3, 2).valueOf(), learned: 5 },
          { date: new Date(2021, 3, 3).valueOf(), learned: 18 },
          { date: new Date(2021, 3, 4).valueOf(), learned: 20 },
          { date: new Date(2021, 3, 5).valueOf(), learned: 10 },
          { date: new Date(2021, 3, 6).valueOf(), learned: 14 },
          { date: new Date(2021, 3, 7).valueOf(), learned: 13 },
        ],
      }),
    );
  }
}
