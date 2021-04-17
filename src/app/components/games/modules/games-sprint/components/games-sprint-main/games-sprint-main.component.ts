import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppState } from 'src/app/redux/app.state';
import { Store } from '@ngrx/store';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { first } from 'rxjs/operators';
import { LoadListGame } from 'src/app/redux/actions/listGame.actions';
import { Router } from '@angular/router';
import { GamesBannerData } from 'src/app/components/games/models/games-start-banner.model';

@Component({
  selector: 'app-games-sprint-main',
  templateUrl: './games-sprint-main.component.html',
  styleUrls: ['./games-sprint-main.component.scss'],
})
export class GamesSprintMainComponent {
  banner: GamesBannerData = {
    title: 'Спринт',
    subtitle: 'Мини-игра «Спринт» - это тренировка для повторения слов.',
  };

  constructor(private location: Location, private store: Store<AppState>, private router: Router) {
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

  startGame() {
    this.router.navigate(['/games/sprint/play']);
  }
}
