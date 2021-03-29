import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CssConstants } from 'src/app/shared/constants/css-constants';
import { GamesService } from 'src/app/common/services/games.service';
import { GameModel } from '../../../../common/models/games.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  providers: [GamesService],
})
export class GamesListComponent implements OnInit {
  cols = CssConstants.materialColumnsNumberMiddle;

  rowHeight = CssConstants.materialRowHeightSmall;

  games$: Observable<GameModel[]>;

  constructor(private gamesService: GamesService, public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames();
    this.cssChange();
  }

  cssChange() {
    this.breakpointObserver
      .observe([`(max-width: ${CssConstants.screenMaxWidthAdaptive})`])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.cols = CssConstants.materialColumnsNumberSmall;
          this.rowHeight = CssConstants.materialRowHeightSmall;
        } else {
          this.cols = CssConstants.materialColumnsNumberMiddle;
          this.rowHeight = CssConstants.materialRowHeightMiddle;
        }
      });
  }
}
