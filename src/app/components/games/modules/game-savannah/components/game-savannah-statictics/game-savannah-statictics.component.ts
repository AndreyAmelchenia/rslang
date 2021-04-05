import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameSavannahWord } from '../../game-savannah/game-savannah.component';

@Component({
  selector: 'app-game-savannah-statictics',
  templateUrl: './game-savannah-statictics.component.html',
  styleUrls: ['./game-savannah-statictics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahStaticticsComponent {
  @Input() words: GameSavannahWord[];
}
