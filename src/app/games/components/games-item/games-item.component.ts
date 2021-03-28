import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GameModel } from '../../models/games.model';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-games-item',
  templateUrl: './games-item.component.html',
  styleUrls: ['./games-item.component.scss'],
  providers: [GamesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesItemComponent {
  @Input() game: GameModel;

  constructor(private gamesService: GamesService, private router: Router) {}
}
