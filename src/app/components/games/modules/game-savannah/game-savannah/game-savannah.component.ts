import { Component } from '@angular/core';
import { GameSavannahLangs } from '../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../models/game-savannah-status.model';

@Component({
  selector: 'app-game-savannah',
  templateUrl: './game-savannah.component.html',
  styleUrls: ['./game-savannah.component.scss'],
})
export class GameSavannahComponent {
  gameSavannahStatus: GameSavannahStatus = {
    errors: 2,
    sound: true,
    currentLang: GameSavannahLangs.en,
  };

  changeGameSavannahStatus(data: GameSavannahStatus): void {
    this.gameSavannahStatus = { ...this.gameSavannahStatus, ...data };
  }
}
