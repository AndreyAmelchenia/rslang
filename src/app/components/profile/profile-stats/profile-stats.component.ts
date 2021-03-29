import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/redux/app.state';
import { selectStats } from 'src/app/redux/selectors/stats.selector';
import { Stats } from 'src/app/common/models/stats.model';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
})
export class ProfileStatsComponent {
  stats: Stats;

  constructor(private store: Store<AppState>) {
    this.store.select(selectStats).subscribe((stats) => {
      this.stats = stats;
    });
  }
}
