import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { GameModel } from '../../models/games.model';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  providers: [GamesService],
})
export class GamesListComponent implements OnInit {
  cols = 2;

  rowHeight = '200px';

  games: Observable<GameModel[]>;

  constructor(private gamesService: GamesService, public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.games = this.gamesService.getGames();
    this.colsChange();
  }

  colsChange() {
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.cols = 1;
        this.rowHeight = '200px';
      } else {
        this.cols = 2;
        this.rowHeight = '300px';
      }
    });
  }
}
