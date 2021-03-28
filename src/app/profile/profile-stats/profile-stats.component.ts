import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Stats } from 'src/app/models/stats.model';
import { AppState } from 'src/app/state/app.state';
import { selectStats } from 'src/app/state/selectors/stats.selector';

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
