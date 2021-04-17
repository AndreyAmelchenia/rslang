import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppState } from 'src/app/redux/app.state';
import { Store } from '@ngrx/store';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { first } from 'rxjs/operators';
import { LoadListGame } from 'src/app/redux/actions/listGame.actions';

@Component({
  selector: 'app-games-sprint-main',
  templateUrl: './games-sprint-main.component.html',
  styleUrls: ['./games-sprint-main.component.scss'],
})
export class GamesSprintMainComponent {
  constructor(private location: Location, private store: Store<AppState>) {
    this.store
      .select(selectGameList())
      .pipe(first())
      .subscribe((words) => {
        const { group } = words[0];
        this.store.dispatch(LoadListGame({ group, page: 0, wordsPerPage: 180 }));
      });
  }

  goBack(): void {
    this.location.back();
  }
}
