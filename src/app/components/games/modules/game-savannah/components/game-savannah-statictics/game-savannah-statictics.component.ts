import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { GameSavannahWord } from '../../game-savannah/game-savannah.component';

@Component({
  selector: 'app-game-savannah-statictics',
  templateUrl: './game-savannah-statictics.component.html',
  styleUrls: ['./game-savannah-statictics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahStaticticsComponent {
  @Input() words: GameSavannahWord[];

  @Output() repeatGame = new EventEmitter();

  repeat(): void {
    this.repeatGame.emit();
  }
}
